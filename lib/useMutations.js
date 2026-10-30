"use client";
// Example usage inside your Signup component — replaces manual fetch calls

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { profileApi } from "@/lib/api/profile";

export function useSignupMutation() {
  return useMutation({
    mutationFn: authApi.signup,
    // no need to manage loading/error state yourself — the hook gives you
    // isPending, isError, error, isSuccess automatically
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationFn: ({ code, type }) => authApi.verifyOtp(code, type),
  });
}



export function useUploadAvatarMutation() {
  return useMutation({
    mutationFn: profileApi.uploadAvatar,
  });
}