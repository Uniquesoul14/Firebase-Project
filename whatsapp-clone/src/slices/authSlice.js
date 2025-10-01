import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setDoc, doc, updateProfile } from "../firebase";

export const signupUser = createAsyncThunk("auth/signup", async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    photoURL: null
  });
  return { uid: userCredential.user.uid, name, email, photoURL: null };
});

export const signinUser = createAsyncThunk("auth/signin", async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return {
    uid: userCredential.user.uid,
    name: userCredential.user.displayName,
    email: userCredential.user.email,
    photoURL: null
  };
});

export const signoutUser = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: { setUser: (state, action) => { state.user = action.payload; } },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(signinUser.pending, state => { state.loading = true; state.error = null; })
      .addCase(signinUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signinUser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(signoutUser.fulfilled, state => { state.user = null; });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
