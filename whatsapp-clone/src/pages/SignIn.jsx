import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(signinUser({ email, password })).unwrap();
      navigate("/home");
    } catch(err) {
      alert(err.message); // Properly display Firebase error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <p className="text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
