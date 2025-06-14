import { createContext, useEffect, useState } from "react";

import solarABI from "./contractJson/solarEnergyTrading2.json";
import { ethers } from "ethers";

export const Context = createContext({});

export function ContextProvider({ children }) {
  const [account, setAccount] = useState("Not connected");
  //   const contractAddress = "0xeEADc15dAdf55B3bC59F35881ca3676B74c33555";
  // const contractAddress = "0xE601738B1Fb61Ab35a61088C26565A3c1a5393D4";
  // const contractAddress = "0x3Cef76601E25F340103D2b005F9871E92269C931";
  // const contractAddress = "0x7fa9E4ca80580363c79A8b4174555FE3B8DebB87";
  // const contractAddress = "0x262C48e92B3f465746fdbDf0661706F538d3448C"; // Demonstrated at IIT Kanpur
  const contractAddress = "0x9a53838A8Bc9f5eD25c0e817b8f29Cc7C0514efD"; // Deployed at IIT BH
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
