// services/state/alert/alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string | null;
  type: "success" | "error" | "info" | null;
}

const initialState: AlertState = { message: null, type: null };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
