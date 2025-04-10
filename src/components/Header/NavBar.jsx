import React from "react";
import logo from "../../assets/Images/Logo.png";
import "../../styles/css/style.css";
import { Search, Camera } from "lucide-react";

const NavBar = () => {
  return (
    <div className="header-container">
      <svg
        className="wave-bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fad0c4" />
            <stop offset="50%" stopColor="#ffd1ff" />
            <stop offset="100%" stopColor="#a18cd1" />
          </linearGradient>
        </defs>
        <path
          d="M0,256L80,261.3C160,267,320,277,480,261.3C640,245,800,203,960,170.7C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          fill="url(#waveGradient)"
        />
      </svg>

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
            Good photography has <br />
            <span>no pretensions</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
