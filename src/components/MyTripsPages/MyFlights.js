import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";
import { useNavigate } from "react-router";
import { fetchMyFlights } from "../../redux/slices/Flights/FlightSearchSlice";
import "../../styles/MyTrips/myFlights.css";

function MyFlights() {
  const { myFlights, myFlightsStatus } = useSelector(
    (state) => state.FlightSearch
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExploreFlights = () => {
    navigate("/Flights");
  };

  useEffect(() => {
    dispatch(fetchMyFlights());
  }, [dispatch]);

  if (myFlightsStatus === "pending") {
    return <Loading />;
  }
  if (myFlightsStatus === "failed") {
    return <NetworkError />;
  }
  if (myFlights.length === 0) {
    return (
      <div className="noBookingPackages">
        <h2>No Flight Bookings</h2>
        <p>
          It looks like you haven't booked any flights yet. Explore our
          available flights and book your next trip!
        </p>
        <button onClick={handleExploreFlights} className="explorePackages">
          Explore Flights
        </button>
      </div>
    );
  }

  return (
    <div className="myFlights">
      {myFlights.map((flight, index) => (
        <div className="myFlightsContainer" key={index}>
          <table className="flightTable">
            <tbody>
              <tr>
                <td className="tdBold">AirLine:</td>
                <td>{flight?.Airline}</td>
              </tr>
              <tr>
                <td className="tdBold">Flight Number:</td>
                <td>{flight?.Flight_Number}</td>
              </tr>
              <tr>
                <td className="tdBold">Departure:</td>
                <td>{flight?.Departure}</td>
              </tr>
              <tr>
                <td className="tdBold">Arrival:</td>
                <td>{flight?.Arrival}</td>
              </tr>
              <tr>
                <td className="tdBold">Date:</td>
                <td>{flight?.date}</td>
              </tr>
              <tr>
                <td className="tdBold">passengers:</td>
                <td>{flight?.Passengers}</td>
              </tr>
              <tr>
                <td className="tdBold">Seats:</td>
                <td>
                  {flight?.seats?.length > 0
                    ? flight?.seats.join(", ")
                    : "No seats selected"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default MyFlights;
