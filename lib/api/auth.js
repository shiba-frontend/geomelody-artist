import { api } from "@/lib/api";

export const authApi = {
  signup: (payload) => api.post("/auth/signup", payload).then((res) => res.data),

  verifyOtp: (code, type) =>
    api.post("/auth/verify-otp", { code, type }).then((res) => res.data),

  resendOtp: (identifier, type) =>
    api.post("/auth/resend-otp", { identifier, type }).then((res) => res.data),

  login: (payload) => api.post("/auth/login", payload).then((res) => res.data),
};