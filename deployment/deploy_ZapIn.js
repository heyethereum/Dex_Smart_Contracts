// ropsten factory address: 0xEe65e3A6946D42735C81d119aD562c427eA1bc54
// mumbai factory address: 0xB61271d05D13A29e6379E18D533f6c1B110d46Db
// ZapIn mumbai address: 0xF395a5Fd51BdE050DB23Cad9d4Ef3B26393FA6Bd

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ZapIn = await ethers.getContractFactory("ZapIn");
  const zapIn = await ZapIn.deploy(
    "0x8A366547C188412c93F2c5bdc776c8f0745545a7", // fuji factory address
    "0xd00ae08403b9bbb9124bb305c09058e32c39a48c" // fuji WETH address
  );

  console.log("ZapIn address:", zapIn.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);

// fuji address: 0x3db5c93C420Cc868d9DAd12067A31b2c69285aD5
