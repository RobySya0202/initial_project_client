import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TLeave } from "./types";
import { fetchLeaveApi } from "../../api/leave/fetchLeave";
import reducer from "../auth/authSlice";

const initialState: {
  isLoading: boolean;
  data?: TLeave[];
} = {
  isLoading: false,
  data: [],
};

export const fetchLeaves = createAsyncThunk(
  "leaves/fetchLeaves",
  async (arg: { token: string }, { rejectWithValue }) => {
    try {
      const response = await fetchLeaveApi(arg.token);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const leaveSlice = createSlice({
  name: "leaveSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data.data;
      })
      .addCase(fetchLeaves.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export type authSliceType = typeof leaveSlice;
export default leaveSlice.reducer;
