import { NavBar } from "../components/Navbar";
import "./MainPage.css";
import React from 'react'
import logo from "../assets/logo.png";

function MainPage() {
  return (
    <div>
      <NavBar />
      <div className="maintitle">
        <img src={logo} alt="Hat" className="mainlogo" />
      </div>
        <div className = "mainline">
      </div>

      <div className="mainsearchtitle">
        <div className="empty"></div>
        <div className="searchtext">Search</div>
        <div className="empty"></div>
      </div>

      <div className="belowtitle">
        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
};

export default MainPage;