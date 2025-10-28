import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AllUsers from "./pages/AllUsers";
import ExchangeRequests from "./pages/ExchangeRequests";
import Messages from "./pages/Messages";
import Ratings from "./pages/Ratings";
import { setToken, getToken, removeToken, fetchProfile } from "./api";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  // Load user profile on app start
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile()
        .then((res) => setUser(res.data))
        .catch(() => removeToken());
    }
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
    nav("/login");
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div
        className="nav container"
        style={{
          display: "flex",
          padding: "10px",
          background: "#333",
          color: "#fff",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            SkillBridge
          </Link>
        </div>

        {user ? (
          <>
            <div style={{ marginRight: "10px" }}>Hi, {user.name}</div>
            <Link to="/profile" style={{ color: "#fff", marginRight: "10px" }}>
              Profile
            </Link>
            <Link to="/users" style={{ color: "#fff", marginRight: "10px" }}>
              All Users
            </Link>
            <Link to="/exchanges" style={{ color: "#fff", marginRight: "10px" }}>
              Exchanges
            </Link>
            
            <Link to="/messages" style={{ color: "#fff", marginRight: "10px" }}>
              Messages
            </Link>
            <Link to="/ratings" style={{ color: "#fff", marginRight: "10px" }}>
              Ratings
            </Link>

            <button
              onClick={logout}
              style={{
                cursor: "pointer",
                background: "#ff4444",
                border: "none",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff" }}>
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(u, t) => {
                  setUser(u);
                  setToken(t);
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                onSignup={(u, t) => {
                  setUser(u);
                  setToken(t);
                }}
              />
            }
          />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/users" element={<AllUsers user={user} />} />
          <Route path="/exchanges" element={<ExchangeRequests user={user} />} />
          <Route path="/messages" element={<Messages user={user} />} />
          <Route path="/ratings" element={<Ratings user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
