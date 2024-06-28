import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteHotel,
  fetchHotels,
} from "../../redux/slices/myTrips/MyTripsSlice";
import NetworkError from "../common/NetworkError";
import Loading from "../common/Loading";

function MyHotels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myHotels, myHotelsStatus } = useSelector((state) => state.MyTrips);
  console.log(myHotels);

  const deleteHotelHandler = (id) => {
    dispatch(deleteHotel(id));
  };
  const handleExploreHotels = () => {
    navigate("/Hotels");
  };
  const checkingHotelAgain = (id) => {
    navigate("/HotelDetails", { state: { id: id } });
  };

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  if (myHotelsStatus === "pending") {
    return <Loading />;
  }
  if (myHotelsStatus === "failed") {
    return <NetworkError />;
  }
  if (myHotels.length === 0) {
    return (
      <div className="noBookingPackages">
        <h2>No Hotel Bookings</h2>
        <p>
          It looks like you haven't booked any hotels yet. Explore our available
          hotels and book your next stay!
        </p>
        <button onClick={handleExploreHotels} className="explorePackages">
          Explore Hotels
        </button>
      </div>
    );
  }

  return (
    <div className="myPackages">
      {myHotels.map((obj, index) => (
        <div key={index} className="packageContainer">
          <div
            className="mypackageImgContainer"
            onClick={() => checkingHotelAgain(obj.id)}
          >
            <img src={obj?.img} alt="my pack" />
          </div>
          <div className="myPackageDetails">
            <h3>{obj?.name}</h3>
            <p>{obj?.location}</p>
            <span>
              Price: <i className="fa-solid fa-indian-rupee-sign"></i>
              {obj?.price}
            </span>
            <div className="cancelPackage">
              <button onClick={() => deleteHotelHandler(obj.id)}>Cancel</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyHotels;
