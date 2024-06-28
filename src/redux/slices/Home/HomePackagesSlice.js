import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIndianPackages = createAsyncThunk(
  "AllPackages/fetchIndianPackages",
  async () => {
    const response = await axios.get(
      "https://json-server-8qp6.onrender.com/indianPackages3?_limit=5"
    );
    return response.data;
  }
);

export const fetchInternationalPackages = createAsyncThunk(
  "AllPackages/fetchInternationalPackages",
  async () => {
    const response = await axios.get(
      "https://json-server-8qp6.onrender.com/internationalPackages3?_limit=5"
    );
    return response.data;
  }
);

const HomePackagesSlice = createSlice({
  name: "HomePackagesSlice",
  initialState: {
    indianPackages: [],
    internationalPackages: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndianPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIndianPackages.fulfilled, (state, action) => {
        state.status = "success";
        state.indianPackages = action.payload;
      })
      .addCase(fetchIndianPackages.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchInternationalPackages.pending, (state) => {
        state.internationalStatue = "loading";
      })
      .addCase(fetchInternationalPackages.fulfilled, (state, action) => {
        state.internationalPackages = action.payload;
        state.internationalStatue = "success";
      })
      .addCase(fetchInternationalPackages.rejected, (state) => {
        state.internationalStatue = "failed";
      });
  },
});

export default HomePackagesSlice.reducer;
