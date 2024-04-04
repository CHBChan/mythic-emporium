import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

export interface userData {
  session: Session | null,
  user: User | null,
}

export interface userType {
  userData: userData | null
}

const initialState: userType = {
  userData: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userData>) => {
        console.log(action.payload);
        state.userData = action.payload;
    },
    signOutUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, signOutUser } = userDataSlice.actions;
export default userDataSlice.reducer;