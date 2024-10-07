import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";
import { BASE_URL } from "../../constants/constants";

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetchJson(BASE_URL + "/categories");
    return response;
  }
);

// Add a new category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory: Category) => {
    const response = await updateJson(BASE_URL + "/categories", newCategory, "POST");
    return response;
  }
);

// Update an existing category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    const response = await updateJson(`${BASE_URL}/categories/${category.id}`, category, "PUT");
    return response;
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await deleteJson(BASE_URL + "/categories", categoryId);
    return categoryId;
  }
);

interface Category {
  id: string; 
  name: string;
}

interface CategoryState {
  entities: Record<string, Category>; 
  ids: string[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const categories: Category[] = action.payload;
        state.ids = categories.map((category) => category.id);
        categories.forEach((category) => {
          state.entities[category.id] = category;
        });
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch categories";
      })
      // Add category
      .addCase(addCategory.fulfilled, (state, action) => {
        const addedCategory: Category = action.payload;
        state.entities[addedCategory.id] = addedCategory;
        state.ids.push(addedCategory.id);
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory: Category = action.payload;
        state.entities[updatedCategory.id] = updatedCategory;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to update category";
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const categoryId = action.payload;
        delete state.entities[categoryId];
        state.ids = state.ids.filter((id) => id !== categoryId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to delete category";
      });
  },
});

export const categoryReducer = categorySlice.reducer;
