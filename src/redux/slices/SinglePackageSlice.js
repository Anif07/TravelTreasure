import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchSinglePackage = createAsyncThunk(
  "SinglePackageSlice/FetchSinglePackage",
  async ({ id, belong }) => {
    const url =
      belong === "india"
        ? `https://json-server-8qp6.onrender.com/indianPackages3?id=${id}`
        : `https://json-server-8qp6.onrender.com/internationalPackages3?id=${id}`;
    const response = await axios.get(url);
    return response.data;
  }
);

// export const PostToMyTrips = createAsyncThunk(
//   "SinglePackageSlice/PostToMyTripsIndia",
//   async (data) => {
//     try {
//       const existingEntries = await axios.get(
//         "https://json-server-8qp6.onrender.com/bookedPackages"
//       );
//       console.log(existingEntries);
//       const existingEntry = existingEntries.data.find(
//         (obj) => obj.name === data.name && obj.destination === data.destination
//       );

//       if (existingEntry) {
//         var response = await axios.put(
//           "https://json-server-8qp6.onrender.com/bookedPackages",
//           data
//         );
//         console.log("updated", response.data);
//       } else {
//         var response = await axios.post(
//           "https://json-server-8qp6.onrender.com/bookedPackages",
//           data
//         );
//         console.log("posted", response.data);
//       }

//       return response.data;
//     } catch (error) {
//       console.error("Post request failed", error);
//       throw error;
//     }
//   }
// );
export const PostToMyTrips = createAsyncThunk(
  "SinglePackageSlice/PostToMyTripsIndia",
  async (data) => {
    try {
      const existingEntries = await axios.get(
        "https://json-server-8qp6.onrender.com/bookedPackages"
      );

      const existingEntry = existingEntries.data.find(
        (obj) => obj.name === data.name && obj.destination === data.destination
      );

      let response;
      if (existingEntry) {
        response = await axios.put(
          `https://json-server-8qp6.onrender.com/bookedPackages/${existingEntry.id}`,
          data
        );
        // console.log("updated", response.data);
      } else {
        response = await axios.post(
          "https://json-server-8qp6.onrender.com/bookedPackages",
          data
        );
        // console.log("posted", response.data);
      }

      return response.data;
    } catch (error) {
      console.error("Post request failed", error);
      throw error;
    }
  }
);

const SinglePackageSlice = createSlice({
  name: "SinglePackageSlice",
  initialState: {
    package: {},
    status: "idle",
    price: "",
    from: "",
    time: "10:00",
    adults: "1",
    childrens: "0",
    total: "",
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setChildrens: (state, action) => {
      state.childrens = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    adultsPrice: (state) => {
      state.adultsPrice = state.price * state.adults;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchSinglePackage.pending, (state) => {
        state.status = "pending";
      })
      .addCase(FetchSinglePackage.fulfilled, (state, action) => {
        state.package = action.payload;
        state.status = "success";
      })
      .addCase(FetchSinglePackage.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { setFrom, setTime, setAdults, setChildrens, setPrice } =
  SinglePackageSlice.actions;

export default SinglePackageSlice.reducer;
