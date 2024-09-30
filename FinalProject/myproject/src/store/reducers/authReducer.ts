import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../actions";
import { fetchJson } from "../api";

const BASE_URL = "http://localhost:3000";

export const login = createAsyncThunk(
  "login",
  async (userInfor: { email: string; password: string }) => {
    const authInfor = await fetchJson(BASE_URL + "/auth");
    console.log("authInfor",authInfor);
    return authInfor;
  }
);

const initialState = {
  isLoggedIn: false,
  loading: "idle",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LOGIN, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      console.log("state", state);
      console.log("action", action);
      const formUserInfor = action.meta.arg;
      const authInfor = action.payload;
      if (
        formUserInfor.email === authInfor.email &&
        formUserInfor.password === authInfor.password
      ) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = "Email or password is not correct";
    });
  },
});

export const authReducer = authSlice.reducer;
