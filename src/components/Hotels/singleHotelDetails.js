import React, { useEffect } from "react";
import "../../styles/Hotels/singleHotelDetails.css";
import HotelSearchBar from "./HotelSearchBar";
import Footer from "../Home/Footer";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FetchSingleHotel } from "../../redux/slices/Hotels/HotelSlice";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";

function SingleHotelDetails() {
  const { singleHotel, singleHotelStatus } = useSelector(
    (state) => state.Hotels
  );
  const { isAuth } = useSelector((state) => state.LogIn);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(location.state.id);

  const reserveHandler = () => {
    if (isAuth) {
      navigate("/HotelBilling", { state: { id: location.state.id } });
    } else {
      const data = {
        location: "/HotelDetails",
        id: location.state.id,
      };
      localStorage.setItem("location", JSON.stringify(data));
      navigate("/Login");
    }
  };

  useEffect(() => {
    dispatch(FetchSingleHotel(location.state.id));
  }, [dispatch, location.state.id]);

  if (singleHotelStatus === "pending") {
    return <Loading />;
  }
  if (singleHotelStatus === "failed") {
    return <NetworkError />;
  }

  return (
    <>
      {/* <div className="hotelSearchBarContainer">
        <HotelSearchBar />
      </div> */}
      <div className="singleHotelContainer">
        <div className="singleHotelLeft">
          <h1>{singleHotel[0]?.hotel_name}</h1>
          <p>
            <i className="fa-solid fa-location-dot"></i>&nbsp;
            {singleHotel[0]?.city}, {singleHotel[0]?.location}
          </p>
          <div className="singleHotelImgContainer">
            <img src={singleHotel[0]?.photos[0]} alt="hotel"></img>
            <img src={singleHotel[0]?.photos[1]} alt="room"></img>
            <img src={singleHotel[0]?.photos[2]} alt="room"></img>
          </div>
          <div>
            <div className="description">
              <h1>Description</h1>
              <p>{singleHotel[0]?.description}</p>
            </div>
          </div>
          <div className="amenities">
            <h2>Amenities:</h2>
            {singleHotel[0]?.amenities.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="nearByAttractions">
            <h2>Near by Attractions:</h2>
            {singleHotel[0]?.nearby_attractions.map((item, index) => (
              <p key={index}>
                <i className="fa-solid fa-arrow-right"></i> &nbsp;&nbsp;
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="singleHotelRight">
          <div>
            <h3>Deluxe Room</h3>
            <p>Fits 2 Adults</p>
            <ul>
              <li>meals included</li>
              <li>Best view</li>
            </ul>
            <p className="hotelPrice">
              <i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;
              {singleHotel[0]?.price}
            </p>
            <smal>per night</smal>
            <button onClick={reserveHandler}>Reserve Room</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleHotelDetails;
