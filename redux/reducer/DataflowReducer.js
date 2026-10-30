"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  lang: "",
  isLoginOpen: false,
  redirectAfter: null,
  token: "",
};

export const DataflowReducer = createSlice({
  name: "DataflowReducer",
  initialState,
  reducers: {
    updateLanguage(state, action) {
      state.lang = action?.payload;
    },

    updateToken(state, action) {
      state.token = action.payload;
    },
     openLogin: (state, action) => {
      state.isLoginOpen = true;
      state.redirectAfter = action.payload ?? null;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
      state.redirectAfter = null;
    },
  },
});

export const {
  updateLanguage,
  updateToken,
  openLogin,
  closeLogin,
} = DataflowReducer.actions;

export default DataflowReducer.reducer;
