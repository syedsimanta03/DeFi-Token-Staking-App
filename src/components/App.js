import React, { useEffect, useState } from "react";
import syncAccount from "../hooks/syncAccount";
import Navbar from "./Navbar";

const App = () => {
  syncAccount();
  const [address, setAddress] = useState("0x0");
  function init() {
    const data = localStorage.getItem("account");
    if (data) {
      setAddress(JSON.parse(data));
    }
  }
  // don't use cache [] as we need update async type data
  useEffect(() => {
    init();
  });

  return (
    <div>
      <Navbar walletAddress={address} />
    </div>
  );
};

export default App;
