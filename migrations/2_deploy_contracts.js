// eslint-disable-next-line
const Tether = artifacts.require("Tether");
// eslint-disable-next-line
const RWD = artifacts.require("RWD");
// eslint-disable-next-line
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  await rwd.transfer(decentralBank.address, "1000000000000000000000000"); //1M
  // eslint-disable-next-line
  await tether.transfer(accounts[1], "10000000000000000");
};
