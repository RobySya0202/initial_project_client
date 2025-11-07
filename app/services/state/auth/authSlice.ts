import { LoginApi } from "../../api/auth/login";
import { RegisterApi } from "../../api/auth/register";
import { user } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: user | null;
  token: string | null;
} = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
};

export const Register = createAsyncThunk(
  "register",
  async (
    userData: {
      email?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
      birth_date?: string;
      gender?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await RegisterApi(userData);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Login = createAsyncThunk(
  "login",
  async (
    userData: {
      email?: string;
      password?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await LoginApi(userData);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = {
          ...action.payload.data.user,
          role: action.payload.data.user.role.name,
          id: Number(action.payload.data.user.id),
        };
        state.token = action.payload.data.token.split("|")[1];
        localStorage.setItem("token", state.token || "");
      })
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Register.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = {
          ...action.payload.data.user,
          role: action.payload.data.user.role.name,
          id: Number(action.payload.data.user.id),
        };
        state.token = action.payload.data.token.split("|")[1];
        localStorage.setItem("token", state.token || "");
      })
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Login.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export type authSliceType = typeof authSlice;
export default authSlice.reducer;
