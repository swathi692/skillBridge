import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Ratings({ user }) {
  const [ratings, setRatings] = useState([]);
  const [ratee, setRatee] = useState("");
  const [score, setScore] = useState(1);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ratings");
      setRatings(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch ratings");
    }
  };

  const submitRating = async () => {
    if (!user) {
      setMessage("❌ You must be logged in to give ratings");
      return;
    }
    if (!ratee) {
      setMessage("❌ Please select a user to rate");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/ratings/submit", {
        rater: user.name,
        ratee,
        score,
        review,
      });
      setMessage("✅ Rating submitted!");
      setRatee("");
      setScore(1);
      setReview("");
      fetchRatings();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit rating");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ratings</h2>
      {message && <p>{message}</p>}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="User to rate"
          value={ratee}
          onChange={(e) => setRatee(e.target.value)}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <input
          type="number"
          min="1"
          max="5"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          style={{ padding: "5px", marginRight: "5px", width: "50px" }}
        />
        <input
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{ padding: "5px", marginRight: "5px", width: "200px" }}
        />
        <button onClick={submitRating}>Submit Rating</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Rater</th>
            <th>Ratee</th>
            <th>Score</th>
            <th>Review</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r._id}>
              <td>{r.rater}</td>
              <td>{r.ratee}</td>
              <td>{r.score}</td>
              <td>{r.review}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
