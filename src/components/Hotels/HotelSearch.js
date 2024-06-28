import React, { Suspense, lazy } from "react";
import HotelSearchBar from "./HotelSearchBar";
import "../../styles/Hotels/hotelSearchBar.css";
import Loading from "../common/Loading";
import {
  FetchHotels,
  setDestination,
} from "../../redux/slices/Hotels/HotelSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Footer = lazy(() => import("../Home/Footer"));

function HotelSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandle = (destination) => {
    dispatch(setDestination(destination));
    dispatch(FetchHotels(destination));
    navigate("/AllHotels");
  };

  return (
    <div>
      <div className="packageBackgroundImg">
        <img
          src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719022437/pexels-asman-chema-91897-594077_fqtsz5.jpg"
          alt="backGround"
        />
        <h1>Book Your Room</h1>
      </div>
      <HotelSearchBar />
      <div className="placesForHotelsContainer">
        <div className="places-heading">
          <h2>Trending Places</h2>
        </div>
        <div className="placesCont">
          <div className="HotelPlace" onClick={() => navigateHandle("Delhi")}>
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718694349/pexels-sudipta-1603650_jotcs6.jpg"
              alt="places"
            />
            <div>
              <h3>Delhi</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace" onClick={() => navigateHandle("Mumbai")}>
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719306918/pexels-elmir-jafarov-375483362-19356058_rmzdot.jpg"
              alt="places"
            />
            <div>
              <h3>Mumbai</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div
            className="HotelPlace"
            onClick={() => navigateHandle("Bangalore")}
          >
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719308445/pexels-k3ith-6057333_c0epsq.jpg"
              alt="places"
            />
            <div>
              <h3>Bangalore</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace" onClick={() => navigateHandle("Kolkata")}>
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719315222/pexels-rohit-sharma-1230131-16565204_cgfwnq.jpg"
              alt="places"
            />
            <div>
              <h3>Kolkata</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace" onClick={() => navigateHandle("Chennai")}>
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719308597/pexels-soubhagya23-18275863_vn5zkd.jpg"
              alt="places"
            />
            <div>
              <h3>Chennai</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace" onClick={() => navigateHandle("Kovalam")}>
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719315233/pexels-joji-graison-127742995-10229156_h0grfr.jpg"
              alt="places"
            />
            <div>
              <h3>Kovalam</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace">
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719316010/pexels-pravin-kannah-photography-42707363-14572850_vvtn3a.jpg"
              alt="places"
            />
            <div>
              <h3>Manali</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace">
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719316005/pexels-te-lensfix-380994-1374377_qwyntq.jpg"
              alt="places"
            />
            <div>
              <h3>Bangkok</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
          <div className="HotelPlace">
            <img
              src="https://res.cloudinary.com/dsysrrxod/image/upload/v1719316005/pexels-apasaric-618079_n1x6re.jpg"
              alt="places"
            />
            <div>
              <h3>Dubai</h3>
              <p>Hotels, Resorts, Best Hotels, Budget Hotels</p>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default HotelSearch;
