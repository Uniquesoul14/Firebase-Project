import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, getDocs } from "../firebase";

export const fetchUsers = createAsyncThunk("users/fetch", async (currentUid) => {
  const snapshot = await getDocs(collection(db, "users"));
  const users = snapshot.docs
    .map(doc => doc.data())
    .filter(u => u.uid !== currentUid);
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, state => { state.loading = false; });
  }
});

export default usersSlice.reducer;
