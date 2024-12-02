import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRequest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [error, setError] = useState("");

  const userRole = "organization";

  useEffect(() => {
    axios
      .get("http://localhost:3001/requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Failed to fetch requests:", error));
  }, []);

  const handleAddOrEditRequest = async () => {
    if (!title || !description || !organization || !category || !location || !dueDate || !contactPerson || !email) {
      setError("All fields are required.");
      return;
    }

    const newRequest = {
      title,
      detailedDescription: description,
      organization,
      category,
      location,
      dueDate,
      contactPerson,
      email,
      status: isEditing ? "Updated" : "Open",
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/requests/${currentRequestId}`, newRequest);
        alert("Request updated successfully!");
      } else {
        await axios.post("http://localhost:3001/requests", newRequest);
        alert("Request added successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setOrganization("");
      setCategory("");
      setLocation("");
      setDueDate("");
      setContactPerson("");
      setEmail("");
      setError("");
      setIsEditing(false);
      setCurrentRequestId(null);

      const updatedRequests = await axios.get("http://localhost:3001/requests");
      setRequests(updatedRequests.data);
    } catch (error) {
      console.error("Error adding/updating request:", error);
      setError("Failed to add or update request. Please try again.");
    }
  };

  const handleEditClick = (request) => {
    setTitle(request.title);
    setDescription(request.detailedDescription);
    setOrganization(request.organization);
    setCategory(request.category);
    setLocation(request.location);
    setDueDate(request.dueDate);
    setContactPerson(request.contactPerson);
    setEmail(request.email);
    setIsEditing(true);
    setCurrentRequestId(request.id);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/requests/${id}`);
      alert("Request deleted successfully!");

      const updatedRequests = await axios.get("http://localhost:3001/requests");
      setRequests(updatedRequests.data);
    } catch (error) {
      console.error("Error deleting request:", error);
      setError("Failed to delete request. Please try again.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Add/Edit Request Section */}
      <div style={styles.section}>
        <h2 style={styles.heading}>{isEditing ? "Edit Request" : "Add Request"}</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          style={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
          <option value="Community">Community</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddOrEditRequest} style={styles.button}>
          {isEditing ? "Update Request" : "Add Request"}
        </button>
      </div>

      {/* Your Requests Section */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Your Requests</h2>
        <ul style={styles.list}>
          {requests.map((request) => (
            <li key={request.id} style={styles.listItem}>
              <h3>{request.title}</h3>
              <p>{request.detailedDescription}</p>
              <p>
                <strong>Organization:</strong> {request.organization}
              </p>
              <p>
                <strong>Contact:</strong> {request.contactPerson} ({request.email})
              </p>
              <p>
                <strong>Status:</strong> {request.status}
              </p>
              <button
                onClick={() => handleEditClick(request)}
                style={styles.editButton}
                disabled={userRole !== "organization"}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(request.id)}
                style={styles.deleteButton}
                disabled={userRole !== "organization"}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "20px",
    backgroundColor: "#f4f7fb",
  },
  section: {
    flex: "1 1 45%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    minWidth: "300px", // Ensures responsiveness
  },
  addRequestSection: {
    flex: "1 1 30%", // Reduced width for "Add Request" box
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    minWidth: "300px", // Ensures it still adjusts well on small screens
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  error: {
    color: "#f44336",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    minHeight: "120px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  select: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "15px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  editButton: {
    marginRight: "10px",
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};


export default AddRequest;
