import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  FetchHotels,
  setCheckIn,
  setCheckOut,
  setDestination,
  setPersons,
} from "../../redux/slices/Hotels/HotelSlice";
import "../../styles/packages/packageSearch.css";
import "../../styles/Hotels/hotelSearchBar.css";

function HotelSearchBar() {
  const { destination, checkIn, checkOut, persons } = useSelector(
    (state) => state.Hotels
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CheckInRef = useRef(null);
  const CheckOutRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const nextDayDate = new Date();
  nextDayDate.setDate(nextDayDate.getDate() + 1);

  const nextDay = nextDayDate.toISOString().split("T")[0];

  useEffect(() => {
    dispatch(setCheckIn(today));
    dispatch(setCheckOut(nextDay));
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(FetchHotels(destination));
    navigate("/AllHotels");
  };

  const checkInHandler = () => {
    if (CheckInRef.current) {
      CheckInRef.current.focus();
    }
    if (CheckInRef.current.showPicker) {
      CheckInRef.current.showPicker();
    }
  };

  const checkOutHandler = () => {
    if (CheckOutRef.current) {
      CheckOutRef.current.focus();
    }
    if (CheckOutRef.current.showPicker) {
      CheckOutRef.current.showPicker();
    }
  };
  return (
    <div className="flightSearchContainer">
      <form className="form" onSubmit={submitHandle}>
        <div>
          <label htmlFor="location">
            <i className="fa-solid fa-location-dot packSearchIcon"></i>
          </label>
          <input
            list="HotelDestinations"
            id="origin"
            className="destination-input-field"
            name="from"
            value={destination}
            placeholder="Destination"
            onChange={(e) => dispatch(setDestination(e.target.value))}
            required
          />
          <datalist id="HotelDestinations">
            <option value="Delhi"></option>
            <option value="Mumbai"></option>
            <option value="Bangalore"></option>
            <option value="Kolkata"></option>
            <option value="Chennai"></option>
            <option value="Kovalam"></option>
          </datalist>
        </div>

        <div className="checkInCont">
          <label htmlFor="checkin" onClick={checkInHandler}>
            <i className="fa-solid fa-calendar-days packSearchIcon"></i>
            <div>
              <p>check-in</p>
              <p>
                <strong>{checkIn}</strong>
              </p>
            </div>
          </label>
          <input
            type="date"
            id="checkin"
            ref={CheckInRef}
            name="date"
            min={today}
            value={checkIn}
            onChange={(e) => dispatch(setCheckIn(e.target.value))}
            required
          />
        </div>
        <div className="checkOutCont">
          <label htmlFor="checkOut" onClick={checkOutHandler}>
            <i className="fa-solid fa-calendar-days packSearchIcon"></i>
            <div>
              <p>check-in</p>
              <p>
                <strong>{checkOut}</strong>
              </p>
            </div>
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            min={checkIn}
            value={checkOut}
            ref={CheckOutRef}
            onChange={(e) => dispatch(setCheckOut(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="noOfPersons">
            <i className="fa-solid fa-user packSearchIcon"></i>
          </label>
          <input
            type="number"
            id="noOfPersons"
            name="noOfPersons"
            placeholder="Persons"
            value={persons}
            min="1"
            onChange={(e) => dispatch(setPersons(e.target.value))}
          />
        </div>
        <div className="searchBtnContainer">
          <button type="submit" className="searchBtn">
            <i className="fa-solid fa-magnifying-glass"></i>Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelSearchBar;
