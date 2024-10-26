// src/store/loginSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

interface LoginState {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: Record<string, any> | null; // Change this type as per your user info structure
}

const initialState: LoginState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
       state.isLoggedIn = true;
      state.token = action.payload;

      // Decode the token to get user info
      const decodedToken: any = jwtDecode(action.payload);
      state.userInfo = decodedToken; // Save user info to state
      localStorage.setItem('token', action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null; // Clear the token
      state.userInfo = null; // Clear user info
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('firstName');

    },
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
        state.token = token;

        // Decode the token to get user info
        const decodedToken: any = jwtDecode(token);
        state.userInfo = decodedToken; // Save user info to state
      }
    },
  },
});

export const { login, logout, checkAuth } = loginSlice.actions;
export default loginSlice.reducer;
