// mumbai factory address: 0x8e90ac775088ea98EB8BbEa5d4Fc16c0ba11F2B4

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
