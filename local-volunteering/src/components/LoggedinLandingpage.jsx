import React from "react";
import "./LoggedinLandingpage.css";
import l1 from "./l1.jpeg";
import l2 from "./l2.jpeg";
import l3 from "./l3.jpeg";
import l4 from "./l4.jpeg";

const LoggedinLandingPage = () => {
  return (
    <header className="loggedin-hero">
      <div className="loggedin-hero-content">
        {/* Left Section with 4 Images */}
        <div className="loggedin-left-section">
          <div className="loggedin-image-item">
            <img src={l1} alt="Image 1" />
          </div>
          <div className="loggedin-image-item">
            <img src={l2} alt="Image 2" />
          </div>
          <div className="loggedin-image-item">
            <img src={l3} alt="Image 3" />
          </div>
          <div className="loggedin-image-item">
            <img src={l4} alt="Image 4" />
          </div>
        </div>

        {/* Right Section with Welcome Message */}
        <div className="loggedin-right-section">
          <div className="loggedin-welcome-message">
            <h1 className="loggedin-hero-title">Welcome to Your New Journey,</h1>
            <p className="loggedin-hero-description">
              "Find your next cause and lead the change in the world! Explore new
              opportunities and make an impact."
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedinLandingPage;
