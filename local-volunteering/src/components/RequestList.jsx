import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import './RequestList.css';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3001/requests")
      .then((response) => {
        setRequests(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(() => {
        setError("Failed to load requests."); // Handle error if any
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <div className="request-list-container">
      <h2>Requests</h2>
      {requests.length === 0 ? (
        <p>No requests available.</p> // Message when no requests are present
      ) : (
        <div className="request-list-grid">
          {requests.map((req) => (
            <div key={req.id} className="request-box">
              <h3>{req.title}</h3>
              <p><strong>Description:</strong> {req.shortDescription}</p>
              <p><strong>Organization:</strong> {req.organization}</p>
              <p><strong>Status:</strong> {req.status}</p>
              {/* Add a button to navigate to the detailed view */}
              <Link to={`/requests/${req.id}`} className="details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;
