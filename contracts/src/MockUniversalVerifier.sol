// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockUniversalVerifier {
    mapping(address => mapping(uint256 => bool)) public proofs;

    function isRequestProofVerified(address sender, uint256 requestId) external view returns (bool) {
        return proofs[sender][requestId];
    }

    function setProofVerified(address sender, uint256 requestId, bool verified) external {
        proofs[sender][requestId] = verified;
    }
}
