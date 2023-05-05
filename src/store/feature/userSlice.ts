import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUsername: (state, action) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = null;
    },
  },
});

export const { setLoginUsername, clearUsername } = userSlice.actions;

export default userSlice.reducer;
