import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../constants/constants";

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  const response = await fetchJson(BASE_URL + "/colors");
  return response;
});

interface Color {
  id: number;
  name: string;
}

interface ColorState {
  entities: Record<number, Color>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ColorState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("stateColor", state);
        
        const colors: Color[] = action.payload;
        state.ids = colors.map((color) => color.id);
        colors.forEach((color) => {
          state.entities[color.id] = color;
        });
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch colors";
      });
  },
});

export const colorReducer = colorSlice.reducer;