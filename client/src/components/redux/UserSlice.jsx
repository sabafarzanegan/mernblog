import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignUpstart: (state) => {
      state.error = null;
      state.loading = true;
    },
    SignUpSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    SignUpfailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    LoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    LoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    LoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LoginStart,
  LoginSuccess,
  LoginFailed,
  SignUpstart,
  SignUpSuccess,
  SignUpfailed,
} = UserSlice.actions;
export default UserSlice.reducer;
