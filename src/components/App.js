import React, { useReducer, useState } from "react";
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
  const initialState = {
    netId: 0,
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
    loading: true
  };
  const [contract, setContract] = useReducer(
    (state, updates) => ({
      ...state,
      ...updates
    }),
    initialState
  );

  React.useEffect(() => {
  loadWeb3()
    loadBlockchain();
  }, [networkID, address]); // if empty it means run getNetId() once, re-run getNetId() when something changes inside[]

  const loadBlockchain = async () => {
          const web3 = window.web3;
          //Load Tether
          const tetherChainLink = await web3.eth.net.getId().then(result => (result));
          setContract({ netId: tetherChainLink });
          if (tetherChainLink !== 5777) {
            alert("Contract not deployed to this network!");
            return;
          }
          const tetherData = Tether.networks[tetherChainLink];
          const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
          let tetherBalance = await tether.methods.balanceOf(address).call();
            tetherBalance.toString()
          console.log("tether", tetherBalance);
          setContract({ tether: tether, tetherBalance: tetherBalance});
          //Load RWD
          const rwdChainLink = await web3.eth.net.getId().then(result => (result));
           setContract({ netId: rwdChainLink });
           if (rwdChainLink !== 5777) {
             alert("Contract not deployed to this network!");
             return;
           }
          const rwdData = RWD.networks[rwdChainLink];
          const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
          let rwdBalance = await rwd.methods.balanceOf(address).call();
          rwdBalance.toString();
          console.log("rwdBalance", rwdBalance);
          setContract({ rwd: rwd, rwdBalance: rwdBalance });
          //Load DecentralBank
          const decentralBankChainLink = await web3.eth.net.getId().then(result => (result));
           setContract({ netId: decentralBankChainLink });
           if (decentralBankChainLink !== 5777) {
             alert("Contract not deployed to this network!");
             return;
           }
          const decentralBankData = DecentralBank.networks[decentralBankChainLink];
          const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
          let decentralBankBalance = await decentralBank.methods.stakingBalance(address).call();
          decentralBankBalance.toString()
          setContract({ loading: false, decentralBank: decentralBank, stakingBalance: decentralBankBalance });
        };;

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
