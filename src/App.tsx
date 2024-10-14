import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./components/Customers";
import AddCustomer from "./components/AddCustomer";
import UpdateCustomer from "./components/UpdateCustomer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
