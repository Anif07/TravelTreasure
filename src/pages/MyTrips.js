import React from "react";
import { Route, Routes } from "react-router";
import { Link, NavLink } from "react-router-dom";
import MyPackages from "../components/MyTripsPages/MyPackages";
import MyFlights from "../components/MyTripsPages/MyFlights";
import MyHotels from "../components/MyTripsPages/MyHotels";
import "../styles/homePage/myTrips.css";

function MyTrips() {
  return (
    <div className="myTripsContainer">
      <div className="tripsUpperContainer">
        <div>
          <h2>Your Trips</h2>
        </div>
        <div>
          <NavLink
            to="myPackages"
            className={({ isActive }) =>
              isActive ? "myTripLinks linkActive" : "myTripLinks"
            }
          >
            Packages
          </NavLink>
          <NavLink
            to="myFlights"
            className={({ isActive }) =>
              isActive ? "myTripLinks linkActive" : "myTripLinks"
            }
          >
            Flights Bookings
          </NavLink>
          <NavLink
            to="myHotels"
            className={({ isActive }) =>
              isActive ? "myTripLinks linkActive" : "myTripLinks"
            }
          >
            Hotels Bookings
          </NavLink>
        </div>
      </div>
      <div className="tripsLowerContainer">
        <Routes>
          <Route index element={<MyPackages />} />
          <Route path="myPackages" element={<MyPackages />} />
          <Route path="myFlights" element={<MyFlights />} />
          <Route path="myHotels" element={<MyHotels />} />
        </Routes>
      </div>
    </div>
  );
}

export default MyTrips;
