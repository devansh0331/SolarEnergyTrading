import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

function Navbar() {
  const { account } = useContext(Context);

  return (
    <div className="p-4 px-8 bg-off flex items-center justify-between">
      <p className="text-center text-3xl font-semibold text-text">
        Solar_Energy_Trading x IIT Bhilai
      </p>
      <div className="flex justify-end items-center text-base ">
        <Link to="/about" className="mx-6 text-gray-900 hover:text-text">
          <p>About</p>
        </Link>
        <Link to="/pay" className="mx-6 text-gray-900 hover:text-text">
          <p>Pay</p>
        </Link>
        <Link
          to="/energyRecords"
          className="mx-6 text-gray-900 hover:text-text"
        >
          <p>Energy Records</p>
        </Link>
        <Link to="/payment" className="mx-6 text-gray-900 hover:text-text">
          <p>Money Transfer</p>
        </Link>

        {account.length > 0 ? (
          <a href="" className="pl-6">
            <p className="bg-green-500 text-white font-semibold p-2 shadow-md">
              Connected
            </p>
          </a>
        ) : (
          <a href="" className="px-6">
            <p className="bg-text text-white font-semibold p-2 shadow-md">
              Connect
            </p>
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
