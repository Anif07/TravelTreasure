import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchSinglePackage,
  setAdults,
  setChildrens,
  setFrom,
  setPrice,
  setTime,
} from "../../redux/slices/SinglePackageSlice";
import { useLocation } from "react-router";
import "../../styles/packages/single-package.css";
import Footer from "../Home/Footer";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";
// import { setFrom } from "../../redux/slices/SinglePackageSlice";

function SinglePackage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const Exploringpackage = useSelector(
    (state) => state.singlePackage.package[0]
  );
  const { status, from, time, adults, childrens } = useSelector(
    (state) => state.singlePackage
  );
  const { isAuth } = useSelector((state) => state.LogIn);

  const today = new Date().toISOString().split("T")[0];
  const adultsPrice = Exploringpackage?.price * adults;
  const childrensPrice =
    childrens !== "0" ? Exploringpackage?.price * childrens - 5000 : "0";

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(
        FetchSinglePackage({
          id: location.state.id,
          belong: location.state.belong,
        })
      );
      window.scrollTo(0, 0);
      dispatch(setPrice(Exploringpackage?.price));
      dispatch(setFrom(""));
    }
  }, [dispatch, location.state, location.state.id]);

  if (status === "pending") {
    return <Loading />;
  }
  if (status === "failed") {
    return <div>Network issue</div>;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (isAuth) {
      navigate("/packageBilling", {
        state: { id: location.state.id, belong: location.state.belong },
      });
    } else {
      const data = {
        location: "/singlePackage",
        id: location.state.id,
        belong: location.state.belong,
      };
      localStorage.setItem("location", JSON.stringify(data));
      navigate("/Login");
    }
  };

  return (
    <>
      <div className="singlePackage">
        <div className="singlePackImg">
          <div className="singlePackimgDiv">
            <img src={Exploringpackage?.images[0]} alt="single pack img" />
            <div className="packDetails">
              <h1>{Exploringpackage?.name}</h1>
              <p>
                <i ClassName="fa-solid fa-location-dot"></i>
                {Exploringpackage?.destination}
              </p>
            </div>
          </div>
        </div>
        <div className="singlePackDetails">
          <div className="durationContainer">
            <div>
              <h3>Price</h3>
              <p className="price">
                <i className="fa-solid fa-indian-rupee-sign"></i>
                {Exploringpackage?.price}
              </p>
            </div>
            <div className="Box-in-container">
              <div>
                <i className="fa-regular fa-clock"></i>
              </div>
              <div>
                <h3>Duration</h3>
                <p>
                  {Exploringpackage?.duration.days} days,&nbsp;
                  {Exploringpackage?.duration.nights} nights
                </p>
              </div>
            </div>
            <div className="Box-in-container">
              <div>
                <i className="fa-solid fa-users-line"></i>
              </div>
              <div>
                <h3>Max Peaople</h3>
                <p>5</p>
              </div>
            </div>
            <div className="Box-in-container">
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
              <div>
                <h3>min Age</h3>
                <p>+3</p>
              </div>
            </div>
          </div>
          <div className="packageDescription">
            <div className="descriptionLeft">
              <div className="description">
                <h2>Description</h2>
                <p>{Exploringpackage?.description}</p>
              </div>
              <div className="inclusion-exclusions-cont">
                <h2>Included/Excluded</h2>
                <div className="inclusion-exclusions">
                  <div className="included">
                    <ul>
                      {Exploringpackage?.inclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="excluded">
                    <ul>
                      {Exploringpackage?.exclusions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="tourPlan">
                <h2>Tour plan</h2>
                <ul>
                  {Exploringpackage?.itinerary.split(",").map((item, index) => {
                    return (
                      <>
                        <li key={index}>{item}</li>
                        <i className="fa-solid fa-down-long"></i>
                      </>
                    );
                  })}
                  <li>Finish</li>
                </ul>
              </div>
            </div>
            <div className="descriptionRight">
              <form onSubmit={submitHandler}>
                <h2>Book this Tour</h2>
                <div className="from">
                  <label>From:</label>
                  <input
                    type="date"
                    id="dateInput"
                    min={today}
                    value={from}
                    required
                    onChange={(e) => dispatch(setFrom(e.target.value))}
                  />
                </div>
                <div className="time">
                  <label className="timeLabel">Time</label>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="one"
                        name="name"
                        value="10:00"
                        onChange={(e) => dispatch(setTime(e.target.value))}
                      />
                      <label htmlFor="one">10:00</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="two"
                        name="name"
                        value="18:00"
                        onChange={(e) => dispatch(setTime(e.target.value))}
                      />
                      <label htmlFor="two">18:00</label>
                    </div>
                  </div>
                </div>
                <div className="ticketsContainer">
                  <hr />
                  <h3 className="ticketHeading">Tickets:</h3>
                  <div>
                    <label className="adult">
                      Adult: <h3>{adultsPrice}</h3>
                    </label>
                    <input
                      type="number"
                      id="adults"
                      name="adults"
                      onChange={(e) => dispatch(setAdults(e.target.value))}
                      max="5"
                      min="1"
                      value={adults}
                    />
                  </div>
                  <div>
                    <label className="children">
                      Children: <h3>{childrensPrice}</h3>
                    </label>
                    <input
                      type="number"
                      id="childrens"
                      name="childrens"
                      min="0"
                      max="2"
                      value={childrens}
                      onChange={(e) => dispatch(setChildrens(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="total">
                    <p>Total:</p>
                    <span>
                      <i ClassName="fa-solid fa-indian-rupee-sign"></i>
                      {adultsPrice + +childrensPrice}
                    </span>
                  </div>
                </div>
                <div className="bookNowBtnContainer">
                  <button className="bookNowBtn" type="submit">
                    Book now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SinglePackage;
