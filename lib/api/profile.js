import { api } from "@/lib/api";

export const profileApi = {
  // file: the cropped File from ImageUploadCropper's onCropped callback
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file); // key must match whatever your backend expects

    // Do NOT set Content-Type manually here — axios detects the FormData
    // instance and sets multipart/form-data with the correct boundary itself.
    return api.post("/profile/avatar", formData).then((res) => res.data);
  },


  // Mixed payload example: text fields + a file in one request
  updateProfile: ({ name, bio, avatarFile }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    return api.put("/profile", formData).then((res) => res.data);
  },
};