// Commit 35 - 2026-01-15T09:54:29.199Z
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Mantle Sepolia testnet...");
  
  // Get the deployer's wallet
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy the AgentFactory contract
  console.log("📦 Deploying AgentFactory...");
  const AgentFactory = await ethers.getContractFactory("AgentFactory");
  const factory = await AgentFactory.deploy();
  
  // Wait for the deployment to be confirmed
  await factory.waitForDeployment();
  
  const factoryAddress = await factory.getAddress();
  console.log("✅ AgentFactory deployed to:", factoryAddress);
  
  // Verify deployment by checking if we can call a function
  try {
    const branchHash = ethers.id("test-branch");
    const tx = await factory.registerAgent(branchHash);
    await tx.wait();
    console.log("✅ Test agent registration successful");
    
    const agentAddress = await factory.agents(branchHash);
    console.log("✅ Test agent deployed at:", agentAddress);
  } catch (error) {
    console.log("⚠️  Test agent registration failed:", error.message);
  }
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("📋 Contract addresses:");
  console.log("   AgentFactory:", factoryAddress);
  console.log("\n💡 To interact with the contracts, use the AgentFactory address above.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

// Deployment script

// Deployment script
