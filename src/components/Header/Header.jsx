import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/Logo.png";
import "../../styles/css/style.css";
import { Search, Camera } from "lucide-react";

const Header = () => {
  return (
    <div className="header-container">
      {/* SVG como fondo responsivo */}
      <svg className="wave" viewBox="0 0 1440 340" preserveAspectRatio="none">
        <path
          d="M0,320L80,320C160,320,320,320,480,277.3C640,235,800,149,960,122.7C1120,96,1280,128,1360,144L1440,160L1440,340L0,340Z"
          fill="white"
        />
      </svg>

      <div className="header-content">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="PicStorm Logo" className="logo-img" />
            PicStorm
          </div>
          <div className="nav-actions">
            <div>
              <Link className="nav-icon" to="/">
                <Search size={18} /> Search
              </Link>
            </div>
            <div>
              <Link className="nav-icon" to="/myPhotos">
                <Camera size={18} /> My Photos
              </Link>
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

export default Header;
