import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAuthData } from "../../utils/fetchData";

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  errorMessage: string | null;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const authData = await fetchAuthData();
      if (email === authData.email && password === authData.password) {
        return authData;
      } else {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      // Kiểm tra xem error có phải là Error không và lấy message
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        // Xử lý trường hợp khác (nếu có)
        return thunkAPI.rejectWithValue('Có lỗi xảy ra');
      }
    }
  }
);

const initialState: AuthState = {
  email: '',
  password: '',
  isAuthenticated: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = '';
      state.password = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.errorMessage = null;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isAuthenticated = false;
      state.errorMessage = action.payload || 'Có lỗi xảy ra';
    });
  },
});

export const authReducer = authSlice.reducer;
