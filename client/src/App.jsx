import { useState, useEffect } from "react";
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import header from "./header.jpg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Pay from "./components/Pay";
import { EnergyRecords } from "./components/EnergyRecords";
import Payment from "./components/Payment";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <img src={header} className="h-80 w-full" alt=".." />
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/pay" element={<Pay />} />
          <Route path="/energyRecords" element={<EnergyRecords />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// Do BE DELETED

{
  /* <Buy state={state} />
  <Memos state={state} /> */
}
