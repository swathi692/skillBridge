import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("sb_token");

export const updateProfile = async (data) => {
  const token = getToken();
  if (!token) throw new Error("No token");

  return axios.put(`${BASE_URL}/users/me`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
