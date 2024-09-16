import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fetchData";
import { PostModel, PostsDataObject, PostsState } from "../../types/post";
import { DELETE_POST, EDIT_POST } from "../actions";

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
      });
    builder
      .addCase(fetchListPosts.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase<string, ActionType>(EDIT_POST, (state, action) => {
        const post = state.data[action.postId];
        if (post) {
          state.data[action.postId] = {
            ...post,
            body: action.changingInput.body,
            name: action.changingInput.name,
          };
        } else {
          console.error(`Post with id ${action.postId} not found.`);
        }
      })
      .addCase<string, ActionType>(
        DELETE_POST,
        (state, action) => {
          const { postId } = action;
          if (state.data[postId]) {
            delete state.data[postId];
            state.ids = state.ids.filter(id => id !== postId);
          } else {
            console.error(`Post with id ${postId} not found.`);
          }
        }
      );
  },
});

export const postsReducer = postsSlice.reducer;
