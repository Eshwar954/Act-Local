import React from "react";
import "./OrganizationLandingpage.css"


const LandingPage = () => {

  // Default landing page for unauthenticated users
  return (
    <div>
      <header className="Background-box">
        <div className="inner-box">
          <div className="text-box">
            <h1 className="title">
              Recruit Best Volunteers <br></br>for your Best Causes
            </h1>
          </div>
        </div>
      </header>      
    </div>
  );
};

export default LandingPage;
