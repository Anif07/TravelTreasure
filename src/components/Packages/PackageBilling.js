import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import {
  FetchSinglePackage,
  PostToMyTrips,
} from "../../redux/slices/SinglePackageSlice";
import "../../styles/packages/packageBilling.css";
import Loading from "../common/Loading";
import PackageBookingConfirm from "./PackageBookingConfirm";

function PackageBilling() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { from, time, adults, childrens, status } = useSelector(
    (state) => state.singlePackage
  );
  const Exploringpackage = useSelector(
    (state) => state.singlePackage.package[0]
  );
  const { isAuth } = useSelector((state) => state.LogIn);
  const adultsPrice = Exploringpackage?.price * adults;
  const childrenPrice =
    childrens !== "0" ? Exploringpackage?.price * childrens - 5000 : "0";
  const totalPrice = adultsPrice + childrenPrice;
  const belong = location.state.belong;
  const id = location.state.id;

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(
        FetchSinglePackage({
          id: location.state.id,
          belong: location.state.belong,
        })
      );
      window.scrollTo(0, 0);
    }
  }, [dispatch, location.state, location.state.id]);

  const completeOrderHandler = () => {
    dispatch(
      PostToMyTrips({
        img: Exploringpackage?.images[0],
        name: Exploringpackage?.name,
        destination: Exploringpackage?.destination,
        totalPrice: totalPrice,
        date: from,
        belong: belong,
        id: id,
      })
    ).then((result) => {
      if (result.type === "SinglePackageSlice/PostToMyTripsIndia/fulfilled") {
        navigate("/packageBookingConfirm");
      } else {
        console.error("Order completion failed", result.error);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    completeOrderHandler();
    // if (isAuth) {
    //   completeOrderHandler();
    // } else {
    //   const data = {
    //     location: "/packageBilling",
    //     id: location.state.id,
    //     belong: location.state.belong,
    //   };
    //   localStorage.setItem("location", JSON.stringify(data));
    //   navigate("/Login");
    // }
  };

  if (status === "pending") {
    return <Loading />;
  }
  if (status === "failed") {
    return <div>Network issue</div>;
  }
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
              src={Exploringpackage?.images[0]}
              alt="billing "
              className="billingImg"
            />
            <div>
              <h3 className="billingPackName">{Exploringpackage?.name}</h3>
              <p>
                <strong>Date:</strong> {from} &nbsp;&nbsp;{" "}
                <strong>Time:</strong>
                {time}
              </p>
              <p>
                <strong>Duration: </strong>
                {Exploringpackage?.duration.days} days
              </p>
              <h3 className="ticketHeading">Tickets:</h3>
              <p>
                Adults x {adults}=
                <strong>
                  <i ClassName="fa-solid fa-indian-rupee-sign"></i>
                  {adultsPrice}
                </strong>
              </p>
              {childrens !== "0" && (
                <p>
                  Childrens x {childrens}=
                  <strong>
                    <i ClassName="fa-solid fa-indian-rupee-sign"></i>
                    {childrenPrice}
                  </strong>
                </p>
              )}
            </div>
            <div className="leftBottomContainer"></div>
          </div>
          <div className="package-left-bottom">
            <table className="billingTable">
              <tr>
                <td className="left">Sub Total :</td>
                <td className="right">
                  <i ClassName="fa-solid fa-indian-rupee-sign"></i>{" "}
                  {adultsPrice + childrenPrice}
                </td>
              </tr>
              <tr>
                <td className="left">Total:</td>
                <td className="right">
                  <i ClassName="fa-solid fa-indian-rupee-sign"></i>{" "}
                  {adultsPrice + childrenPrice}
                </td>
              </tr>
              <tr>
                <td className="left">Amount Paid:</td>
                <td className="right">
                  <i ClassName="fa-solid fa-indian-rupee-sign"></i> 0
                </td>
              </tr>
              <tr>
                <td className="left">Amount Due:</td>
                <td className="billingLastAmount right">
                  <i ClassName="fa-solid fa-indian-rupee-sign"></i>{" "}
                  {adultsPrice + childrenPrice}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="PackageBillingRight">
          <form className="billingForm" onSubmit={handleSubmit}>
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

export default PackageBilling;
