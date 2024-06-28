import { configureStore } from "@reduxjs/toolkit";
import heroSectionReducer from "../slices/heroSectionSlice";
import AllPackagesReducer from "../slices/AllPackagesSlice";
import SinglePackageReducer from "../slices/SinglePackageSlice";
import FlightSearchReducer from "../slices/Flights/FlightSearchSlice";
import MyTripsReducer from "../slices/myTrips/MyTripsSlice";
import HotelReducer from "../slices/Hotels/HotelSlice";
import HomePackagesReducer from "../slices/Home/HomePackagesSlice";
import LogInReducer from "../slices/LoginSlice";

const store = configureStore({
  reducer: {
    heroSection: heroSectionReducer,
    AllPackages: AllPackagesReducer,
    singlePackage: SinglePackageReducer,
    FlightSearch: FlightSearchReducer,
    MyTrips: MyTripsReducer,
    Hotels: HotelReducer,
    HomePackages: HomePackagesReducer,
    LogIn: LogInReducer,
  },
});
export default store;
