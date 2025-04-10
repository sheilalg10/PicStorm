import React from "react";
import logo from "../../assets/Images/Logo.png";
import "../../styles/css/style.css";
import { Search, Camera } from "lucide-react";

const NavBar = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="PicStorm Logo" className="logo-img" />
            PicStorm
          </div>
          <div className="nav-actions">
            <div className="nav-icon">
              <Search size={16} /> Search
            </div>
            <div className="nav-icon">
              <Camera size={16} /> My Photos
            </div>
          </div>
        </nav>

        <div className="wave-text">
          <h1>
            Good <br />
            photography has <br />
            no pretensions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
