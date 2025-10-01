import React from "react";
import { useDispatch } from "react-redux";
import { signoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(signoutUser());
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container">
        <span className="navbar-brand mb-0 h1">Chat App</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
