import { configureStore } from "@reduxjs/toolkit";
import Users from "./UserSlice";

export const Store = configureStore({
  reducer: {
    user: Users,
  },
});
