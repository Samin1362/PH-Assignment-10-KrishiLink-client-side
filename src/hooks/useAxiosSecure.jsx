import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://krishilink-server-side.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor - add auth token to headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Add user email to headers if user is logged in
        if (user?.email) {
          config.headers["user-email"] = user.email;
        }

        // Add authorization token (you can add Firebase token here if needed)
        config.headers["Authorization"] = "Bearer dev-token";

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;

        // Handle 401 Unauthorized - redirect to login
        if (status === 401) {
          await logout();
          navigate("/login");
        }

        // Handle 403 Forbidden
        if (status === 403) {
          console.error("Access forbidden");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
