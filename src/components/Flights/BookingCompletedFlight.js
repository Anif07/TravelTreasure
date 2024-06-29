import React from "react";
import { Link } from "react-router-dom";
import "../../styles/packages/bookingConfirm.css";

function BookingCompletedFlight() {
  return (
    <div className="packageBookingConfirm">
      <h1>
        <i className="fa-solid fa-check"></i> &nbsp;Flight Booking Confirmed!
      </h1>
      <p>
        Thank you for booking with TravelTreasure! Your flight booking has been
        successfully completed.
      </p>
      <Link className="myTripsLink" to="/myTrips/myFlights">
        My Trips
      </Link>
    </div>
  );
}

export default BookingCompletedFlight;
