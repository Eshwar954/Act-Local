import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: { username },
      });

      if (response.data.length > 0) {
        setError("Username already exists, please choose another.");
        return;
      }

      // Create a new user
      const newUser = {
        username,
        password,
        role,
      };

      // Add the new user to the fake database (JSON Server)
      await axios.post("http://localhost:3001/users", newUser);

      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option value="volunteer">Volunteer</option>
        <option value="organization">Organization</option>
      </select>
      {error && <div style={styles.error}>{error}</div>}
      <button onClick={handleSignup} style={styles.button}>
        Signup
      </button>
      <div style={styles.login}>
        Already have an account? <a href="/login">Login</a>
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
  login: {
    marginTop: "10px",
  },
};

export default Signup;
