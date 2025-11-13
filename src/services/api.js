import { API_ENDPOINTS } from "../config/api";

// Helper function to make API requests
const apiRequest = async (url, options = {}) => {
  try {
    const { headers = {}, ...restOptions } = options;

    const response = await fetch(url, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dev-token", // Development mode token
        ...headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Crops API
export const cropsAPI = {
  // Get all crops with optional search
  getAll: async (searchTerm = "") => {
    const url = searchTerm
      ? `${API_ENDPOINTS.CROPS}?search=${encodeURIComponent(searchTerm)}`
      : API_ENDPOINTS.CROPS;
    return apiRequest(url);
  },

  // Get latest 6 crops
  getLatest: async () => {
    return apiRequest(API_ENDPOINTS.LATEST_CROPS);
  },

  // Get single crop by ID
  getById: async (id) => {
    return apiRequest(API_ENDPOINTS.CROP_BY_ID(id));
  },

  // Create new crop
  create: async (cropData, userEmail) => {
    return apiRequest(API_ENDPOINTS.CROPS, {
      method: "POST",
      headers: {
        "user-email": userEmail,
      },
      body: JSON.stringify(cropData),
    });
  },

  // Update crop
  update: async (id, cropData, userEmail) => {
    return apiRequest(API_ENDPOINTS.CROP_BY_ID(id), {
      method: "PUT",
      headers: {
        "user-email": userEmail,
      },
      body: JSON.stringify(cropData),
    });
  },

  // Delete crop
  delete: async (id, userEmail) => {
    return apiRequest(API_ENDPOINTS.CROP_BY_ID(id), {
      method: "DELETE",
      headers: {
        "user-email": userEmail,
      },
    });
  },
};

// Interests API
export const interestsAPI = {
  // Add interest to a crop
  add: async (interestData) => {
    return apiRequest(API_ENDPOINTS.INTERESTS, {
      method: "POST",
      body: JSON.stringify(interestData),
    });
  },

  // Get interests sent by user
  getSent: async (email) => {
    return apiRequest(API_ENDPOINTS.INTERESTS_SENT(email));
  },

  // Get interests received by user
  getReceived: async (email) => {
    return apiRequest(API_ENDPOINTS.INTERESTS_RECEIVED(email));
  },

  // Update interest status
  updateStatus: async (statusData) => {
    return apiRequest(API_ENDPOINTS.INTERESTS_STATUS, {
      method: "PUT",
      body: JSON.stringify(statusData),
    });
  },
};

// Users API
export const usersAPI = {
  // Create user
  create: async (userData) => {
    return apiRequest(API_ENDPOINTS.USERS, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Get user by email
  getByEmail: async (email) => {
    return apiRequest(API_ENDPOINTS.USER_BY_EMAIL(email));
  },

  // Update user profile
  update: async (email, userData) => {
    return apiRequest(API_ENDPOINTS.USER_BY_EMAIL(email), {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Get all users
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.USERS);
  },
};
