import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";
import { BASE_URL } from "../../constants/constants";

// Fetch colors
export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await fetchJson(BASE_URL + "/colors");
  return response;
});

// Add a new color
export const addColor = createAsyncThunk(
  "colors/addColor",
  async (newColor: { id: string; name: string }) => {
    const response = await updateJson(BASE_URL + "/colors", newColor, "POST");
    return response; 
  }
);

// Delete a color
export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (colorId: string) => {
    await deleteJson(`${BASE_URL}/colors`, colorId); 
    return colorId;
  }
);

interface Color {
  id: string; 
  name: string;
}

interface ColorState {
  entities: Record<string, Color>;
  ids: string[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  notification: string | null;
}

const initialState: ColorState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
  notification: null,
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        const colors: Color[] = action.payload;
        state.ids = colors.map((color) => color.id);
        colors.forEach((color) => {
          state.entities[color.id] = color;
        });
        state.notification = "Colors fetched successfully!";
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch colors";
        state.notification = state.error;
      })
      // Add color
      .addCase(addColor.fulfilled, (state, action) => {
        const addedColor: Color = action.payload;
        state.entities[addedColor.id] = addedColor;
        state.ids.push(addedColor.id);
        state.notification = "Color added successfully!";
      })
      .addCase(addColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to add color";
        state.notification = state.error;
      })
      // Delete color
      .addCase(deleteColor.fulfilled, (state, action) => {
        const colorId = action.payload;
        delete state.entities[colorId];
        state.ids = state.ids.filter((id) => id !== colorId);
        state.notification = "Color deleted successfully!";
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to delete color";
        state.notification = state.error;
      });
  },
});

export const { clearNotification } = colorSlice.actions; 
export const colorReducer = colorSlice.reducer;
