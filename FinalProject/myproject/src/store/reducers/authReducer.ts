import { createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../actions";

const initialState = {
  isLoggedIn: false,
  loading: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LOGIN, (state, action) => {
      state.isLoggedIn = true;
    });
  },
});

export const authReducer = authSlice.reducer;
