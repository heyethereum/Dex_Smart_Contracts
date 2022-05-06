// mumbai address: 0xf0dEF571E42c617442c7f42c611383eb7221141e

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const WETH = await ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();

  console.log("WETH address:", weth.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
