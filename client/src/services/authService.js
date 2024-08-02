import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userName, email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
