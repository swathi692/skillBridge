import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="dashboard-container" style={{
      padding: "20px",
      background: "#f0f4f8",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#333", fontSize: "2rem" }}>Dashboard</h2>
      {user ? (
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Welcome, {user.name}!</p>
      ) : (
        <p style={{ fontSize: "1.2rem", color: "#555" }}>Please login to view your dashboard.</p>
      )}
    </div>
  );
}
