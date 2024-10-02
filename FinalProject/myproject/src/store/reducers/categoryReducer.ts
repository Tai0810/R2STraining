import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../constants/constants";

export const fetchCategory = createAsyncThunk("categories", async () => {
  const response = await fetchJson(BASE_URL + "/categories");
  return response;
});

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  entities: Record<number, Category>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      const categories: Category[] = action.payload;
      state.ids = categories.map((category) => category.id);
      categories.forEach((category) => {
        state.entities[category.id] = category;
      });
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const categoryReducer = CategorySlice.reducer;