import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { currentChatUser: null },
  reducers: {
    setCurrentChatUser: (state, action) => { state.currentChatUser = action.payload; }
  }
});

export const { setCurrentChatUser } = chatSlice.actions;
export default chatSlice.reducer;
