import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const updateUserProfile = async (formData, token) => {
  try {
    const response = await axios.put(`${apiUrl}/api/users/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
