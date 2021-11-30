const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    //want the bank to have all reward token
    // deploy
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed()

    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed()

    // Transfer all RWD tokens to bank
    // wait for transfer to happen before anything else
    // 1 million -- 1 mil + 18
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    //Distribute 100 tether token to investor
    // 100
    await tether.transfer(accounts[1], '1000000000000000000')
};