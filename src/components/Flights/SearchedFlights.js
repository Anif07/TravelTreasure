import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBarFlight from "./SearchBarFlight";
import "../../styles/flight/searchedFlights.css";
import Footer from "../Home/Footer";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";
import { useNavigate } from "react-router";
import AllHotels from "../Hotels/AllHotels";
import {
  FetchHotels,
  setDestination,
  setIsSearchBar,
} from "../../redux/slices/Hotels/HotelSlice";
import { setPersons } from "../../redux/slices/Flights/FlightSearchSlice";

function SearchedFlights() {
  const { flights, status, date, to } = useSelector(
    (state) => state.FlightSearch
  );
  const { isSearchBar, destination } = useSelector((state) => state.Hotels);
  const { isAuth } = useSelector((state) => state.LogIn);
  const [dashes, setDashes] = useState("---------------------");
  console.log(flights);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departureDate = new Date(date)
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  const departure_city = flights[0]?.departure_city;
  const arrival_city = flights[0]?.arrival_city;

  const FlightViewDetails = (id) => {
    if (isAuth) {
      navigate("/FlightBookingDetails", { state: { id: id } });
    } else {
      const data = {
        location: "/SearchedFlights",
      };
      localStorage.setItem("location", JSON.stringify(data));
      navigate("/Login");
    }
  };

  const updateDashes = () => {
    if (window.innerWidth <= 576) {
      setDashes("--------");
    } else {
      setDashes("---------------------");
    }
  };
  useEffect(() => {
    setDestination(to);
    dispatch(FetchHotels(destination));
    setIsSearchBar(false);
    setPersons(1);
    updateDashes();
    window.addEventListener("resize", updateDashes);
    return () => {
      window.removeEventListener("resize", updateDashes);
    };
  }, []);
  return (
    <div>
      <div className="searchBarContainer">
        <SearchBarFlight />
      </div>
      <div className="allFlights">
        {status === "pending" && <Loading />}
        {status === "failed" && <NetworkError />}
        {flights.length === 0 &&
          status !== "pending" &&
          status !== "failed" && (
            <h1 className="noFlights">No Flights found in this Route</h1>
          )}
        {status === "success" && (
          <div className="details-Of-From-To">
            <h1>
              Flights from {departure_city} to {arrival_city}
            </h1>
          </div>
        )}
        {status === "success" &&
          flights.map((obj, index) => (
            <>
              <div key={index} className="flightDetails">
                <div className="flightImgContainer">
                  <img
                    src={
                      obj?.airline === "Air India"
                        ? "https://res.cloudinary.com/dsysrrxod/image/upload/v1718552785/Air_india_logo_tkar2t.png"
                        : obj?.airline === "IndiGo"
                        ? "https://res.cloudinary.com/dsysrrxod/image/upload/v1718552785/indigo_q47iko.webp"
                        : obj?.airline === "SpiceJet"
                        ? "https://res.cloudinary.com/dsysrrxod/image/upload/v1718899910/SpiceJet-Logo_oywsp0.jpg"
                        : "https://res.cloudinary.com/dsysrrxod/image/upload/v1718899362/flig_kjqjo7.jpg"
                    }
                    alt="assad"
                  />
                  <p>{obj?.airline}</p>
                </div>
                <div>
                  <p>{obj?.departure_airport}, india</p>
                  <h1>{obj?.schedule?.departure_time}</h1>
                  <p>{departureDate}</p>
                </div>
                <div className="flightMiddle">
                  <p>{obj?.duration}</p>
                  <div>{dashes}</div>
                  <p>Direct</p>
                </div>
                <div>
                  <p>{obj?.arrival_airport}, india</p>
                  <h1>{obj?.schedule?.arrival_time}</h1>
                  <p>{departureDate}</p>
                </div>
                <div className="flightViewDetails">
                  <h2>
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {obj?.price}
                  </h2>
                  <button onClick={() => FlightViewDetails(obj.id)}>
                    View Details
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
      {/* <AllHotels /> */}
      <Footer />
    </div>
  );
}

export default SearchedFlights;
