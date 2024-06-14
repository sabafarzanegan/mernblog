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
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletuserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletuserSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deletuserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
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
  updateStart,
  updateSuccess,
  updateFailed,
  deletuserStart,
  deletuserSuccess,
  deletuserFailed,
  signoutSuccess,
} = UserSlice.actions;
export default UserSlice.reducer;
