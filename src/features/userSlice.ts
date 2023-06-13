import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  isSignedIn: boolean;
  nickname: string | null;
}

const initialState: userState = {
  isSignedIn: false,
  nickname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state) {
      state.isSignedIn = true;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.nickname = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
