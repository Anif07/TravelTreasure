import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../styles/flight/flightBookingDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPersons,
  decrementSelectedSeats,
  increasePersons,
  incrementSelectedSeats,
  postToMyFlights,
  removeSeatId,
  setPersons,
  setSeats,
  setSeatsId,
  setSeatsIdtoZero,
  setSelectedSeatsToZero,
  setStatus,
  singleFlightDetails,
} from "../../redux/slices/Flights/FlightSearchSlice";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";
import { toast } from "react-toastify";

function FlightBookingDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    singleFlightStatus,
    singleFlight,
    date,
    persons,
    seats,
    from,

    selectedSeats,
    seatsIds,
  } = useSelector((state) => state.FlightSearch);
  // const totalPrice = singleFlight[0]?.price * persons;
  const id = location.state.id;
  const displayDate = new Date(date)
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
  console.log(singleFlight);
  const rows = 12;
  const columns = 6;
  const label = "ABCDEF";

  const generateSeats = () => {
    const seats = [];
    for (var i = 1; i <= rows; i++) {
      for (var j = 1; j <= columns; j++) {
        seats.push({
          id: `${i}${label[j - 1]}`,
          selected: false,
        });
      }
    }
    return seats;
  };

  const handleSeatClick = (id, selected) => {
    dispatch(setStatus(id));
    dispatch(setSeatsId(id));

    if (selected) {
      dispatch(decrementSelectedSeats());
      dispatch(decrementPersons());
      dispatch(removeSeatId(id));
    } else {
      dispatch(incrementSelectedSeats());
      if (selectedSeats >= persons) {
        dispatch(increasePersons());
      }
    }
  };
  console.log("seatids", seatsIds);

  useEffect(() => {
    dispatch(singleFlightDetails(id));
    dispatch(setSelectedSeatsToZero());
    dispatch(setSeatsIdtoZero());
    dispatch(setSeats(generateSeats()));
  }, [dispatch, id]);

  const completeOrderHandler = () => {
    const data = {
      Airline: singleFlight[0]?.airline,
      Flight_Number: singleFlight[0]?.flight_number,
      Departure: `${singleFlight[0]?.departure_city}, ${singleFlight[0]?.departure_airport}`,
      Arrival: `${singleFlight[0]?.arrival_city}, ${singleFlight[0]?.arrival_airport}`,
      date: date,
      Passengers: persons,
      seats: seatsIds,
    };

    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const firstNames = document.querySelectorAll("#firstName");
    const lastNames = document.querySelectorAll("#lastName");

    if (email && number && firstNames && lastNames) {
      dispatch(postToMyFlights(data));
      dispatch(setSeatsId(""));
      dispatch(setPersons(1));
      navigate("/FlightBookingCompleted");
    } else {
      toast.warning("Please fill Traveller details.");
    }
  };

  if (singleFlightStatus === "pending") {
    return <Loading />;
  }
  if (singleFlightStatus === "failed") {
    return <NetworkError />;
  }

  return (
    <div className="singleFlightDetails">
      <div className="bookingDetailsContainer">
        <div className="detailsDiv">
          <h1 className="checkout">
            <span className="material-symbols-outlined">
              quick_reference_all
            </span>
            Review Your Booking
          </h1>
          <div className="fromToDate">
            <h3>
              {singleFlight[0]?.departure_city}---------
              {singleFlight[0]?.arrival_city}
            </h3>
            <p>{displayDate}</p>
          </div>
          <div>
            <h3 className="airline">{singleFlight[0]?.airline}</h3>
            <div className="flightFromToCont">
              <div className="flightDates">
                <p>
                  <strong>{singleFlight[0]?.schedule?.departure_time}</strong>
                </p>
                <p>
                  <strong>{singleFlight[0]?.schedule?.arrival_time}</strong>
                </p>
              </div>
              <div className="flightLineFromTo">
                <p>
                  <i className="fa-regular fa-circle"></i>
                </p>
                <p className="line"></p>
                <p>
                  <i className="fa-regular fa-circle"></i>
                </p>
              </div>
              <div className="nameAndAirport">
                <p>
                  <strong>{singleFlight[0]?.departure_city}</strong>,
                  {singleFlight[0]?.departure_airport_name}
                </p>
                <p>{singleFlight[0]?.duration}</p>
                <p>
                  <strong>{singleFlight[0]?.arrival_city}</strong>,
                  {singleFlight[0]?.arrival_airport_name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fareSummaryContainer">
          <h2>Fare Summary</h2>
          <p>
            <strong>Base fare</strong>
            {singleFlight[0]?.price * persons}
          </p>
          <p>
            <strong>Taxes and surcharges</strong>500
          </p>
          <hr />
          <p>
            <strong>Total Amount</strong>
            {singleFlight[0]?.price * persons + 500}
          </p>
        </div>
      </div>
      <div className="travellerDetails">
        <h2>
          <i className="fa-solid fa-user-plus"></i>Enter Traveller Details
        </h2>
        <div className="travellersContainer">
          <div className="contact-details">
            <h4>Contact details:</h4>
            <input type="email" id="email" placeholder="Email" />
            <input type="text" id="number" placeholder="Phone Number" />
            <p>
              Your booking details will be sent to this email address and mobile
              number
            </p>
          </div>
          <div className="travellers">
            <h2>Traveller Information</h2>
            <form>
              {[...Array(+persons)].map((_, index) => (
                <div key={index} className="person">
                  <h4>person:{index + 1}</h4>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    id="lastName"
                    placeholder="last Name"
                    required
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
      <div className="flightPayment">
        <h2>Make Payment</h2>
        <div className="flightPaymentContainer">
          <h3>Payment Method</h3>
          <p className="paylater">pay later</p>
          <p className="paymentMethodPara">Book now, Pay later!</p>
          <div className="paymentCheckbox">
            <input type="checkbox" value="agree" required />
            <span>i read and agree to the terms and conditions</span>
          </div>
        </div>
      </div>
      <div className="seatsContainer">
        <h1 className="seatsHeading">Seats</h1>
        <div className="seats-for-fromTo">
          <h2>
            {singleFlight[0]?.departure_city}-------
            {singleFlight[0]?.arrival_city}
          </h2>
        </div>
        <div className="seatBox">
          <div className="seatsMainBox">
            <div className="plane">
              <h1>Please select a seat</h1>
              <div className="planeSeats">
                {seats.map((seat, index) => (
                  <div
                    key={seat.id}
                    className={`seat ${seat.selected ? "selected" : ""}`}
                    onClick={() => handleSeatClick(seat.id, seat.selected)}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flightDetailsForSeats">
            <div className="flightDetailsForSeats-box">
              <div className="seatColor1"></div>
              <div>Available</div>
            </div>
            <div className="flightDetailsForSeats-box">
              <div className="seatColor2"></div>
              <div>Selected</div>
            </div>
          </div>
        </div>
        <div className="completeMyOrder">
          <button type="submit" onClick={() => completeOrderHandler()}>
            Complete My Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightBookingDetails;
