import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import leaveReducer from "./leave/leaveSlice";
import alertReducer from "./alert/alertSlice";
import userReducer from "./users/userSlice";

export const createStore = () => {
  return configureStore({
    reducer: {
      authReducer,
      leaveReducer,
      alertReducer,
      userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
