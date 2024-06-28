import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/common/Navbar";
import "./styles/global.css";

// Lazy-loaded components
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Packages = React.lazy(() => import("./pages/Packages"));
const SinglePackage = React.lazy(() =>
  import("./components/Packages/SinglePackage")
);
const PackageBilling = React.lazy(() =>
  import("./components/Packages/PackageBilling")
);
const MyTrips = React.lazy(() => import("./pages/MyTrips"));
const PackageBookingConfirm = React.lazy(() =>
  import("./components/Packages/PackageBookingConfirm")
);
const Flights = React.lazy(() => import("./pages/Flights"));
const SearchedFlights = React.lazy(() =>
  import("./components/Flights/SearchedFlights")
);
const FlightBookingDetails = React.lazy(() =>
  import("./components/Flights/FlightBookingDetails")
);
const HotelPage = React.lazy(() => import("./pages/HotelPage"));
const AllHotels = React.lazy(() => import("./components/Hotels/AllHotels"));
const SingleHotelDetails = React.lazy(() =>
  import("./components/Hotels/singleHotelDetails")
);
const HotelBilling = React.lazy(() =>
  import("./components/Hotels/HotelBilling")
);
const HotelBookingConfirm = React.lazy(() =>
  import("./components/Hotels/hotelBookingConfirm")
);
const BookingCompletedFlight = React.lazy(() =>
  import("./components/Flights/BookingCompletedFlight")
);
const Signup = React.lazy(() => import("./components/common/Signup"));
const LogIn = React.lazy(() => import("./components/common/LogIn"));

function App() {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/SinglePackage" element={<SinglePackage />} />
          <Route path="/packageBilling" element={<PackageBilling />} />
          <Route path="/myTrips/*" element={<MyTrips />} />
          <Route
            path="/packageBookingConfirm"
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
          <Route
            path="/HotelBookingConfirm"
            element={<HotelBookingConfirm />}
          />
          <Route
            path="/FlightBookingCompleted"
            element={<BookingCompletedFlight />}
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<LogIn />} />
          {/* Additional routes commented out for clarity */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
