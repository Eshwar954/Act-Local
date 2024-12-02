import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./LOGO.jpeg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navigateToDashboard = () => {
    if (user?.role === "volunteer") {
      navigate("/volunteer-dashboard");
    } else {
      alert("Please log in first");
      navigate("/login");
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={Logo} alt="logo" style={styles.logoImage} />
          <Link to="/" style={styles.logoText}>
            ACT LOCAL
          </Link>
        </div>

        <div style={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <div
          style={{
            ...styles.links,
            display: menuOpen ? "block" : "flex",
          }}
        >
          <Link to="/" style={styles.link}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/requests" style={styles.link}>
                Requests
              </Link>
              {user.role === "organization" && (
                <Link to="/addrequest" style={styles.link}>
                  Add Request
                </Link>
              )}
              <div
                style={styles.profileContainer}
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <FaUserCircle style={styles.profileIcon} />
                {dropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    {user.role === "volunteer" && (
                      <button
                        onClick={navigateToDashboard}
                        style={styles.dropdownLink}
                      >
                        Go to Volunteer Dashboard
                      </button>
                    )}
                    <button onClick={handleLogout} style={styles.dropdownLink}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/signup" style={styles.link}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#AAC3D9",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "40px",
    marginRight: "10px",
  },
  logoText: {
    fontSize: "1.8rem",
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
  },
  menuIcon: {
    display: "none",
    cursor: "pointer",
    color: "black",
  },
  links: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  link: {
    color: "black",
    padding: "10px 15px",
    marginLeft: "15px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  profileContainer: {
    position: "relative",
    cursor: "pointer",
    marginLeft: "20px",
  },
  profileIcon: {
    fontSize: "1.8rem",
    color: "black",
  },
  dropdownMenu: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "#1a1a1a",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    padding: "10px 0",
    zIndex: 1000,
    width: "200px",
  },
  dropdownLink: {
    display: "block",
    width: "100%",
    padding: "12px 20px",
    background: "transparent",
    color: "#fff",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  "@media (max-width: 768px)": {
    menuIcon: {
      display: "block",
    },
    links: {
      display: "none",
      position: "absolute",
      top: "60px",
      left: "0",
      right: "0",
      backgroundColor: "#333",
      flexDirection: "column",
      width: "100%",
    },
  },
};

export default Navbar;
