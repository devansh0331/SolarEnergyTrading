import { Button, Input } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

function Pay() {
  const { account, contractAddress, contract } = useContext(Context);
  const [amount, setAmount] = useState(0);
  const [errorMssg, setErrorMssg] = useState("");
  const [component, setComponent] = useState("Transfer");
  const [balance, setBalance] = useState();
  const [balanceLoading, setBalanceLoading] = useState(false);

  const sendEth = async () => {
    let transaction;
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
    const signer = provider.getSigner(); //write the blockchain
    transaction = await contract
      .connect(signer)
      .preDeposit({ value: ethers.utils.parseEther(amount.toString()) });
    await transaction.wait(1);
  };

  const checkBalance = async () => {
    try {
      let transaction;
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
      const signer = provider.getSigner(); //write the blockchain
      transaction = await contract.connect(signer).getBalance();
      setBalanceLoading(false);
      setBalance(ethers.utils.formatEther(transaction));
      console.log("Balance, " + balance);
    } catch (error) {
      setBalanceLoading(false);
      setBalance(0);
      console.log("Balance, " + balance);
    }
  };
  useEffect(() => {
    if (component == "Check_Balance") {
      setBalanceLoading(true);
      checkBalance();
    }
  }, [component]);
  return (
    <div>
      <div className="flex">
        <p
          className={`mr-2 bg-off p-2 rounded-md shadow-gray-800 cursor-pointer ${
            component == "Transfer" ? "shadow-inner" : "shadow-sm"
          }`}
          onClick={() => setComponent("Transfer")}
        >
          Transfer
        </p>
        <p
          className={`bg-off p-2 rounded-md shadow-gray-800 cursor-pointer ${
            component == "Check_Balance" ? "shadow-inner" : "shadow-sm"
          } `}
          onClick={() => setComponent("Check_Balance")}
        >
          Check Balance
        </p>
      </div>
      {component == "Transfer" && (
        <div className="w-full">
          <div className="w-3/4 mx-auto p-8 bg-off rounded-md shadow-md shadow-gray-300">
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-xl text-text font-semibold">
                  Etherium Transfer
                </p>
                <p className="text-sm ">Transfer Sepolia ETH to Contract</p>
              </div>
              {errorMssg.length > 0 && (
                <p className="text-red-500 text-sm text-right">{errorMssg}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <Input
                type="text"
                label="Consumer Address (You can change by switching to different metamask account)"
                value={account}
              />
              <Input
                // type="text"
                label="Contract Address"
                value={contractAddress}
                readOnly
                //   onChange={(e) => setReceiverAddress(e.target.value)}
              />
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max="1000000000000000000"
                label="Amount (in ETH)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-red-700">
                NOTE: Make sure the account(s) must present in "SEPOLIA" network
              </p>
              <div className="flex justify-end">
                <Button className="bg-text" onClick={sendEth}>
                  Transfer Amount
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {component == "Check_Balance" && (
        <div className="w-full">
          <div className="w-3/4 mx-auto p-8 bg-off rounded-md shadow-md shadow-gray-300">
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-xl text-text font-semibold">
                  Amount Deposited
                </p>
                <p className="text-sm ">Check your balance here</p>
              </div>
              {errorMssg.length > 0 && (
                <p className="text-red-500 text-sm text-right">{errorMssg}</p>
              )}
            </div>
            <div className="w-full flex justify-between">
              <div className="w-1/2 grid grid-cols-1 gap-6 mt-4">
                <Input
                  type="text"
                  label="Consumer Address (You can change by switching to different metamask account)"
                  value={account}
                />

                <p className="text-red-700">
                  NOTE: Make sure the account(s) must present in "SEPOLIA"
                  network
                </p>
                {/* <div className="flex justify-end">
                  <Button className="bg-text" onClick={checkBalance}>
                    Check Balance
                  </Button>
                </div> */}
              </div>
              <div className="w-1/4 p-4 bg-white rounded-xl shadow-md shadow-gray-300">
                <p className="text-base">Overview</p>
                <p className="text-xs text-gray-600 mt-3">ETH BALANCE</p>
                <p className="flex items-center mt-1">
                  {balanceLoading ? (
                    <ThreeDots
                      visible={true}
                      height="30"
                      width="30"
                      color=""
                      radius="10"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <>
                      <span>
                        <FaEthereum />
                      </span>
                      <span>{balance > 0 ? balance : 0} ETH</span>
                    </>
                  )}
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pay;
