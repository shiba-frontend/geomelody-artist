

import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  artistType: "solo",
  user: null,
  theme: "dark",

 
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  setArtistType: (artistType) => set({ artistType }),
  logArtistType: () => console.log(get().artistType),
}));


