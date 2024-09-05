import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    idLoggedIn: false,
  },
  reducers: {},
});

export const authReducer = authSlice.reducer;
