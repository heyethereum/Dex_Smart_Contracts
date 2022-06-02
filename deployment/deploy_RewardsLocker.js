// fuji address: 0xAf69aDEB3cae6A072AF6aC7F6190460269eD1dbE
// fuji address(2nd launch): 0xA4712a6f199D3Ac21C9531f6151897F53da7A8e1
// fuji address(for OG Token):

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RewardsLocker = await ethers.getContractFactory("KyberRewardLocker");
  const rewardsLocker = await RewardsLocker.deploy(
    "0x7355cF2D978205Ea215576D34CdAA4F381FB6464"
  );

  console.log("KyberRewardLocker address:", rewardsLocker.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
