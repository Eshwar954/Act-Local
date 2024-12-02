import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RequestDetail.css";

const RequestDetails = () => {
  const { id } = useParams(); // Extract the request ID from the URL
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the request details
    axios
      .get(`http://localhost:3001/requests/${id}`)
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load request details.");
        setLoading(false);
      });
  }, [id]);

  // Handle apply button click
  const handleApplyClick = () => {
    if (request && request.organizationWebsite) {
      window.location.href = request.organizationWebsite; // Redirect to the organization's website
    } else {
      alert("Organization website is not available.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="request-details-container">
      <div className="details-box">
        <h2>{request.title}</h2>
        <p><strong>Work:</strong> {request.shortDescription}</p>
        <p>
          <strong>Detailed Description:</strong>{" "}
          {request.detailedDescription ? (
            <span
              dangerouslySetInnerHTML={{
                __html: request.detailedDescription.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            "No detailed description available for this request."
          )}
        </p>
        <p><strong>Organization:</strong> {request.organization}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Location:</strong> {request.location || "Not provided"}</p>
        <p><strong>Contact:</strong> {request.contactPerson || "Not provided"}</p>
        <p><strong>Date:</strong> {request.dueDate || "Not provided"}</p>

        <button className="apply-button" onClick={handleApplyClick}>Apply for Request</button>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="map-box">
        {request.location ? (
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(request.location)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        ) : (
          <p>Location map not available.</p>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
