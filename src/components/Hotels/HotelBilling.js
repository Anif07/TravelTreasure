import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchSingleHotel,
  postHotel,
} from "../../redux/slices/Hotels/HotelSlice";
import { useLocation, useNavigate } from "react-router";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";

function HotelBilling() {
  const { singleHotel, singleHotelStatus, checkIn, checkOut, persons } =
    useSelector((state) => state.Hotels);
  const { isAuth } = useSelector((state) => state.LogIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const day1 = parseInt(checkIn.slice(-2));
  const day2 = parseInt(checkOut.slice(-2));
  const difference = day2 - day1;

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(FetchSingleHotel(location.state.id));
    }
  }, [dispatch, location.state, location.state.id]);

  const completeMyOrder = () => {
    const data = {
      name: singleHotel[0]?.hotel_name,
      location: `${singleHotel[0]?.city},${singleHotel[0]?.location}`,
      price: singleHotel[0]?.price,
      id: singleHotel[0]?.id,
    };
    dispatch(postHotel(data));

    navigate("/HotelBookingConfirm");
  };

  const hotelSumbitHandler = (e) => {
    e.preventDefault();
    completeMyOrder();
    // if (isAuth) {
    //   completeMyOrder();
    // } else {
    //   const data = {
    //     location: "/HotelBilling",
    //     id: location.state.id,
    //   };
    //   localStorage.setItem("location", JSON.stringify(data));
    //   navigate("/Login");
    // }
  };

  if (singleHotelStatus === "pending") {
    return <Loading />;
  }
  if (singleHotelStatus === "failed") {
    return <NetworkError />;
  }

  console.log(singleHotel);
  return (
    <div>
      <div className="packageBillingContainer">
        <div className="PackageBillingLeft">
          <h1 className="checkout">
            <span className="material-symbols-outlined">
              quick_reference_all
            </span>
            Review your Booking
          </h1>
          <div className="package-left-top">
            <img
              src={singleHotel[0]?.photos[0]}
              alt="billing "
              className="billingImg"
            />
            <div>
              <h3 className="billingPackName">{singleHotel[0]?.hotel_name}</h3>
              <p>
                <strong>checkIn: </strong>
                {checkIn} &nbsp;&nbsp;
              </p>
              <p>
                <strong>checkOut:</strong> {checkOut}
              </p>
              {/* <p>
                <strong>Duration: </strong>
                {difference}
                days
              </p> */}

              <p>
                <strong>Persons: </strong> {persons}
              </p>
            </div>
            <div className="leftBottomContainer"></div>
          </div>
          <div className="package-left-bottom">
            <table className="billingTable">
              <tbody>
                <tr>
                  <td className="left">Sub Total :</td>
                  <td className="right">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {singleHotel[0]?.price}
                  </td>
                </tr>
                <tr>
                  <td className="left">Total:</td>
                  <td className="right">
                    <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                    {singleHotel[0]?.price}
                  </td>
                </tr>
                <tr>
                  <td className="left">Amount Paid:</td>
                  <td className="right">
                    <i className="fa-solid fa-indian-rupee-sign"></i> 0
                  </td>
                </tr>
                <tr>
                  <td className="left">Amount Due:</td>
                  <td className="billingLastAmount right">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {singleHotel[0]?.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="PackageBillingRight">
          <form className="billingForm" onSubmit={hotelSumbitHandler}>
            <h2>Fill your details</h2>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
            />
            <input type="email" id="email" placeholder="Email" required />
            <input type="email" id="confirmEmail" placeholder="Confirm Email" />
            <input
              type="text"
              id="number"
              placeholder="Phone Number"
              required
            />
            <br />
            <hr />
            <div className="packageBillingMethod">
              <h2>Payment Method</h2>
              <p className="paylater">pay later</p>
              <p className="paymentMethodPara">Book now, Pay later!</p>
              <div className="paymentCheckbox">
                <input type="checkbox" value="agree" required />
                <span>i read and agree to the terms and conditions</span>
              </div>
              <div className="completeMyOrder">
                <button type="submit">Complete My Order</button>
              </div>
            </div>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default HotelBilling;
