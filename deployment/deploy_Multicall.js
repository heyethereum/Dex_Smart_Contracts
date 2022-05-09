// mumbai factory address: 0x5cF8E500d0160812a251514Eebebf538fE0811Af

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();

  console.log("Multicall address:", multicall.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
