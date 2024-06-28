import React from "react";
import "../../styles/packages/bookingConfirm.css";
import { Link } from "react-router-dom";
function packageBookingConfirm() {
  return (
    <div className="packageBookingConfirm">
      <h1>
        <i className="fa-solid fa-check"></i> &nbsp;Booking Confirmed!
      </h1>
      <p>
        Thank you for booking with TravelTreasure! Your booking has been
        successfully completed.
      </p>
      <Link className="myTripsLink" to="/myTrips/myPackages">
        My Trips
      </Link>
    </div>
  );
}

export default packageBookingConfirm;
