import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Token helpers
export const getToken = () => localStorage.getItem("sb_token");

export const setToken = (token) => {
  localStorage.setItem("sb_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("sb_token");
};

// Config helper
const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

// User APIs
export const fetchProfile = () => axios.get(`${BASE_URL}/users/me`, authHeader());
export const updateProfile = (data) =>
  axios.put(`${BASE_URL}/users/me`, data, authHeader());
export const fetchUsers = () => axios.get(`${BASE_URL}/users`, authHeader());

// Exchanges
export const fetchExchanges = () => axios.get(`${BASE_URL}/exchanges`, authHeader());

// Messages
export const fetchMessages = () => axios.get(`${BASE_URL}/messages`, authHeader());
export const createMessage = (data) => axios.post(`${BASE_URL}/messages`, data, authHeader());

// Ratings
export const fetchRatings = () => axios.get(`${BASE_URL}/ratings`, authHeader());
export const createRating = (data) => axios.post(`${BASE_URL}/ratings`, data, authHeader());
