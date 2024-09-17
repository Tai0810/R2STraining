import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fetchData";
import { UserData, UserModel, UsersState } from "../../types/user";
import { EDIT_POST } from "../actions";

export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async () => {
    try {
      const usersResponse = await fetchData("users");

      return { users: usersResponse, error: null };
    } catch (error) {
      return { error };
    }
  }
);

const initialState: UsersState = {
  ids: [],
  data: {},
  loading: "idle",
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      const users = action.payload?.users || [];
      const userObj: UserData = {};
      state.ids = users.map((user: UserModel) => {
        userObj[user.id] = user;
        return user.id;
      });
      state.data = userObj;
      state.error = action.payload?.error as string;
      state.loading = "succeed";
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = "failed";
    });
    builder.addCase(
      EDIT_POST,
      (
        state,
        action: any // TOFIX: double check addCase typescript
      ) => {
        state.data[action.userId] = {
          ...state.data[action.userId],
          name: action.changingInput.author,
        };
      }
    );
  },
});

export const usersReducer = usersSlice.reducer;
