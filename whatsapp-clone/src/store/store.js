import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import usersReducer from "../slices/usersSlice";
import chatReducer from "../slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    chat: chatReducer,
  },
});
