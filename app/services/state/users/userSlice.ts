import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reducer from "../auth/authSlice";
import { TUser } from "./types";
import { TPagination } from "../globalType";
import { fetchUsersListApi } from "../../api/users/list";

const initialState: {
  isLoading: boolean;
  data: TUser[];
  pagination: TPagination;
} = {
  isLoading: false,
  data: [],
  pagination: {
    total: 0,
    fetched: 0,
    current_page: 0,
  },
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (arg: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const { page, limit } = arg;
      const response = await fetchUsersListApi(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.pagination = action.payload?.pagination;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export type userSliceType = typeof userSlice;
export default userSlice.reducer;
