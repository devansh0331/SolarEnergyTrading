const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("SolarEnergyTrading2"); //fetching bytecode and ABI

  const chai = await Chai.deploy(
    "0x8EC6082f6E46295cD70CCae14Fe23a93cB4A6286",
    ethers.utils.parseEther("0.2")
  ); //creating an instance of our smart contract

  await chai.deployed(); //deploying your smart contract

  console.log("Deployed contract address:", `${chai.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0xa64e3144835aF8781c750ceC432784a68d883266
