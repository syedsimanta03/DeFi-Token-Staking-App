import React, { useState } from "react";
import Web3 from "web3";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";
import Loader from './Loader';
import Main from './Main';
const Tether = require("../truffle_abis/Tether.json");
const RWD = require("../truffle_abis/RWD.json");
const DecentralBank = require("../truffle_abis/DecentralBank.json");
export const UserContext = React.createContext();

// instantiate the web3 first
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-ether");
    }
  };



const App = () => {
  const address = syncAccount();
  const networkID = window.ethereum.networkVersion;
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
  loadWeb3()
    loadBlockchain();
  }, [networkID, address]); // if empty it means run getNetId() once, re-run getNetId() when something changes inside[]

  const loadBlockchain = async () => {
    const web3 = window.web3;
    //Load Tether
    const tetherChainLink = await web3.eth.net.getId().then(result => result);
    setContract({ ...contract, netId: tetherChainLink });
    if (tetherChainLink !== 5777) {
    alert('Change network to Ganache!');
    return;
    };
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
    <UserContext.Provider value={contract}>
      <div>
        {contract.loading && <Loader />}
        {!contract.loading && (
          <>
            <Navbar walletAddress={address} />
            <Main />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
