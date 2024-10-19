import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { Button } from "@material-tailwind/react";

function Navbar() {
  const { account } = useContext(Context);
  return (
    <div className="p-4 px-8  bg-white mb-3  shadow-md shadow-gray-300 flex items-center justify-between">
      <p className="text-center text-3xl font-semibold text-text">SETS</p>
      <div className="flex justify-end items-center text-base ">
        <Link to="/about" className="mx-6 text-gray-900 hover:text-text">
          <p>About</p>
        </Link>
        <Link to="/meters" className="mx-6 text-gray-900 hover:text-text">
          <p>Meters</p>
        </Link>
        <Link to="/pay" className="mx-6 text-gray-900 hover:text-text">
          <p>Deposit</p>
        </Link>
        <Link
          to="/energyRecords"
          className="mx-6 text-gray-900 hover:text-text"
        >
          <p>Energy Records</p>
        </Link>
        <Link to="/payment" className="mx-6 text-gray-900 hover:text-text">
          <p>Payment & Billing</p>
        </Link>

        {account != "Not connected" ? (
          <Button className="bg-green-500 cursor-default">Connected</Button>
        ) : (
          <Button className="bg-text cursor-default">Connect</Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
