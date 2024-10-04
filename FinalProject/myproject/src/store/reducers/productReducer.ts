import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteJson, fetchJson, updateJson } from "../api";
import { BASE_URL } from "../../constants/constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchJson(BASE_URL + "/products");
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Product) => {
    const response = await updateJson(BASE_URL + "/products", newProduct, "POST");
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const response = await updateJson(
      `${BASE_URL}/products/${product.id}`,
      product,
      "PUT"
    );
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    await deleteJson(BASE_URL + "/products", productId.toString());
    return productId;
  }
);

interface Product {
  id: number;
  name: string;
  available: number;
  sold: number;
  category: number;
  colors: number[];
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
      .addCase(addProduct.fulfilled, (state, action) => {
        const addedProduct: Product = action.payload;
        state.entities[addedProduct.id] = addedProduct;
        state.ids.push(addedProduct.id);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct: Product = action.payload;
        state.entities[updatedProduct.id] = updatedProduct;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        delete state.entities[productId];
        state.ids = state.ids.filter((id) => id !== productId); 
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to update product";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to delete product";
      });
  },
});

export const productReducer = productSlice.reducer;
