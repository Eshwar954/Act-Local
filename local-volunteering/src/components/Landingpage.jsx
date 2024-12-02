import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";
import LoggedInLandingPage from "./LoggedinLandingpage"; // Volunteer landing page
import OrganizationLandingPage from "./OrganisationLandingpage" // Organization landing page
import RequestList from "./RequestList";
import Abtimg from "./aboutimg.jpeg";
import Marquee1 from "./marquee11.jpeg";
import Marquee2 from "./marquee12.jpeg";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // If user is logged in, check the role and render appropriate landing page
  if (user) {
    if (user.role === "volunteer") {
      return <LoggedInLandingPage />; // Volunteer landing page
    } else if (user.role === "organization") {
      return <OrganizationLandingPage />; // Organization landing page
    }
  }

  // Default landing page for unauthenticated users
  return (
    <div>
      <header className="hero">
        <div className="overlay">
          <div className="container text-center text-white">
            <h1 className="display-4 hero-title">
              Your Path To Purpose Starts Here
            </h1>
            <p className="lead hero-description">
              Find opportunities to volunteer and make a difference in your
              community.
            </p>
            <a href="/signup" className="btn btn-primary hero-btn">
              Signup
            </a>
            <a href="/login" className="btn btn-primary hero-btn">
              Login
            </a>
          </div>
        </div>
        {/* Scrolling Marquee */}
        <div className="marquee">
          <div className="marquee-content">
            <img src={Marquee1} alt="Scrolling images" className="marquee-image" />
            <img src={Marquee2} alt="Scrolling images" className="marquee-image" />
          </div>
        </div>
      </header>

      <RequestList />

      {/* About Section */}
      <section className="container about-section mt-5">
        <div className="row">
          <div className="col-lg-6 about-text">
            <h2 className="about-title">
              More People
              <br />
              More Impact
            </h2>
            <p className="about-description">
              Act Local is the most effective way to recruit highly qualified
              volunteers for your nonprofit. We match you with people who are
              passionate about and committed to your cause, and who can help
              when and where you need them. And because volunteers are often
              donors as well, we make it easy for them to contribute their time
              and money.
            </p>
          </div>
          <div className="col-lg-6 about-image">
            <img src={Abtimg} alt="Volunteering" className="img-fluid" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="position-relative">
        <div className="text-center py-3">
          <p>&copy; 2024 Local Volunteering. All rights reserved.</p>
          <p>
            <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
