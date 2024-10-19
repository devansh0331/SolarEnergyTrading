import React, { useContext, useEffect, useState } from "react";
import { FaBatteryThreeQuarters, FaEthereum } from "react-icons/fa";
import { Context } from "../Context";
import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import { AiFillThunderbolt } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";

function Payment() {
  const { account, contractAddress, contract } = useContext(Context);
  const [data, setData] = useState([]);
  const [energy, setenergy] = useState(0);
  const [balance, setBalance] = useState();
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [energyLoading, setEnergyLoading] = useState(false);
  const [netPayamentLoading, setNetPaymentLoading] = useState(false);
  // const URL =
  //   "https://script.google.com/macros/s/AKfycbyviZN9K4sXRkDdrPIXXERh2KHcLN51VH5CgZFL145UdAqWw1cqhW9_pM3_GLQqcBXRaA/exec";
  const URL =
    "https://script.google.com/macros/s/AKfycbxr3gjKO-DS3KoyTGuMiHx0atUzfioSbWE44y21pOy2oIzFZ998IUYq76f3tLQCE7M7/exec";

  const fetchData = async () =>
    await fetch(URL)
      .then((response) => response.json())
      .then((resData) => {
        let i = 1;
        while (energy == 0) {
          if (resData[resData.length - i].energy != "") {
            setEnergyLoading(false);
            setenergy(resData[resData.length - i].energy);
            break;
          }
          i++;
        }
      })
      .catch((error) => {
        setEnergyLoading(false);
        console.log("Error:", error);
      });
  useEffect(() => {
    setEnergyLoading(true);
    fetchData();
    checkBalance();
  }, [energy]);
  const checkBalance = async () => {
    try {
      let transaction;
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
      const signer = provider.getSigner(); //write the blockchain
      transaction = await contract.connect(signer).getBalance();

      setBalance(ethers.utils.formatEther(transaction));
      console.log("Balance, " + balance);
    } catch (error) {
      setBalance(0);
      console.log("Balance, " + balance);
    }
  };

  const handlePayment = async () => {
    let transaction;
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
    const signer = provider.getSigner(); //write the blockchain
    transaction = await contract.connect(signer).energyTrade(energy * 10);
    await transaction.wait(1);
    checkBalance();
    alert("Payment Successfull");
  };

  return (
    <div className="w-full h-screen  bg-off p-8">
      <div className="w-1/2 mx-auto px-8">
        <p className="text-5xl ">Payment & Billing</p>
        <div className="w-full">
          <div className=" grid grid-cols-3 gap-4 py-8">
            <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
              <p className="text-base">Current Energy Consumption</p>
              <p className="text-xs text-gray-600 mt-3">ENERGY (kWh)</p>
              <p className="flex items-center mt-1">
                {energyLoading ? (
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
                      <AiFillThunderbolt />
                    </span>
                    <span>{energy > 0 ? energy : "0"} kWh</span>
                  </>
                )}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
              <p className="text-base">Conversion Rate</p>
              <p className="text-xs text-gray-600 mt-3">RATE (ETH / UNIT)</p>
              <p className="flex items-center mt-1">
                <span>
                  <FaEthereum />{" "}
                </span>
                <span> 0.2 Eth / Unit</span>
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
              <p className="text-base">NET Payment</p>
              <p className="text-xs text-gray-600 mt-3">ETHEREUM</p>
              <p className="flex items-center mt-1">
                {energyLoading ? (
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
                    <span>{(energy * 0.2).toPrecision(2)} ETH</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="p-4 bg-white rounded-xl shadow-md shadow-gray-300">
              <p className="text-xl mb-4 font-semibold">Dashboard</p>
              <div className="grid grid-cols-1 justify-between gap-2">
                <div className="w-full flex justify-between">
                  <p className=" ">From (address)</p>
                  <p className="text-gray-600">
                    {account.toString().slice(0, 5)}XXXXX
                  </p>
                </div>
                <div className="w-full flex justify-between">
                  <p className=" ">To (address)</p>
                  <p className="text-gray-600">
                    {/* {account.slice(account.length - 10, account.length - 1)} */}
                    {contractAddress.toString().slice(0, 5).toLowerCase()}
                    XXXXX
                  </p>
                </div>

                <div className="w-full flex justify-between">
                  <p className=" ">Amount Deposited (ETH)</p>
                  <p className="text-gray-600">
                    {/* {account.slice(account.length - 10, account.length - 1)} */}
                    {balance == 0 ? 0 : balance}
                  </p>
                </div>
                <div className="w-full flex justify-between">
                  <p className=" ">Consumption (kWh)</p>
                  <p className="text-gray-600">
                    {/* {account.slice(account.length - 10, account.length - 1)} */}
                    {energyLoading ? (
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
                        <span>{energy > 0 ? energy : "0"} kWh</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="w-full flex justify-between">
                  <p className=" ">Conversion Rate (Eth/unit)</p>
                  <p className="text-gray-600">
                    {/* {account.slice(account.length - 10, account.length - 1)} */}
                    0.2
                  </p>
                </div>
                <div className="w-full flex justify-between">
                  <p className=" ">NET Cost (ETH)</p>
                  <p className="text-xl font-semibold">
                    {/* {account.slice(account.length - 10, account.length - 1)} */}
                    {energyLoading ? (
                      <ThreeDots
                        visible={true}
                        height="50"
                        width="50"
                        color=""
                        radius="12"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      <>
                        {energy * 0.2 > balance
                          ? balance
                          : (energy * 0.2).toPrecision(2)}{" "}
                        Ethereum
                      </>
                    )}
                  </p>
                </div>
                <div className="mx-auto">
                  <Button
                    className={`bg-text ${
                      energyLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={energyLoading}
                    onClick={handlePayment}
                  >
                    Proceed Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
