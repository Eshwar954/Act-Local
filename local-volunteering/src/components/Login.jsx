import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Assuming you're using axios to fetch the users from JSON

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Fetching users..."); // Log to track if fetch request is made

      // Fetch users from the JSON file (for this, it's assumed you're running a local server or using JSON server)
      const response = await axios.get("http://localhost:3001/users"); // Replace with correct API endpoint if different
      console.log("Users fetched:", response.data); // Log the fetched users

      // Find the user that matches the entered username and password
      const user = response.data.find(
        (u) => u.username === username && u.password === password
      );
      console.log("User found:", user); // Log if a matching user is found

      if (user) {
        setUser(user); // Set user in app state
        localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
        console.log("Login successful, redirecting..."); // Log successful login
        alert("Login successful!");
        navigate("/"); // Redirect after login
      } else {
        console.log("Invalid credentials"); // Log invalid login attempt
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <div style={styles.error}>{error}</div>}
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      <div style={styles.signup}>
        Don't have an account? <a href="/signup">Signup</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  input: {
    display: "block",
    width: "90%",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  signup: {
    marginTop: "10px",
  },
};

export default Login;
