import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username:
    typeof window !== "undefined" ? localStorage.getItem("username") : null,
  isLoggedIn:
    typeof window !== "undefined" ? !!localStorage.getItem("username") : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
