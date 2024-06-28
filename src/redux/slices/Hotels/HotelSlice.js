import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchHotels = createAsyncThunk(
  "HotelSlice/FetchHotels",
  async (city) => {
    const response = await axios.get(
      `https://json-server-8qp6.onrender.com/hotels?city=${city}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const FetchSingleHotel = createAsyncThunk(
  "HotelSlice/FetchSingleHotel",
  async (id) => {
    const response = await axios.get(
      `https://json-server-8qp6.onrender.com/hotels?id=${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const postHotel = createAsyncThunk(
  "HotelSlice/postHotel",
  async (data) => {
    await axios.post(
      "https://json-server-8qp6.onrender.com/bookedHotels",
      data
    );
  }
);

const HotelSlice = createSlice({
  name: "HotelSlice",
  initialState: {
    hotels: [],
    singleHotel: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    persons: "1",
    allHotelsStatus: "",
    singleHotelStatus: "",
    isSearchBar: "",
  },
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    setPersons: (state, action) => {
      state.persons = action.payload;
    },
    setIsSearchBar: (state, action) => {
      state.isSearchBar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchHotels.pending, (state) => {
        state.allHotelsStatus = "pending";
      })
      .addCase(FetchHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
        state.allHotelsStatus = "success";
      })
      .addCase(FetchHotels.rejected, (state) => {
        state.allHotelsStatus = "failed";
      })
      .addCase(FetchSingleHotel.pending, (state) => {
        state.singleHotelStatus = "pending";
      })
      .addCase(FetchSingleHotel.fulfilled, (state, action) => {
        state.singleHotel = action.payload;
        state.singleHotelStatus = "success";
      })
      .addCase(FetchSingleHotel.rejected, (state) => {
        state.singleHotelStatus = "failed";
      });
  },
});
export const {
  setCheckIn,
  setCheckOut,
  setDestination,
  setPersons,
  setIsSearchBar,
} = HotelSlice.actions;
export default HotelSlice.reducer;
