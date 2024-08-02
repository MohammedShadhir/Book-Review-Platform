import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchUserReviews = async () => {
  const token = getToken();
  console.log(token);
  try {
    const response = await axios.get(`${apiUrl}/api/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  const token = getToken();
  try {
    await axios.delete(`${apiUrl}/api/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const addReview = async (reviewData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${apiUrl}/api/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const fetchReviewById = async (id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiUrl}/api/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

export const updateReview = async (id, data) => {
  const token = getToken();
  try {
    const response = await axios.put(`${apiUrl}/api/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
// Add more functions for other review-related operations if needed
