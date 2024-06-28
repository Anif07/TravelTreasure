import React from "react";
import HotelSearchBar from "./HotelSearchBar";
import Footer from "../Home/Footer";
import "../../styles/Hotels/allHotels.css";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";
import { useNavigate } from "react-router";

function AllHotels() {
  const { hotels, allHotelsStatus, destination } = useSelector(
    (state) => state.Hotels
  );
  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate("/HotelDetails", { state: { id: id } });
  };

  if (allHotelsStatus === "pending") {
    return <Loading />;
  }
  if (allHotelsStatus === "failed") {
    return <NetworkError />;
  }
  return (
    <div>
      <div className="hotelSearchBarContainer">
        <HotelSearchBar />
      </div>
      <div className="AllHotels">
        <div className="allHotelsHeading-cont">
          <h1 className="allHotelsHeading">Hotels in {destination}</h1>
        </div>
        {hotels.map((obj, index) => (
          <div
            className="hotel"
            key={index}
            onClick={() => {
              navigateHandler(obj.id);
            }}
          >
            <div className="hotelImgCont">
              <img src={obj?.photos[0]} alt="HotelImg" />
            </div>
            <div className="HotelNameCont">
              <h2 className="hotelName">
                {obj?.hotel_name} &nbsp;
                <span>
                  {[...Array(parseInt(obj.rating))].map((item) => (
                    <span>&#9733;</span>
                  ))}
                </span>
              </h2>
              <p>
                <i className="fa-solid fa-location-dot"></i>&nbsp;{obj?.city}
                ,&nbsp;
                {obj?.location}
              </p>
              <div className="facilities">
                {obj?.facilities.map((item, index) => (
                  <p key={index}>
                    <i className="fa-solid fa-check check"></i> &nbsp;&nbsp;
                    {item}
                  </p>
                ))}
                {/* <p>Free cancellation</p>
                <p>meals included</p> */}
              </div>
              <div className="cancellation">
                <p> Cancellation: Free up to 24 hours before check-in</p>
              </div>
            </div>
            <hr />
            <div className="hotelPriceCont">
              <p className="ratingCont">
                Rating <span className="rating">{obj?.rating}</span>
              </p>
              <h3 className="Hotelprice">
                <i className="fa-solid fa-indian-rupee-sign"></i> {obj?.price}
              </h3>
              <p>Per Night</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllHotels;
