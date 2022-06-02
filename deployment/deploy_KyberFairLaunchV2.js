// fuji address: 0x201F004A8A6789a80e1c11CF909c2C8880662779
// fuji address V1: 0xA6D4Cb16DcD29648eF6262e861e336Ad99E5b0f6
// fuji address V1(2nd Launch): 0xcdf7d727f051FB5b643dAAF051B2b836B441755e
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FairLaunchV2 = await ethers.getContractFactory("KyberFairLaunchV2");
  const fairLaunchV2 = await FairLaunchV2.deploy(
    "0x7355cF2D978205Ea215576D34CdAA4F381FB6464", // _admin address
    "0xCb76B1948F65132F2e52eD681FD26935c9E206F2", // _RewardsTokens
    "0x5777d499F09f1C3F7aACFBd8e25e3e6665F88714" // _RewardsLockerV2
  );

  console.log("KyberFairLaunchV2 address:", fairLaunchV2.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
