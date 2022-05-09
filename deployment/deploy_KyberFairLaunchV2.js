// mumbai factory address: 0xB056e44c8c8c8017398790CD46548BcAe193BD60

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FairLaunchV2 = await ethers.getContractFactory("KyberFairLaunchV2");
  const fairLaunchV2 = await FairLaunchV2.deploy(
    "0x35C7C18B854684C2ea522B0e052be0aC1FBc42b5", // _admin address
    "", // _RewardsTokens
    "0xB056e44c8c8c8017398790CD46548BcAe193BD60" // _RewardsLockerV2
  );

  console.log("KyberFairLaunchV2 address:", fairLaunchV2.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
