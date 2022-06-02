// ropsten factory address: 0xEe65e3A6946D42735C81d119aD562c427eA1bc54
// mumbai factory address: 0xB61271d05D13A29e6379E18D533f6c1B110d46Db
// fuji factory address: 0x8A366547C188412c93F2c5bdc776c8f0745545a7

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Factory = await ethers.getContractFactory("DMMFactory");
  const factory = await Factory.deploy(
    "0x7355cF2D978205Ea215576D34CdAA4F381FB6464"
  );

  console.log("Factory address:", factory.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);

// fair launch address fuji: 0x1aaE61d966e34731295179D29B67462B02eacCf1
