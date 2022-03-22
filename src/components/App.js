import React, { useEffect, useState } from "react";
import { currentWallet } from "../hooks/currentWallet";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";

const App = () => {
  syncAccount();
  const address = currentWallet();

  return (
    <div>
      <Navbar walletAddress={address} />
    </div>
  );
};

export default App;
