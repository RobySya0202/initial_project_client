import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null, // e.g., 'success', 'error', 'warning'
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    // Action to show the alert
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
    },
    // Action to hide the alert
    hideAlert: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;