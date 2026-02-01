import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple REST client without auth (for public requests)
export function restClient() {
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// REST client with access token + refresh token handling
export function restClientData() {
  const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "",
    },
  });

  // Interceptor to handle expired access token
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError & { config?: any }) => {
      const originalRequest = error.config;

      // Check 401 & not retried yet
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // No refresh token → logout
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
          return Promise.reject(error);
        }

        try {
          // Call refresh token endpoint
          const res = await axios.post(
            "http://localhost:8080/auth/refresh",
            { refreshToken }
          );

          const newAccessToken = res.data.accessToken;

          // Save new access token
          localStorage.setItem("accessToken", newAccessToken);

          // Update Authorization header and retry original request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (err) {
          // Refresh token invalid → logout
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}
