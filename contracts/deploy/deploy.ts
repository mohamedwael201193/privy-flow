import { ethers, network } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Config
    const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"; // Polygon Mainnet Native USDC
    const TREASURY_ADDRESS = deployer.address; // Use deployer as treasury for now

    // Deploy Router
    const Router = await ethers.getContractFactory("PrivyFlowRouter");
    const router = await Router.deploy(USDC_ADDRESS, TREASURY_ADDRESS, 10); // 0.1% fee
    await router.waitForDeployment();
    console.log("PrivyFlowRouter deployed to:", await router.getAddress());

    // Deploy Vault
    const Vault = await ethers.getContractFactory("PrivyFlowVault");
    // Note: For Vault, we need the underlying asset. If deploying on testnet without USDC, we might need a mock.
    // Assuming mainnet or fork for now, or we deploy mock if on 'amoy' and no USDC there.
    const vault = await Vault.deploy(USDC_ADDRESS, "PrivyFlow Vault", "pfUSDC");
    await vault.waitForDeployment();
    // Deploy IdentityGate
    let universalVerifierAddress = ethers.getAddress("0xf2d01ee818509a9540d8622b56e780c1075ebbdb"); // Polygon Mainnet
    const HUMANITY_REQUEST_ID = 1; // Placeholder
    const AGE_REQUEST_ID = 2; // Placeholder

    if (network.name === "localhost" || network.name === "hardhat") {
        console.log("Deploying MockUniversalVerifier...");
        const MockVerifier = await ethers.getContractFactory("MockUniversalVerifier");
        const mockVerifier = await MockVerifier.deploy();
        await mockVerifier.waitForDeployment();
        universalVerifierAddress = await mockVerifier.getAddress();
        console.log("MockUniversalVerifier deployed to:", universalVerifierAddress);
    }

    const Gate = await ethers.getContractFactory("PrivyFlowIdentityGate");
    const gate = await Gate.deploy(universalVerifierAddress, HUMANITY_REQUEST_ID, AGE_REQUEST_ID);
    await gate.waitForDeployment();
    console.log("PrivyFlowIdentityGate deployed to:", await gate.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
