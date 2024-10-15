import { createContext, useEffect, useState } from "react";

import solarABI from "./contractJson/solarEnergyTrading2.json";
import { ethers } from "ethers";

export const Context = createContext({});

export function ContextProvider({ children }) {
  const [account, setAccount] = useState("Not connected");
  //   const contractAddress = "0xeEADc15dAdf55B3bC59F35881ca3676B74c33555";
  const contractAddress = "0xE601738B1Fb61Ab35a61088C26565A3c1a5393D4";
  const contractABI = solarABI.abi;
  const [contract, setContract] = useState();

  useEffect(() => {
    const template = async () => {
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount("");
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(account);
      } catch (error) {
        console.log("ERROR");
        console.log(error);
      }
    };
    template();
    handleContract();
  }, []);
  const handleContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
      const signer = provider.getSigner(); //write the blockchain

      //   const contractinterface = new ethers.Contract(
      //     contractAddress,
      //     contractABI,
      //     signer
      //   );
      setContract(new ethers.Contract(contractAddress, contractABI, signer));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };
  return (
    <Context.Provider
      value={{ account, setAccount, contractAddress, contract }}
    >
      {children}
    </Context.Provider>
  );
}
