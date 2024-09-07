import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fetchData";
import { PostModel, PostsState } from "../../types/post";

export const fetchListPosts = createAsyncThunk(
  "posts/fetchListPosts",
  async () => {
    try {
      const postsResponse = await fetchData("posts");
      const usersResponse = await fetchData("users");

      const postsWithUsers = postsResponse.map((post: PostModel) => {
        const user = usersResponse.find((u: { id: number }) => u.id === post.userId);
        return { ...post, name: user?.name }; 
      });

      return postsWithUsers;
    } catch (error) {
      return error;
    }
  }
);


const initialState: PostsState = {
  list: [],
  loading: "idle",
  error: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchListPosts.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fetchListPosts.fulfilled, (state, action) => {
      state.list = action.payload || [];
      state.loading = "success";
    });
    builder.addCase(fetchListPosts.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export const postsReducer = postSlice.reducer;
