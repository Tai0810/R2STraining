import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from "../actions";
import { fetchJson } from "../api";
import { BASE_URL } from "../../constants/constants";

export const login = createAsyncThunk(
  "login",
  async (userInfor: { email: string; password: string }) => {
    const authInfor = await fetchJson(BASE_URL + "/auth");
    console.log("authInfor", authInfor);
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
    builder.addCase(LOGOUT, (state, action) => {
      state.isLoggedIn = false;
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
        state.error = "Email or password is not correct";
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = authSlice.reducer;
