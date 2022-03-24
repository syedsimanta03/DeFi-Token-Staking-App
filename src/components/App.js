import React, { useState } from "react";
import Web3 from "web3";
import { currentWallet } from "../hooks/currentWallet";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";
const Tether = require("../truffle_abis/Tether.json");

// instantiate the class first
let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const App = () => {

  const address = currentWallet("account");
  syncAccount();

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

  const getNetId = async () => {
   const value = await web3.eth.net.getId().then(result =>  result)
   const tetherData = Tether.networks[value];
   const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
   //const balance = await web3.eth.getBalance(address)
   setContract({ ...contract, netId: value, tether: tether});
   console.log(address, value);
  }
  
React.useEffect(() => {
  getNetId();
}, []); // empty means run once




 /*  if (contract.tether) {

    const getBalance = web3.eth.getBalance(address); //await
    setContract({tetherBalance: getBalance });
  } else {
    console.log("Tether Not Deployed Yet!");
  } */

  return (
    <div>
      <Navbar walletAddress={address} />
    </div>
  );
};

export default App;
