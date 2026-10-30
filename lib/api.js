import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  // No default Content-Type here on purpose. Axios sets the right one
  // per-request automatically:
  //   - plain object body   -> application/json
  //   - FormData body       -> multipart/form-data; boundary=... (auto-generated)
  // Hardcoding "application/json" here would break every file upload,
  // since the browser needs to set its own multipart boundary.
});

// Attach auth token automatically to every request, if you have one stored
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling — e.g. auto-logout on 401, instead of
// repeating `if (!res.ok) throw ...` at every single call site
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // e.g. clear session, redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);