const { ethers, upgrades } = require("hardhat");
// mumbai address: 0xDbcAFB7e03D417896294Bfbaa3E56589A45fBe2C

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Orc = await ethers.getContractFactory("OrchardNetworkTokenV2");
  const orc = await upgrades.deployProxy(Orc);
  await orc.deployed();

  console.log("Orchard Network Token address:", orc.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
