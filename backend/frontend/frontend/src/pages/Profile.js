import React, { useState, useEffect } from "react";

function Profile({ user }) {
  const [name, setName] = useState(user.name);
  const [skills, setSkills] = useState(user.skills);
  const [message, setMessage] = useState("");

  const userId = user._id; // make sure this is your user's MongoDB _id

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, skills }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage("❌ Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input
        value={skills.join(",")}
        onChange={(e) => setSkills(e.target.value.split(","))}
      />
      <button onClick={handleUpdate}>Update Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default Profile;
