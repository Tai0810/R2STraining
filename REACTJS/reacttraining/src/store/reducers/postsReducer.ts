import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { PostsState, PostModel, PostsDataObject } from "./../../types/post";
import { Action } from "redux";
import { fetchData } from "../../utils/fetchData";
import { DELETE_POST, EDIT_POST } from "./../actions";

export const fetchListPosts = createAsyncThunk(
  "posts/fetchListPosts",
  async () => {
    try {
      const postsResponse = await fetchData("posts");
      return {
        posts: postsResponse,
        error: null,
      };
    } catch (error) {
      return { error };
    }
  }
);

type ActionType = Action<string> & {
  postId: PostModel["id"];
  changingInput: {
    body: string;
    name: string;
  };
};

const initialState: PostsState = {
  ids: [],
  data: {},
  loading: "idle", // 'idle | 'loading' | 'succeed' | 'failed'
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListPosts.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchListPosts.fulfilled, (state, action) => {
        const posts = action.payload?.posts || [];
        if (!posts.length) return;
        const postObj: PostsDataObject = {};
        const ids = posts.reduce(
          (allIds: Array<PostModel["id"]>, post: PostModel) => {
            if (!state.data[post.id]) {
              allIds.push(post.id);
            }
            postObj[post.id] = post;
            return allIds;
          },
          []
        );
        state.data = { ...state.data, ...postObj };
        state.ids = [...state.ids, ...ids];
        state.error = action.payload?.error as string;
        state.loading = "succeed";
      })
      .addCase(fetchListPosts.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase<string, ActionType>(EDIT_POST, (state, action) => {
        state.data[action.postId] = {
          ...state.data[action.postId],
          body: action.changingInput.body,
        };
      })
      .addCase<string, Action<string> & { postId: number }>(
        DELETE_POST,
        (state, action) => {
          state.ids = state.ids.filter((id) => id !== action.postId);
        }
      );
  },
});

export const postsReducer = postsSlice.reducer;
