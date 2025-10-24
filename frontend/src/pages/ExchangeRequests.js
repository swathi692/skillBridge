import React, { useState, useEffect } from "react";

function ExchangeRequestsPage() {
  const [exchanges, setExchanges] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    title: "",
    fromUser: "",
    toUser: "",
    skillOffered: "",
    skillWanted: "",
  });

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    setMessage("");
    setError(false);
    try {
      const response = await fetch("/api/exchanges");
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setError(true);
        setMessage("Server returned non-JSON response.");
        return;
      }

      if (response.ok) setExchanges(data);
      else {
        setError(true);
        setMessage("Failed to fetch exchanges: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError(true);
      setMessage("Could not connect to server.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      const response = await fetch("/api/exchanges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setError(true);
        setMessage("Server returned non-JSON response.");
        return;
      }

      if (response.ok) {
        setExchanges((prev) => [...prev, data]);
        setMessage("✅ Exchange request sent successfully!");
        setForm({ title: "", fromUser: "", toUser: "", skillOffered: "", skillWanted: "" });
      } else {
        setError(true);
        setMessage("❌ Failed to send request: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError(true);
      setMessage("❌ Could not connect to server.");
    }
  };

  return (
    
<div style={pageStyle}>
      
      {/* Send Exchange Request Form (TOP) */}
      <section style={{ marginTop: "20px" }}>
        <h2>Send Exchange Request</h2>
        {message && (
          <p style={{ color: error ? "red" : "green", fontWeight: "bold" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroup}>
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroup}>
            <label>From User</label>
            <input
              name="fromUser"
              value={form.fromUser}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroup}>
            <label>To User</label>
            <input
              name="toUser"
              value={form.toUser}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroup}>
            <label>Skill Offered</label>
            <input
              name="skillOffered"
              value={form.skillOffered}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroup}>
            <label>Skill Wanted</label>
            <input
              name="skillWanted"
              value={form.skillWanted}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" style={btnStyle}>
            Send Request
          </button>
        </form>
      </section>

      {/* Exchange Requests Table (BOTTOM) */}
      <section style={{ marginTop: "50px" }}>
        <h2>Exchange Requests</h2>

        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>From</th>
              <th style={thStyle}>To</th>
              <th style={thStyle}>Offered</th>
              <th style={thStyle}>Wanted</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {exchanges.length > 0 ? (
              exchanges.map((ex) => (
                <tr key={ex._id}>
                  <td style={tdStyle}>{ex.title}</td>
                  <td style={tdStyle}>{ex.fromUser}</td>
                  <td style={tdStyle}>{ex.toUser}</td>
                  <td style={tdStyle}>{ex.skillOffered}</td>
                  <td style={tdStyle}>{ex.skillWanted}</td>
                  <td style={tdStyle}>{ex.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={tdStyle}>
                  No exchange requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// 🎨 Styles
const pageStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  color: "#333",
};

const headerStyle = { marginBottom: "10px" };
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};
const thStyle = { border: "1px solid #ddd", padding: "8px", fontWeight: "bold" };
const tdStyle = { border: "1px solid #ddd", padding: "8px" };
const formStyle = { maxWidth: "400px", margin: "0 auto", textAlign: "left" };
const formGroup = { marginBottom: "10px", display: "flex", flexDirection: "column" };
const inputStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" };
const btnStyle = {
  marginTop: "15px",
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ExchangeRequestsPage;
