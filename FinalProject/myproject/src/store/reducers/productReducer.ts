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
    const newId = (newProduct.id || Date.now()).toString();
    const response = await updateJson(
      BASE_URL + "/products",
      { ...newProduct, id: newId },
      "POST"
    );
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    try {
      const response = await updateJson(
        `${BASE_URL}/products/${product.id}`,
        product,
        "PUT"
      );
      return response;
    } catch (error) {
      throw error;
    }
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
  id: string;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

interface ProductState {
  entities: Record<string, Product>;
  ids: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  notification: string | null; 
}

const initialState: ProductState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
  notification: null, 
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = null;  
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const products: Product[] = action.payload;
        state.ids = products.map((product) => product.id.toString());
        products.forEach((product) => {
          state.entities[product.id.toString()] = product;
        });
        state.notification = "Products fetched successfully!";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to fetch products";
        state.notification = state.error;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const addedProduct: Product = action.payload;
        const newId = addedProduct.id.toString();
        state.entities[newId] = addedProduct;
        state.ids.push(newId);
        state.notification = "Product added successfully!";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to add product";
        state.notification = state.error;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct: Product = action.payload;
        state.entities[updatedProduct.id.toString()] = updatedProduct;
        state.notification = "Product updated successfully!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to update product";
        state.notification = state.error;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.toString();
        delete state.entities[productId];
        state.ids = state.ids.filter((id) => id !== productId);
        state.notification = "Product deleted successfully!";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error.message || "Failed to delete product";
        state.notification = state.error;
      });
  },
});

export const { clearNotification } = productSlice.actions; 
export const productReducer = productSlice.reducer;
