import { createSlice } from "@reduxjs/toolkit";
import Signup from "../../components/common/Signup";
import { act } from "react";

const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState: {
    isAuth: false,
    isGuest: false,
    login: {
      userName: "",
      password: "",
    },
    signup: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  },
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
      state.isGuest = false;
    },
    setGuest: (state) => {
      state.isAuth = true;
      state.isGuest = true;
    },
    setUserName: (state, action) => {
      state.login.userName = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.login.password = action.payload;
    },
    setFirstName: (state, action) => {
      state.signup.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.signup.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.signup.email = action.payload;
    },
    setPassword: (state, action) => {
      state.signup.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.signup.confirmPassword = action.payload;
    },
  },
});

export const {
  setAuth,
  setUserName,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setLoginPassword,
  setGuest,
  setConfirmPassword,
} = LoginSlice.actions;

export default LoginSlice.reducer;
