import { createSlice } from "@reduxjs/toolkit";
import db from "../../db.json";

const heroSecSlice = createSlice({
  name: "heroSecSlice",
  initialState: {
    slide: 0,
    autoSlide: true,
  },
  reducers: {
    nextSlide: (state) => {
      state.slide = state.slide === db.images.length - 1 ? 0 : state.slide + 1;
    },
    prevSlide: (state) => {
      state.slide = state.slide === 0 ? db.images.length - 1 : state.slide - 1;
    },
    startAutoSlide: (state) => {
      state.autoSlide = true;
    },
    stopAutoSlide: (state) => {
      state.autoSlide = false;
    },
  },
});

export const { nextSlide, prevSlide, startAutoSlide, stopAutoSlide } =
  heroSecSlice.actions;
export default heroSecSlice.reducer;
