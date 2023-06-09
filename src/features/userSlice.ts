import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  isSignedIn: boolean;
}

const initialState: userState = {
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //signIn:()=>{},
    //signOut:()=>{}
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
