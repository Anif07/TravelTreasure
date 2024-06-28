import React from "react";
import {
  fetchFlights,
  setFrom,
  setTo,
} from "../../redux/slices/Flights/FlightSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBarFlight from "./SearchBarFlight";
import "../../styles/flight/searchBar.css";
import { useNavigate } from "react-router";

function FlightsSearch() {
  const { from, to } = useSelector((state) => state.FlightSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const popFlightHandler = ({ from, to }) => {
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(fetchFlights({ from, to }));
    navigate("/SearchedFlights");
  };

  return (
    <div>
      <div className="packageBackgroundImg">
        <img
          src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718861862/pexels-pixabay-358319_l5bbqg.jpg"
          alt="backGround"
        />
        <h1>Book a Flight</h1>
      </div>
      <SearchBarFlight />
      <div className="popularFlightsContainer">
        <h1>Popular flights for you</h1>
        <div className="popularFlights">
          <div
            className="popFlight"
            onClick={() => popFlightHandler({ from: "HYD", to: "MAA" })}
          >
            <div className="popFlightImg">
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719308597/pexels-soubhagya23-18275863_vn5zkd.jpg"
                alt="pupular flights"
              />
            </div>
            <h4>Hyderabad to Chennai</h4>
          </div>
          <div
            className="popFlight"
            onClick={() => popFlightHandler({ from: "HYD", to: "BOM" })}
          >
            <div className="popFlightImg">
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719308670/pexels-illuseenator-3893788_szzwdq.jpg"
                alt="pupular flights"
              />
            </div>
            <h4>Hyderabad to Mumbai</h4>
          </div>
          <div
            className="popFlight"
            onClick={() => popFlightHandler({ from: "HYD", to: "DEL" })}
          >
            <div className="popFlightImg">
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718694349/pexels-sudipta-1603650_jotcs6.jpg"
                alt="pupular flights"
              />
            </div>
            <h4>Hyderabad to New Delhi</h4>
          </div>
          <div
            className="popFlight"
            onClick={() => popFlightHandler({ from: "HYD", to: "BLR" })}
          >
            <div className="popFlightImg">
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719308445/pexels-k3ith-6057333_c0epsq.jpg"
                alt="pupular flights"
              />
            </div>
            <h4>Hyderabad to Bengalur</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightsSearch;
