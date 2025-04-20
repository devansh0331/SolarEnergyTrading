import React, { useContext, useEffect, useState } from "react";
import { FaBatteryThreeQuarters, FaEthereum } from "react-icons/fa";
import { Context } from "../Context";
import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import { AiFillThunderbolt } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { PaymentDialog } from "./PaymentDialog";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";

function Payment() {
  const navigate = useNavigate();
  const { account, contractAddress, contract } = useContext(Context);
  const [data, setData] = useState([]);
  const [energy, setenergy] = useState(0);
  const [balance, setBalance] = useState();
  const [paymentTransactionMssg, setPaymentTransactionMssg] = useState("");
  const [open, setOpen] = useState(false);
  const [energyC1Loading, setEnergyC1Loading] = useState(false);
  const [energyC2Loading, setEnergyC2Loading] = useState(false);
  const [energyC1, setEnergyC1] = useState(0);
  const [energyC2, setEnergyC2] = useState(0);
  const [section, setSection] = useState("");
  const [netPayableAmount, setNetPayableAmount] = useState(0);
  const [dashboardDelay, setDashboardDelay] = useState(false);
  // const URL =
  //   "https://script.google.com/macros/s/AKfycbyviZN9K4sXRkDdrPIXXERh2KHcLN51VH5CgZFL145UdAqWw1cqhW9_pM3_GLQqcBXRaA/exec";
  // const URL =
  //   "https://script.google.com/macros/s/AKfycbxr3gjKO-DS3KoyTGuMiHx0atUzfioSbWE44y21pOy2oIzFZ998IUYq76f3tLQCE7M7/exec";
  const URL =
    "https://script.google.com/macros/s/AKfycby1RvGRqATEuTqNbJsT_owH1PQx3jSJ0bNc7L0rkmB1J6bP6guO9p4VPJSB58ud6urE/exec?type=1";

  const fetchData = async () =>
    await fetch(URL)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].energy == "") break;
          if (resData[i].supply > 0) {
            setEnergyC2(resData[i].energy);
          }
          if (resData[i].supply < 0) {
            setEnergyC1(resData[i].energy);
          }
        }
        setEnergyC1Loading(false);
        setEnergyC2Loading(false);
      })
      .catch((error) => {
        setEnergyC1Loading(false);
        setEnergyC1Loading(false);

        console.log("Error:", error);
      });
  useEffect(() => {
    setEnergyC1Loading(true);
    setEnergyC2Loading(true);
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
    } catch (error) {
      setBalance(0);
      console.log("Balance, " + balance);
    }
  };
  const handlePayment = async () => {
    setPaymentTransactionMssg("wait");
    try {
      let transaction;
      const { ethereum } = window;

      if (netPayableAmount > balance) {
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain
        transaction = await contract
          .connect(signer)
          .energyTrade(ethers.utils.parseEther(balance.toString()), 1);
        await transaction.wait(1);
        checkBalance();
        setPaymentTransactionMssg("success");
        setInterval(() => {
          setPaymentTransactionMssg("");
        }, 5000);
      } else {
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        transaction = await contract
          .connect(signer)
          .energyTrade(ethers.utils.parseEther(netPayableAmount.toString()), 0);
        await transaction.wait(1);
        checkBalance();
        setPaymentTransactionMssg("success");
        setInterval(() => {
          setPaymentTransactionMssg("");
        }, 5000);
        // alert("Payment Successfull");
      }
    } catch (error) {
      setPaymentTransactionMssg("error");
      setInterval(() => {
        setPaymentTransactionMssg("");
      }, 5000);
    }
  };

  return (
    <div className="w-full h-screen  bg-off p-8">
      <div className="w-1/2 mx-auto px-8">
        <p className="text-5xl ">Payment & Billing</p>
        <p className="py-4">Settle your payments here</p>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => {
                setDashboardDelay(true);
                setNetPayableAmount((energyC1 * 0.02).toFixed(4));
                setSection("Consumer1");
                setTimeout(() => {
                  setDashboardDelay(false);
                }, 3000);
              }}
              className={`p-4 rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300 ${
                section == "Consumer1" ? "bg-gray-300" : "bg-white"
              }`}
            >
              {/* <p className="text-base">Current Energy Consumption</p> */}
              <p className="text-base">Energy Consumption by House 1</p>
              <p className="text-xs text-gray-600 mt-3">ENERGY (kWh)</p>
              <p className="flex items-center mt-1">
                {energyC1Loading ? (
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
                    <span>{energyC1 > 0 ? energyC1 : "0"} kWh</span>
                  </>
                )}
              </p>
            </div>
            <div
              onClick={() => {
                setDashboardDelay(true);
                setTimeout(() => {
                  setDashboardDelay(false);
                }, 3000);
                setNetPayableAmount((energyC2 * 0.02).toFixed(4));
                setSection("Consumer2");
              }}
              className={`p-4 rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300 ${
                section == "Consumer2" ? "bg-gray-300" : "bg-white"
              }`}
            >
              <p className="text-base">Energy Consumption by House 2</p>
              <p className="text-xs text-gray-600 mt-3">ENERGY (kWh)</p>
              <p className="flex items-center mt-1">
                {energyC2Loading ? (
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
                      <FaEthereum />{" "}
                    </span>
                    <span>{energyC2 > 0 ? energyC2 : "0"} kWh</span>
                  </>
                )}
              </p>
            </div>
          </div>
          {section != "" && (
            <>
              {dashboardDelay ? (
                <div className="flex justify-center items-center h-[40vh] bg-gray-300 p-4 rounded-lg my-4 relative">
                  {/* <div
                    onClick={() => setSection("")}
                    className="absolute right-4 top-2 font-bold"
                  >
                    X
                  </div> */}
                  <Grid
                    visible={true}
                    height="60"
                    width="60"
                    color="#0C6CF2"
                    ariaLabel="grid-loading"
                    radius="9.5"
                    wrapperClass="grid-wrapper"
                  />
                </div>
              ) : (
                <div className="bg-gray-300 p-4 rounded-lg my-4 relative">
                  <div
                    onClick={() => setSection("")}
                    className="absolute right-4 top-2 font-bold cursor-pointer"
                  >
                    X
                  </div>
                  <div className=" grid grid-cols-3 gap-4 pt-4 pb-8">
                    <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
                      <p className="text-base">Current Energy Consumption</p>
                      <p className="text-xs text-gray-600 mt-3">ENERGY (kWh)</p>
                      <p className="flex items-center mt-1">
                        {/* {energyLoading ? (
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
                      <> */}
                        <span>
                          <AiFillThunderbolt />
                        </span>
                        <span>
                          {section == "Consumer1" && energyC1 >= 0 && energyC1}{" "}
                          {section == "Consumer2" && energyC2 >= 0 && energyC2}{" "}
                          kWh
                        </span>
                        {/* </>
                    )} */}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
                      <p className="text-base">Conversion Rate</p>
                      <p className="text-xs text-gray-600 mt-3">
                        RATE (ETH / KWH)
                      </p>
                      <p className="flex items-center mt-1">
                        <span>
                          <FaEthereum />{" "}
                        </span>
                        <span> 0.02 Eth / KWh</span>
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-md  hover:shadow-lg duration-400 cursor-pointer shadow-gray-300">
                      <p className="text-base">NET Payment</p>
                      <p className="text-xs text-gray-600 mt-3">ETHEREUM</p>
                      <p className="flex items-center mt-1">
                        {/* {energyLoading ? (
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
                      <> */}
                        <span>
                          <FaEthereum />
                        </span>
                        {section == "Consumer1" &&
                          energyC1 >= 0 &&
                          netPayableAmount}{" "}
                        {section == "Consumer2" &&
                          energyC2 >= 0 &&
                          netPayableAmount}{" "}
                        {/* </>
                    )} */}
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
                            {contractAddress
                              .toString()
                              .slice(0, 5)
                              .toLowerCase()}
                            XXXXX
                          </p>
                        </div>

                        <div className="w-full flex justify-between">
                          <p className=" ">Amount Available (ETH)</p>
                          <p className="text-gray-600">
                            {balance == 0 ? 0 : balance}
                          </p>
                        </div>
                        <div className="w-full flex justify-between">
                          <p className=" ">Consumption (kWh)</p>
                          <p className="text-gray-600">
                            {energyC1Loading ? (
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
                                  {section == "Consumer1" &&
                                    energyC1 > 0 &&
                                    energyC1}{" "}
                                  {section == "Consumer2" &&
                                    energyC2 > 0 &&
                                    energyC2}{" "}
                                  kWh
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                        <div className="w-full flex justify-between">
                          <p className=" ">Conversion Rate (Eth/kWh)</p>
                          <p className="text-gray-600">0.02</p>
                        </div>
                        <div className="w-full flex justify-between">
                          <p className=" ">NET Payable Amount (ETH)</p>
                          <p className="text-xl font-semibold">
                            {false ? (
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
                                {/* {energy * 0.2 > balance
                              ? balance
                              : (energy * 0.2).toPrecision(2)}{" "} */}
                                {netPayableAmount > balance
                                  ? balance
                                  : netPayableAmount}
                                &nbsp;Ethereum
                              </>
                            )}
                          </p>
                        </div>
                        <p className="text-red-700"></p>
                        <div className="w-full flex items-center justify-end">
                          {paymentTransactionMssg == "wait" && (
                            <p className="mr-4 text-yellow-900 font-semibold">
                              Transaction in progress...
                            </p>
                          )}
                          {/* {paymentTransactionMssg == "calculating" && (
                        <p className="mr-4 text-yellow-900 font-semibold">
                          Calculating your bill...
                          <br />{" "}
                        </p>
                      )} */}
                          {paymentTransactionMssg == "success" && (
                            <p className="mr-4 text-green-500 font-semibold text-right">
                              Transaction Successfull...
                              <br />{" "}
                              <span className="text-sm">
                                (wait for a few second)
                              </span>{" "}
                            </p>
                          )}
                          {paymentTransactionMssg == "error" && (
                            <p className="mr-4 text-red-500 font-semibold text-right">
                              Error had occured while transaction
                              <br />{" "}
                              <span className="text-sm">
                                (Try again in a few second)
                              </span>{" "}
                            </p>
                          )}

                          {(balance == 0 || energy * 0.2 > balance) && (
                            <Button
                              variant="outlined"
                              className="mr-4"
                              onClick={() => navigate("/pay")}
                            >
                              Deposit Amount
                            </Button>
                          )}
                          <Button
                            className={`bg-text ${
                              energyC1Loading || energyC2Loading
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            disabled={
                              paymentTransactionMssg != "" ||
                              energyC1Loading ||
                              energyC2Loading ||
                              balance == 0
                                ? true
                                : false
                            }
                            onClick={handlePayment}
                          >
                            Proceed Payment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <PaymentDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Payment;
