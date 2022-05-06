// mumbai factory address: 0x8e90ac775088ea98EB8BbEa5d4Fc16c0ba11F2B4

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RewardsLocker = await ethers.getContractFactory("OrchardRewardLocker");
  const rewardsLocker = await RewardsLocker.deploy(
    "0x35C7C18B854684C2ea522B0e052be0aC1FBc42b5"
  );

  console.log("OrchardRewardLocker address:", rewardsLocker.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
