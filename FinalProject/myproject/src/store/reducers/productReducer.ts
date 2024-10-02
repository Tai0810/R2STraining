import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { BASE_URL } from "../../constants/constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchJson(BASE_URL + "/products");
    return response;
  }
);

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  category: string;
  colors: string;
  price: number;
}

interface ProductState {
  entities: Record<number, Product>;
  ids: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("state", state);
        state.status = "succeeded";
        const products: Product[] = action.payload;
        state.ids = products.map((product) => product.id);
        products.forEach((product) => {
          state.entities[product.id] = product;
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch products";
      })
  },
});

export const productReducer = productSlice.reducer;
