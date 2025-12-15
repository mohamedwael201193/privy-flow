// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@iden3/contracts/interfaces/IVerifier.sol";

/**
 * @title PrivyFlowTieredLimits
 * @notice Advanced identity verification with tiered transaction limits
 * @dev Integrates with Privado ID for ZK-based identity verification
 * 
 * Tier System:
 * Level 0: No verification - $100/day limit
 * Level 1: Liveness verified (human) - $1,000/day limit
 * Level 2: Age + Country verified - $10,000/day limit
 * Level 3: Full verification (all proofs) - Unlimited
 */
contract PrivyFlowTieredLimits is Ownable {
    IVerifier public universalVerifier;
    
    // Request IDs for different credential types
    uint256 public humanityRequestId;    // Liveness/humanity proof
    uint256 public ageRequestId;         // Age verification (18+)
    uint256 public countryRequestId;     // Country residency proof
    
    // Tier limits in USD (6 decimals like USDC)
    uint256 public constant TIER_0_LIMIT = 100 * 1e6;      // $100
    uint256 public constant TIER_1_LIMIT = 1000 * 1e6;     // $1,000
    uint256 public constant TIER_2_LIMIT = 10000 * 1e6;    // $10,000
    uint256 public constant TIER_3_LIMIT = type(uint256).max; // Unlimited
    
    // Daily spending tracking
    struct DailyUsage {
        uint256 amount;
        uint256 lastResetTime;
    }
    mapping(address => DailyUsage) public dailyUsage;
    
    // Sanctioned countries (ISO 3166-1 numeric codes)
    mapping(uint256 => bool) public sanctionedCountries;
    
    // Manual tier overrides (for special cases)
    mapping(address => uint8) public manualTierOverrides;
    mapping(address => bool) public hasManualOverride;

    // Events
    event VerifierUpdated(address indexed newVerifier);
    event RequestIdsUpdated(uint256 humanity, uint256 age, uint256 country);
    event TierCalculated(address indexed user, uint8 tier, uint256 limit);
    event DailyLimitUsed(address indexed user, uint256 amount, uint256 remaining);
    event CountrySanctioned(uint256 indexed countryCode, bool sanctioned);
    event ManualTierSet(address indexed user, uint8 tier);

    constructor(
        address _verifier,
        uint256 _humanityRequestId,
        uint256 _ageRequestId,
        uint256 _countryRequestId
    ) Ownable(msg.sender) {
        universalVerifier = IVerifier(_verifier);
        humanityRequestId = _humanityRequestId;
        ageRequestId = _ageRequestId;
        countryRequestId = _countryRequestId;
    }

    // ============ Admin Functions ============

    function setVerifier(address _verifier) external onlyOwner {
        universalVerifier = IVerifier(_verifier);
        emit VerifierUpdated(_verifier);
    }

    function setRequestIds(
        uint256 _humanityRequestId,
        uint256 _ageRequestId,
        uint256 _countryRequestId
    ) external onlyOwner {
        humanityRequestId = _humanityRequestId;
        ageRequestId = _ageRequestId;
        countryRequestId = _countryRequestId;
        emit RequestIdsUpdated(_humanityRequestId, _ageRequestId, _countryRequestId);
    }

    function setSanctionedCountry(uint256 countryCode, bool sanctioned) external onlyOwner {
        sanctionedCountries[countryCode] = sanctioned;
        emit CountrySanctioned(countryCode, sanctioned);
    }

    function setManualTier(address user, uint8 tier) external onlyOwner {
        require(tier <= 3, "Invalid tier");
        manualTierOverrides[user] = tier;
        hasManualOverride[user] = true;
        emit ManualTierSet(user, tier);
    }

    function removeManualTier(address user) external onlyOwner {
        hasManualOverride[user] = false;
    }

    // ============ Verification Checks ============

    function isHuman(address user) public view returns (bool) {
        if (address(universalVerifier) == address(0)) return false;
        return universalVerifier.isRequestProofVerified(user, humanityRequestId);
    }

    function isAdult(address user) public view returns (bool) {
        if (address(universalVerifier) == address(0)) return false;
        return universalVerifier.isRequestProofVerified(user, ageRequestId);
    }

    function hasCountryProof(address user) public view returns (bool) {
        if (address(universalVerifier) == address(0)) return false;
        return universalVerifier.isRequestProofVerified(user, countryRequestId);
    }

    // ============ Tier Calculation ============

    /**
     * @notice Calculate user's verification tier
     * @param user Address to check
     * @return tier 0-3 based on verification level
     */
    function getUserTier(address user) public view returns (uint8) {
        // Check manual override first
        if (hasManualOverride[user]) {
            return manualTierOverrides[user];
        }

        // Fallback if verifier not set
        if (address(universalVerifier) == address(0)) {
            return 0;
        }

        bool human = isHuman(user);
        bool adult = isAdult(user);
        bool country = hasCountryProof(user);

        // Tier 3: All verifications
        if (human && adult && country) {
            return 3;
        }
        
        // Tier 2: Age + Country (for regulated corridors)
        if (adult && country) {
            return 2;
        }
        
        // Tier 1: Basic humanity proof
        if (human) {
            return 1;
        }
        
        // Tier 0: No verification
        return 0;
    }

    /**
     * @notice Get daily limit for a user based on their tier
     * @param user Address to check
     * @return limit Maximum daily transaction amount
     */
    function getDailyLimit(address user) public view returns (uint256) {
        uint8 tier = getUserTier(user);
        
        if (tier == 3) return TIER_3_LIMIT;
        if (tier == 2) return TIER_2_LIMIT;
        if (tier == 1) return TIER_1_LIMIT;
        return TIER_0_LIMIT;
    }

    /**
     * @notice Get remaining daily allowance for a user
     * @param user Address to check
     * @return remaining Amount user can still transact today
     */
    function getRemainingDailyLimit(address user) public view returns (uint256) {
        uint256 limit = getDailyLimit(user);
        if (limit == type(uint256).max) return type(uint256).max;
        
        DailyUsage storage usage = dailyUsage[user];
        
        // Reset if new day
        if (block.timestamp >= usage.lastResetTime + 1 days) {
            return limit;
        }
        
        if (usage.amount >= limit) return 0;
        return limit - usage.amount;
    }

    // ============ Limit Enforcement ============

    /**
     * @notice Check if a transaction is within limits
     * @param user User address
     * @param amount Transaction amount (6 decimals)
     * @return allowed Whether the transaction is allowed
     */
    function checkLimit(address user, uint256 amount) external view returns (bool) {
        return getRemainingDailyLimit(user) >= amount;
    }

    /**
     * @notice Record a transaction against user's daily limit
     * @dev Should be called by authorized contracts (Router, etc.)
     * @param user User address
     * @param amount Transaction amount
     */
    function recordUsage(address user, uint256 amount) external {
        // In production, add access control here
        // require(authorizedCallers[msg.sender], "Not authorized");
        
        uint256 limit = getDailyLimit(user);
        DailyUsage storage usage = dailyUsage[user];
        
        // Reset if new day
        if (block.timestamp >= usage.lastResetTime + 1 days) {
            usage.amount = 0;
            usage.lastResetTime = block.timestamp;
        }
        
        // Check limit (unless unlimited)
        if (limit != type(uint256).max) {
            require(usage.amount + amount <= limit, "Daily limit exceeded");
        }
        
        usage.amount += amount;
        
        uint256 remaining = limit == type(uint256).max ? type(uint256).max : limit - usage.amount;
        emit DailyLimitUsed(user, amount, remaining);
    }

    // ============ Comprehensive View Functions ============

    /**
     * @notice Get complete identity status for a user
     */
    function getIdentityStatus(address user) external view returns (
        uint8 tier,
        uint256 dailyLimit,
        uint256 dailyUsed,
        uint256 dailyRemaining,
        bool humanVerified,
        bool ageVerified,
        bool countryVerified,
        bool hasOverride
    ) {
        tier = getUserTier(user);
        dailyLimit = getDailyLimit(user);
        
        DailyUsage storage usage = dailyUsage[user];
        if (block.timestamp >= usage.lastResetTime + 1 days) {
            dailyUsed = 0;
        } else {
            dailyUsed = usage.amount;
        }
        
        dailyRemaining = getRemainingDailyLimit(user);
        humanVerified = isHuman(user);
        ageVerified = isAdult(user);
        countryVerified = hasCountryProof(user);
        hasOverride = hasManualOverride[user];
    }

    /**
     * @notice Get tier requirements for display
     */
    function getTierRequirements() external pure returns (
        string memory tier0Desc,
        string memory tier1Desc,
        string memory tier2Desc,
        string memory tier3Desc
    ) {
        tier0Desc = "No verification required - $100/day limit";
        tier1Desc = "Liveness proof (human) - $1,000/day limit";
        tier2Desc = "Age + Country verified - $10,000/day limit";
        tier3Desc = "Full verification - Unlimited transactions";
    }

    /**
     * @notice Check what verifications are missing for next tier
     */
    function getMissingVerifications(address user) external view returns (
        bool needsHumanity,
        bool needsAge,
        bool needsCountry
    ) {
        uint8 currentTier = getUserTier(user);
        
        if (currentTier >= 3) {
            return (false, false, false);
        }
        
        needsHumanity = !isHuman(user);
        needsAge = !isAdult(user);
        needsCountry = !hasCountryProof(user);
    }
}
