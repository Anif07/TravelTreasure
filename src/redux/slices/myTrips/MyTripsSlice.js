import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPackages = createAsyncThunk(
  "MyTripsSlice/fetchPackages",
  async () => {
    const response = await axios.get(
      "https://json-server-8qp6.onrender.com/bookedPackages"
    );
    return response.data;
  }
);
export const deletePackage = createAsyncThunk(
  "MyTripsSlice/deletePackage",
  async (id) => {
    await axios.delete(
      `https://json-server-8qp6.onrender.com/bookedPackages/${id}`
    );
    return id;
  }
);

export const fetchHotels = createAsyncThunk(
  "MyTripsSlice/fetchHotels",
  async () => {
    const response = await axios.get(
      "https://json-server-8qp6.onrender.com/bookedHotels"
    );
    return response.data;
  }
);
export const deleteHotel = createAsyncThunk(
  "MyTripsSlice/deleteHotel",
  async (id) => {
    await axios.delete(
      `https://json-server-8qp6.onrender.com/bookedHotels/${id}`
    );
    return id;
  }
);

const MyTripsSlice = createSlice({
  name: "MyTripsSlice",
  initialState: {
    myPackages: [],
    packageStatus: "idle",
    myHotels: [],
    myHotelsStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.packageStatus = "pending";
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.packageStatus = "success";
        state.myPackages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state) => {
        state.packageStatus = "failed";
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.myPackages = state.myPackages.filter(
          (obj) => obj.id !== action.payload
        );
      })
      .addCase(fetchHotels.pending, (state) => {
        state.myHotelsStatus = "pending";
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.myHotelsStatus = "success";
        state.myHotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state) => {
        state.myHotelsStatus = "failed";
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.myHotels = state.myHotels.filter(
          (obj) => obj.id !== action.payload
        );
      });
  },
});

export default MyTripsSlice.reducer;
