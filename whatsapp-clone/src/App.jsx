import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./slices/authSlice";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(setUser({
          uid: authUser.uid,
          name: authUser.displayName || "User",
          email: authUser.email,
          photoURL: null
        }));
      } else dispatch(setUser(null));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/chat/:userId" element={user ? <Chat /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to={user ? "/home" : "/signin"} />} />
      </Routes>
    </Router>
  );
}
