// fuji address: 0x5777d499F09f1C3F7aACFBd8e25e3e6665F88714

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RewardsLockerV2 = await ethers.getContractFactory(
    "KyberRewardLockerV2"
  );
  const rewardsLockerV2 = await RewardsLockerV2.deploy(
    "0x7355cF2D978205Ea215576D34CdAA4F381FB6464"
  );

  console.log("KyberRewardLockerV2 address:", rewardsLockerV2.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
