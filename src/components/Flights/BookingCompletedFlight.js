import React from "react";
import { Link } from "react-router-dom";

function BookingCompletedFlight() {
  return (
    <div className="packageBookingConfirm">
      <h1>
        <i className="fa-solid fa-check"></i> &nbsp;Hotel Booking Confirmed!
      </h1>
      <p>
        Thank you for booking with TravelTreasure! Your hotel booking has been
        successfully completed.
      </p>
      <Link className="myTripsLink" to="/myTrips/myFlights">
        My Trips
      </Link>
    </div>
  );
}

export default BookingCompletedFlight;
