import React, { useState } from "react";
import Web3 from "web3";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";
const Tether = require("../truffle_abis/Tether.json");
const RWD = require("../truffle_abis/RWD.json");
const DecentralBank = require("../truffle_abis/DecentralBank.json");

// instantiate the class first
let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const App = () => {
  const address = syncAccount();
  const [contract, setContract] = useState({
    netId: 0,
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
    loading: true
  });

  React.useEffect(() => {
    loadBlockchain();
  }, [address]); // if empty it means run getNetId() once, re-run getNetId() when address changes

  const loadBlockchain = async () => {
    const tetherChainLink = await web3.eth.net.getId().then(result => result);
    //Load Tether
    const tetherData = Tether.networks[tetherChainLink];
    const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
    const tetherBalance = await web3.eth.getBalance(address);
    setContract({ ...contract, netId: tetherChainLink, tether: tether, tetherBalance: tetherBalance });
    //Load RWD
    const rwdChainLink = await web3.eth.net.getId().then(result => result);
    const rwdData = RWD.networks[rwdChainLink];
    const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
    const rwdBalance = await web3.eth.getBalance(address);
    setContract({ ...contract, netId: rwdChainLink, rwd: rwd, rwdBalance: rwdBalance });
    //Load DecentralBank
    const decentralBankChainLink = await web3.eth.net.getId().then(result => result);
    const decentralBankData = DecentralBank.networks[decentralBankChainLink];
    const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
    const decentralBankBalance = await web3.eth.getBalance(address);
    setContract({ ...contract, loading: false, netId: decentralBankChainLink, decentralBank: decentralBank, stakingBalance: decentralBankBalance });
  };

  return (
    <div>
      <Navbar walletAddress={address} />
    </div>
  );
};

export default App;
