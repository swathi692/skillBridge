import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Messages({ user }) {
  const [messages, setMessages] = useState([]);
  const [toUser, setToUser] = useState("");
  const [text, setText] = useState("");
  const [messageInfo, setMessageInfo] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      setMessageInfo("❌ Failed to fetch messages");
    }
  };

  const sendMessage = async () => {
    if (!user) {
      setMessageInfo("❌ You must be logged in to send messages");
      return;
    }
    if (!toUser || !text) {
      setMessageInfo("❌ Recipient and message cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/messages/send", {
        fromUser: user.name,
        toUser,
        message: text,
      });
      setMessageInfo("✅ Message sent!");
      setText("");
      setToUser("");
      fetchMessages();
    } catch (err) {
      console.error(err);
      setMessageInfo("❌ Failed to send message");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>
      {messageInfo && <p>{messageInfo}</p>}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="To"
          value={toUser}
          onChange={(e) => setToUser(e.target.value)}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <input
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "5px", marginRight: "5px", width: "300px" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m._id}>
              <td>{m.fromUser}</td>
              <td>{m.toUser}</td>
              <td>{m.message}</td>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
