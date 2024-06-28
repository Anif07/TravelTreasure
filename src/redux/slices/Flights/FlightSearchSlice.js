import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import MyFlights from "../../../components/MyTripsPages/MyFlights";

export const fetchFlights = createAsyncThunk(
  "FlightSearchSlice/fetchFlights",
  async ({ from, to }) => {
    console.log(from, to);
    const response = await axios.get(
      `https://json-server-8qp6.onrender.com/flights3?departure_airport=${from}&arrival_airport=${to}`
    );
    console.log(response.data);
    return response.data;
  }
);
export const singleFlightDetails = createAsyncThunk(
  "FlightSearchSlice/singleFlightDetails",
  async (id) => {
    const response = await axios.get(
      `https://json-server-8qp6.onrender.com/flights3?id=${id}`
    );
    return response.data;
  }
);

export const postToMyFlights = createAsyncThunk(
  "FlightSearchSlice/postToMyFlights",
  async (data) => {
    const datainServer = await axios.get(
      "https://json-server-8qp6.onrender.com/bookedFlights"
    );
    const obj = datainServer.data.find(
      (obj) => obj.Flight_Number === data.Flight_Number
    );

    if (obj) {
      await axios.put(
        `https://json-server-8qp6.onrender.com/bookedFlights/${obj.id}`,
        data
      );
    } else {
      const response = await axios.post(
        "https://json-server-8qp6.onrender.com/bookedFlights",
        data
      );
    }
  }
);

export const fetchMyFlights = createAsyncThunk(
  "FlightSearchSlice/fetchMyFlights",
  async () => {
    const response = await axios.get(
      "https://json-server-8qp6.onrender.com/bookedFlights"
    );
    return response.data;
  }
);

const FlightSearchSlice = createSlice({
  name: "FlightSearchSlice",
  initialState: {
    from: "",
    to: "",
    date: "",
    persons: 1,
    status: "idle",
    flights: [],
    singleFlightStatus: "idle",
    singleFlight: {},
    seats: [],
    seatsIds: [],
    selectedSeats: 0,
    myFlights: "",
    myFlightsStatus: "",
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setPersons: (state, action) => {
      state.persons = action.payload;
    },
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    setSeatsId: (state, action) => {
      if (action.payload !== "") {
        state.seatsIds = [...state.seatsIds, action.payload];
      } else {
        state.seatsIds = "";
      }
    },
    setSeatsIdtoZero: (state) => {
      state.seatsIds = [];
    },
    removeSeatId: (state, action) => {
      state.seatsIds = state.seatsIds.filter((item) => item !== action.payload);
    },
    incrementSelectedSeats: (state) => {
      state.selectedSeats += 1;
    },
    decrementSelectedSeats: (state) => {
      state.selectedSeats -= 1;
    },
    setStatus: (state, action) => {
      state.seats = state.seats.map((seat) =>
        seat.id === action.payload
          ? { ...seat, selected: !seat.selected }
          : seat
      );
    },
    increasePersons: (state) => {
      state.persons = +state.persons + 1;
    },
    setSelectedSeatsToZero: (state) => {
      state.selectedSeats = 0;
    },
    decrementPersons: (state) => {
      state.persons -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.status = "success";
      })
      .addCase(fetchFlights.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(singleFlightDetails.pending, (state) => {
        state.singleFlightStatus = "pending";
      })
      .addCase(singleFlightDetails.fulfilled, (state, action) => {
        state.singleFlight = action.payload;
        state.singleFlightStatus = "success";
      })
      .addCase(singleFlightDetails.rejected, (state) => {
        state.singleFlightStatus = "failed";
      })
      .addCase(fetchMyFlights.pending, (state) => {
        state.myFlightsStatus = "pending";
      })
      .addCase(fetchMyFlights.fulfilled, (state, action) => {
        state.myFlights = action.payload;
        state.myFlightsStatus = "success";
      })
      .addCase(fetchMyFlights.rejected, (state) => {
        state.myFlightsStatus = "failed";
      });
  },
});

export const {
  setFrom,
  setTo,
  setDate,
  setPersons,
  setSeats,
  setSeatsIdtoZero,
  setStatus,
  incrementSelectedSeats,
  decrementSelectedSeats,
  increasePersons,

  decrementPersons,
  setSeatsId,
  removeSeatId,
  setSelectedSeatsToZero,
} = FlightSearchSlice.actions;

export default FlightSearchSlice.reducer;
