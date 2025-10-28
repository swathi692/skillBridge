import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("Invalid response format:", res.data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("⚠️ Failed to fetch users from server");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "30px" }}>Loading users...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2575fc", marginBottom: "20px" }}>All Users</h2>
      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
      >
        <thead style={{ backgroundColor: "#f7f9fc" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Points</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{Array.isArray(u.skills) ? u.skills.join(", ") : ""}</td>
                <td>{u.points ?? 0}</td>
                <td>{u.rating ?? 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
