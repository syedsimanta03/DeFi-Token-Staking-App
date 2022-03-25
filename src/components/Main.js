import React from "react";
import { UserContext } from './App';
import { weiToeth } from './../hooks/web3utils';


const Main = () => {
 const contractData = React.useContext(UserContext); 
 console.log(contractData);
  return (
    <>
      <div className="container">
        <div>
          <h4 className="font-bold">Staking Balance</h4>
          <h6 className="font-exbold"> {weiToeth(contractData.stakingBalance)} USDT</h6>
        </div>
        <div>
          <h4 className="font-bold">Reward Balance</h4>
          <h6 className="font-exbold">{weiToeth(contractData.rwdBalance)} RWD</h6>
        </div>
      </div>
      <div className="card">
        <div className="between">
          <div>
            <h4 className="font-bold">Stake Tokens</h4>
            <h6 className="font-exbold">0</h6>
          </div>
          <div>
            <h4 className="font-bold">Balance:</h4>
            <h6 className="font-exbold">{weiToeth(contractData.tetherBalance)}</h6>
          </div>
        </div>
        <div className="form between">
          <input type="text" className="form__input" placeholder="Type amount..." />
          <div className="btn btn__secondary">
            <p>USDT</p>
          </div>
        </div>
        <div className="between">
          <div className="btn btn__primary">
            <p className="white">DEPOSIT</p>
          </div>
          <div className="btn btn__primary">
            <p className="white">WITHDRAW</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
