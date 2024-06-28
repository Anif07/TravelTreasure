import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmPassword,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
} from "../../redux/slices/LoginSlice";
import "../../styles/signup.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const { signup } = useSelector((state) => state.LogIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup.password === signup.confirmPassword) {
      localStorage.setItem("formData", JSON.stringify(signup));
      toast.success("successfully signup");
      dispatch(setFirstName(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setConfirmPassword(""));
    } else {
      toast.warning(
        "Password and confirm password do not match. Please try again."
      );
    }
  };

  return (
    <div className="signupContainer">
      <form onSubmit={handleSubmit} className="signupForm">
        <h2>Sign up</h2>
        <div className="signup-input-cont">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Name"
            value={signup.firstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            required
          />
        </div>
        <div className="signup-input-cont">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email id"
            value={signup.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
        </div>
        <div className="signup-input-cont">
          <input
            type="password"
            id="passeord"
            name="password"
            placeholder="Password"
            value={signup.password}
            minLength={6}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
          />
        </div>
        <div className="signup-input-cont">
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signup.confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            required
          />
        </div>
        <p>
          Already have an Account? <Link to="/Login">Login</Link>
        </p>
        <button type="submit" className="signupSumbitBtn">
          Sumbit
        </button>
      </form>
    </div>
  );
}

export default Signup;
