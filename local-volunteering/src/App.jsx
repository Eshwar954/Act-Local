import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RequestList from "./components/RequestList";
import AddRequest from "./components/AddRequest";
import LandingPage from "./components/Landingpage";
import RequestDetail from "./components/RequestDetail";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/requests" element={<RequestList/>} />
        <Route path="/requests/:id" element={<RequestDetail />} />
        <Route
          path="/add-request"
          element={
            user?.role === "organization" ? (
              <AddRequest />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/addrequest" element={<AddRequest></AddRequest>}/>
      </Routes>
    </Router>
  );
}

export default App;
