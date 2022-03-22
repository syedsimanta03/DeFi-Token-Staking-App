import { useEffect, useState } from "react";

export const currentWallet = () => {
  const [address, setAddress] = useState("0x0");
  // don't use cache [] as we need update async type data, otherwise it renders once
  useEffect(() => {
     const data = localStorage.getItem("account");
     if (data) {
       setAddress(JSON.parse(data));
     }
  });
  return address;
};
