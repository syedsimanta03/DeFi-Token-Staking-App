import React, { useState } from "react";
import Web3 from "web3";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";
const Tether = require("../truffle_abis/Tether.json");

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
    getNetId();
  }, [address]); // empty means run once, re-run getNetId() when address changes


  const getNetId = async () => {
    const chainLink = await web3.eth.net.getId().then(result => result);
    const tetherData = Tether.networks[chainLink];
    const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
    const balance = await web3.eth.getBalance(address);
    console.log(address, chainLink, balance);
    setContract({ ...contract, netId: chainLink, tether: tether, tetherBalance: balance });
  };

  return (
    <div>
      <Navbar walletAddress={address} />
    </div>
  );
};

export default App;
