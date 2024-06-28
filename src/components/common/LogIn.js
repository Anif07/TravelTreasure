import React, { useEffect, useState } from "react";
import {
  setAuth,
  setGuest,
  setLoginPassword,
  setUserName,
} from "../../redux/slices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storedData, setStoredData] = useState();
  const { login } = useSelector((state) => state.LogIn);
  const [privatePass, setPrivate] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (
      login.userName === storedData.firstName &&
      login.password === storedData.password
    ) {
      dispatch(setAuth());
      toast.success("Logged in successfully");
      const location = localStorage.getItem("location");
      if (location) {
        const parsedLocation = JSON.parse(location);
        if (parsedLocation.belong) {
          navigate(parsedLocation.location, {
            state: { id: parsedLocation.id, belong: parsedLocation.belong },
          });
        } else {
          navigate(parsedLocation.location, {
            state: { id: parsedLocation.id },
          });
        }
      } else {
        navigate("/home");
      }
    }
  };

  const handleGuestMode = () => {
    dispatch(setGuest());
    toast.success("Using Guest mode");
    const location = localStorage.getItem("location");
    if (location) {
      const parsedLocation = JSON.parse(location);
      if (parsedLocation.belong) {
        navigate(parsedLocation.location, {
          state: { id: parsedLocation.id, belong: parsedLocation.belong },
        });
      } else {
        navigate(parsedLocation.location, { state: { id: parsedLocation.id } });
      }
    } else {
      navigate("/home");
    }
  };

  const retrive = () => {
    const data = localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData"))
      : null;
    setStoredData(data);
  };
  useEffect(() => {
    retrive();
  }, []);
  const passwordEye = () => {
    const pass = document.getElementById("passwordlogin");
    if (pass.type === "password") {
      pass.setAttribute("type", "text");
      setPrivate(true);
    } else {
      pass.setAttribute("type", "password");
      setPrivate(false);
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={HandleSubmit} className="loginForm">
        <h2>Login</h2>
        <div className="login-Input-container">
          <input
            type="text"
            id="useName"
            onChange={(e) => dispatch(setUserName(e.target.value))}
            placeholder="userName"
            required
          />
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="login-Input-container">
          <input
            type="password"
            id="passwordlogin"
            placeholder="Password"
            minLength={6}
            required
            onChange={(e) => dispatch(setLoginPassword(e.target.value))}
          />
          {privatePass ? (
            <i className="fa-solid fa-eye eyeSymbol" onClick={passwordEye}></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash eyeSymbol"
              onClick={passwordEye}
            ></i>
          )}
        </div>
        <button type="submit" className="loginBtn">
          Login
        </button>
        <p>
          Don't have an Account?
          <Link to="/Signup" className="registernow">
            Register now
          </Link>
        </p>
        <button onClick={handleGuestMode} className="guestMode">
          Guest mode
        </button>
      </form>
    </div>
  );
}

export default LogIn;
