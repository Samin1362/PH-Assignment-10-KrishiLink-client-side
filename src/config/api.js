// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://krishilink-server-side.vercel.app";

export const API_ENDPOINTS = {
  // Crops
  CROPS: `${API_BASE_URL}/api/crops`,
  CROP_BY_ID: (id) => `${API_BASE_URL}/api/crops/${id}`,
  LATEST_CROPS: `${API_BASE_URL}/api/crops/latest`,

  // Interests
  INTERESTS: `${API_BASE_URL}/api/interests`,
  INTERESTS_SENT: (email) =>
    `${API_BASE_URL}/api/interests/sent?email=${email}`,
  INTERESTS_RECEIVED: (email) =>
    `${API_BASE_URL}/api/interests/received?email=${email}`,
  INTERESTS_STATUS: `${API_BASE_URL}/api/interests/status`,

  // Users
  USERS: `${API_BASE_URL}/api/users`,
  USER_BY_EMAIL: (email) => `${API_BASE_URL}/api/users/${email}`,
};

export default API_BASE_URL;
