import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFlights,
  setDate,
  setFrom,
  setPersons,
  setTo,
} from "../../redux/slices/Flights/FlightSearchSlice";
import { useNavigate } from "react-router";
import "../../styles/flight/searchBar.css";

function SearchBarFlight() {
  const { from, to, date, persons } = useSelector(
    (state) => state.FlightSearch
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(from, to);
    dispatch(fetchFlights({ from, to }));
    navigate("/SearchedFlights");
  };

  useEffect(() => {
    dispatch(setDate(today));
  }, []);

  const shiftValuesHandler = () => {
    const tempFrom = from;
    dispatch(setFrom(to));
    dispatch(setTo(tempFrom));
  };

  return (
    <div className="flightSearchContainer">
      <form className="FlightSearchform" onSubmit={submitHandle}>
        <div>
          <label htmlFor="location">
            <i className="fa-solid fa-location-dot packSearchIcon"></i>
          </label>
          <input
            list="origins"
            id="origin"
            name="from"
            className="origin-input-field"
            value={from}
            placeholder="Where from?"
            onChange={(e) => dispatch(setFrom(e.target.value))}
            required
          />
          <datalist id="origins">
            <option value="DEL">New Delhi</option>
            <option value="BOM">Mumbai</option>
            <option value="BLR">Bengaluru</option>
            <option value="MAA">Chennai</option>
            <option value="HYD">Hyderabad</option>
            <option value="CCU">Kolkata</option>
          </datalist>
        </div>
        <div className="shiftValues" onClick={shiftValuesHandler}>
          <i classNA="fa-solid fa-arrow-right-arrow-left"></i>
        </div>
        <div>
          <label htmlFor="location">
            <i className="fa-solid fa-location-dot flightSearchIcon"></i>
          </label>
          <input
            list="destinations"
            className="destination-input-field"
            id="destination"
            value={to}
            name="to"
            placeholder="Where to?"
            onChange={(e) => dispatch(setTo(e.target.value))}
            required
          />
          <datalist id="destinations">
            <option value="BOM">Mumbai</option>
            <option value="DEL">New Delhi</option>
            <option value="MAA">Chennai</option>
            <option value="BLR">Bengaluru</option>
          </datalist>
        </div>
        <div>
          <label htmlFor="date">
            <i className="fa-solid fa-calendar-days packSearchIcon"></i>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            value={date}
            onChange={(e) => dispatch(setDate(e.target.value))}
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
        <div>
          <select id="flightClass" name="flightClass">
            <option>Select Class</option>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business Class</option>
            <option>First Class</option>
          </select>
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

export default SearchBarFlight;
