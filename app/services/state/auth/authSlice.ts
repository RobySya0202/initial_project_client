
import { user } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState:{
    isAuthenticated: boolean;
    user:user | null;
    token:string | null;
} = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {}
})