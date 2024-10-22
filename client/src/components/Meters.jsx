import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { Context } from "../Context";
import { ethers } from "ethers";

function Meters() {
  const [loading, setLoading] = useState(false);
  const { contractAddress } = useContext(Context);
  const [amount, setAmount] = useState(0);
  const checkEther = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance = await provider.getBalance(contractAddress);
    setAmount(ethers.utils.formatEther(balance));
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    checkEther();
  }, [amount]);
  return (
    <div className="w-full h-fit bg-off p-8">
      <div className="w-3/4 mx-auto">
        <div className=" pt-3 pb-6">
          <p className="text-5xl ">Meters</p>
          <p className="text-lg  ">
            Below are the Meters linked with your metamask account{" "}
          </p>
        </div>
        <div className="w-full">
          <div className=" grid grid-cols-3 gap-4 py-8">
            <div className="p-4 bg-white rounded-xl shadow-md shadow-gray-300 hover:shadow-xl  cursor-pointer">
              <p className="text-base">Device 1</p>
              <p className="text-xs text-gray-600 mt-3">DEVICE ID</p>
              <p className="flex items-center mt-1">1899-12-30T06:56:50.000Z</p>
              <p className="text-xs text-gray-600 mt-3">NET AMOUNT</p>
              <p className="flex items-center mt-1">
                {loading == true ? (
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
                    <span>{amount ? amount : 0} ETH</span>
                  </>
                )}
              </p>
            </div>
            {/* <div className="p-4 bg-white rounded-xl shadow-md shadow-gray-300 hover:shadow-xl  cursor-pointer">
              <p className="text-base">Device 1</p>
              <p className="text-xs text-gray-600 mt-3">DEVICE ID</p>
              <p className="flex items-center mt-1">1899-12-30T06:56:50.000Z</p>
              <p className="text-xs text-gray-600 mt-3">NET AMOUNT</p>
              <p className="flex items-center mt-1">
                {loading == true ? (
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
                    <span>{amount ? amount : 0} ETH</span>
                  </>
                )}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-md shadow-gray-300 hover:shadow-xl  cursor-pointer">
              <p className="text-base">Device 1</p>
              <p className="text-xs text-gray-600 mt-3">DEVICE ID</p>
              <p className="flex items-center mt-1">1899-12-30T06:56:50.000Z</p>
              <p className="text-xs text-gray-600 mt-3">NET AMOUNT</p>
              <p className="flex items-center mt-1">
                {loading == true ? (
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
                    <span>{amount ? amount : 0} ETH</span>
                  </>
                )}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meters;
