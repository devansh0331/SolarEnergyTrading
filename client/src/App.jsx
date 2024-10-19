import { useState, useEffect } from "react";

import header from "./header.jpg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Pay from "./components/Pay";
import { EnergyRecords } from "./components/EnergyRecords";
import Payment from "./components/Payment";
import Meters from "./components/Meters";

function App() {
  return (
    <div className="h-screen bg-off">
      <Navbar />
      {/* <div>
        <img src={header} className="h-80 w-full" alt=".." />
      </div> */}
      {/* <div className="bg-dark p-8"></div> */}
      <div className="">
        <Routes>
          <Route path="/pay" element={<Pay />} />
          <Route path="/energyRecords" element={<EnergyRecords />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/meters" element={<Meters />} />
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
