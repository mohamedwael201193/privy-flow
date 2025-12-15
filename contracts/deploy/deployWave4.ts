import { ethers, network } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("=".repeat(60));
    console.log("WAVE 4 DEPLOYMENT - AI Agents & Tiered Limits");
    console.log("=".repeat(60));
    console.log("Deploying with account:", deployer.address);
    console.log("Network:", network.name);

    // Config
    const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"; // Polygon Mainnet Native USDC
    const TREASURY_ADDRESS = deployer.address;

    // ============ Deploy Payment Agent ============
    console.log("\n📦 Deploying PrivyFlowPaymentAgent...");
    const PaymentAgent = await ethers.getContractFactory("PrivyFlowPaymentAgent");
    const paymentAgent = await PaymentAgent.deploy(TREASURY_ADDRESS, 30); // 0.3% fee
    await paymentAgent.waitForDeployment();
    const paymentAgentAddress = await paymentAgent.getAddress();
    console.log("✅ PrivyFlowPaymentAgent deployed to:", paymentAgentAddress);

    // Add USDC as supported token
    console.log("   Adding USDC as supported token...");
    const tx1 = await paymentAgent.setSupportedToken(USDC_ADDRESS, true);
    await tx1.wait();
    console.log("   ✅ USDC enabled for agent payments");

    // ============ Deploy Tiered Limits ============
    console.log("\n📦 Deploying PrivyFlowTieredLimits...");

    let universalVerifierAddress = "0xf2d01ee818509a9540d8622b56e780c1075ebbdb"; // Polygon Mainnet

    if (network.name === "localhost" || network.name === "hardhat") {
        console.log("   Deploying MockUniversalVerifier...");
        const MockVerifier = await ethers.getContractFactory("MockUniversalVerifier");
        const mockVerifier = await MockVerifier.deploy();
        await mockVerifier.waitForDeployment();
        universalVerifierAddress = await mockVerifier.getAddress();
        console.log("   MockUniversalVerifier deployed to:", universalVerifierAddress);
    }

    const HUMANITY_REQUEST_ID = 1;
    const AGE_REQUEST_ID = 2;
    const COUNTRY_REQUEST_ID = 3;

    const TieredLimits = await ethers.getContractFactory("PrivyFlowTieredLimits");
    const tieredLimits = await TieredLimits.deploy(
        universalVerifierAddress,
        HUMANITY_REQUEST_ID,
        AGE_REQUEST_ID,
        COUNTRY_REQUEST_ID
    );
    await tieredLimits.waitForDeployment();
    const tieredLimitsAddress = await tieredLimits.getAddress();
    console.log("✅ PrivyFlowTieredLimits deployed to:", tieredLimitsAddress);

    // ============ Summary ============
    console.log("\n" + "=".repeat(60));
    console.log("WAVE 4 DEPLOYMENT SUMMARY");
    console.log("=".repeat(60));
    console.log(`
📍 Contract Addresses:
   PrivyFlowPaymentAgent: ${paymentAgentAddress}
   PrivyFlowTieredLimits: ${tieredLimitsAddress}

📋 Next Steps:
   1. Update frontend .env with new addresses
   2. Verify contracts on PolygonScan
   3. Grant agent permissions for production use

🔧 Verify Commands:
   npx hardhat verify --network polygon ${paymentAgentAddress} "${TREASURY_ADDRESS}" 30
   npx hardhat verify --network polygon ${tieredLimitsAddress} "${universalVerifierAddress}" ${HUMANITY_REQUEST_ID} ${AGE_REQUEST_ID} ${COUNTRY_REQUEST_ID}
`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
