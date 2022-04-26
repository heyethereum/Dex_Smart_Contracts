const DMMFactory = artifacts.require('DMMFactory');
const DMMRouter02 = artifacts.require('DMMRouter02');

async function main () {
  const wethAddress = '0xc778417e063141139fce010982780140aa0cd5ab';
  const accounts = await web3.eth.getAccounts();
  // We get the contract to deploy
  const factory = await DMMFactory.new(accounts[0]);
  console.log('Factory deployed to:', factory.address);

  const router = await DMMRouter02.new(factory.address, wethAddress);
  console.log('Router deployed to:', router.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
