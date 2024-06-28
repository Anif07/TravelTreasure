import { Route, Router, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Packages from "./pages/Packages";
import Navbar from "./components/common/Navbar";
import "./styles/global.css";
import SinglePackage from "./components/Packages/SinglePackage";
import PackageBilling from "./components/Packages/PackageBilling";
import MyTrips from "./pages/MyTrips";
import PackageBookingConfirm from "./components/Packages/PackageBookingConfirm";
import Flights from "./pages/Flights";
import SearchedFlights from "./components/Flights/SearchedFlights";
import FlightBookingDetails from "./components/Flights/FlightBookingDetails";
import MyPackages from "./components/MyTripsPages/MyPackages";
import MyFlights from "./components/MyTripsPages/MyFlights";
import MyHotels from "./components/MyTripsPages/MyHotels";
import HotelPage from "./pages/HotelPage";
import AllHotels from "./components/Hotels/AllHotels";
import SingleHotelDetails from "./components/Hotels/singleHotelDetails";
import HotelBilling from "./components/Hotels/HotelBilling";
import HotelBookingConfirm from "./components/Hotels/hotelBookingConfirm";
import BookingCompletedFlight from "./components/Flights/BookingCompletedFlight";
import Signup from "./components/common/Signup";
import LogIn from "./components/common/LogIn";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/SinglePackage" element={<SinglePackage />} />
        <Route path="/packageBilling" element={<PackageBilling />} />
        <Route path="/myTrips/*" element={<MyTrips />} />
        <Route
          path="packageBookingConfirm"
          element={<PackageBookingConfirm />}
        />
        <Route path="/Flights" element={<Flights />} />
        <Route path="/SearchedFlights" element={<SearchedFlights />} />
        <Route
          path="/FlightBookingDetails"
          element={<FlightBookingDetails />}
        />
        <Route path="/Hotels" element={<HotelPage />} />
        <Route path="/AllHotels" element={<AllHotels />} />
        <Route path="/HotelDetails" element={<SingleHotelDetails />} />
        <Route path="/HotelBilling" element={<HotelBilling />} />
        <Route path="/HotelBookingConfirm" element={<HotelBookingConfirm />} />
        <Route
          path="/FlightBookingCompleted"
          element={<BookingCompletedFlight />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<LogIn />} />
        {/* <Route path="/myPackages" element={<MyPackages />} />
        <Route path="/myFlights" element={<MyFlights />} />
        <Route path="/myHotels" element={<MyHotels />} /> */}
      </Routes>
    </div>
  );
}

export default App;
