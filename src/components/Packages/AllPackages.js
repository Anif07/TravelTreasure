import React, { useEffect, useState } from "react";
import "../../styles/packages/allPackages.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIndianPackages,
  fetchInternationalPackages,
  setId,
  setInternationalId,
  setuptoIndia,
  setuptoIndiatoInitial,
  setuptoInternational,
  setuptoInternationalInital,
} from "../../redux/slices/AllPackagesSlice";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";
import NetworkError from "../common/NetworkError";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AllPackages() {
  const dispatch = useDispatch();
  const [isFavourite, setISFavourite] = useState([]);
  const {
    indianPackages,
    status,
    internationalPackages,
    internationalStatus,
    uptoIndia,
    uptoInternational,
  } = useSelector((state) => state.AllPackages);
  const navigate = useNavigate();

  console.log(indianPackages);

  useEffect(() => {
    dispatch(fetchIndianPackages());
    dispatch(fetchInternationalPackages());
  }, []);

  const ExploreHandler = (id) => {
    dispatch(setId(id));
    navigate("/singlePackage", { state: { id: id, belong: "india" } });
  };
  const internationalExploreHandler = (id) => {
    dispatch(setInternationalId(id));
    navigate("/singlePackage", { state: { id: id, belong: "international" } });
  };

  const toggleFavourite = (id) => {
    setISFavourite((prevFavourites) =>
      prevFavourites.includes(id)
        ? prevFavourites.filter((favid) => favid !== id)
        : [...prevFavourites, id]
    );
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "failed") {
    return <NetworkError />;
  }
  return (
    <>
      <div className="indiaPackages">
        <h1 className="packageHeading">
          India Tour packages
          <hr />
        </h1>

        <div className="packages">
          {indianPackages.slice(0, uptoIndia).map((obj, index) => (
            <div className="Package" key={obj?.id}>
              <div className="packImg-Container">
                {/* <img src={obj.images[0]} alt="" /> */}
                <LazyLoadImage
                  src={obj?.images[0]}
                  alt="package"
                  effect="blur"
                />
                {/* <div
                  className="favourites"
                  onClick={() => toggleFavourite(obj.id)}
                >
                  {isFavourite.includes(obj.id) ? (
                    <i className="fa-solid fa-heart redFav"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </div> */}
              </div>
              <div className="package-name-cont">
                <h2>{obj?.name}</h2>
                <p>
                  <i className="fa-solid fa-location-dot locIcon"></i>
                  {obj?.destination}
                </p>
                <hr />

                <div className="price-explore">
                  <p>
                    Price
                    <br />
                    <span className="price">
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      {obj.price}
                    </span>
                  </p>
                  <button
                    className="exploreBtn"
                    onClick={() => {
                      ExploreHandler(obj.id);
                    }}
                  >
                    Explore<i className="fa-solid fa-arrow-right icon"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {uptoIndia === 8 ? (
          <div className="readMoreBtnCont">
            <button onClick={() => dispatch(setuptoIndia())}>
              See More <i ClassName="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        ) : (
          <div className="readMoreBtnCont">
            <button onClick={() => dispatch(setuptoIndiatoInitial())}>
              See less <i ClassName="fa-solid fa-chevron-up"></i>
            </button>
          </div>
        )}
      </div>

      <div className="indiaPackages">
        <h1 className="packageHeading">
          International Tour packages
          <hr />
        </h1>

        <div className="packages">
          {internationalPackages
            .slice(0, uptoInternational)
            .map((obj, index) => (
              <div className="Package" key={obj.id}>
                <div className="packImg-Container">
                  <img src={obj.images[0]} alt="" />
                </div>
                <div className="package-name-cont">
                  <h2>{obj.name}</h2>
                  <p>
                    <i className="fa-solid fa-location-dot locIcon"></i>
                    {obj.destination}
                  </p>
                  <hr />

                  <div className="price-explore">
                    <p>
                      Price
                      <br />
                      <span className="price">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {obj.price}
                      </span>
                    </p>
                    <button
                      className="exploreBtn"
                      onClick={() => internationalExploreHandler(obj.id)}
                    >
                      Explore<i className="fa-solid fa-arrow-right icon"></i>
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            ))}
        </div>
        {uptoInternational === 8 ? (
          <div className="readMoreBtnCont">
            <button onClick={() => dispatch(setuptoInternational())}>
              See More <i ClassName="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        ) : (
          <div className="readMoreBtnCont">
            <button onClick={() => dispatch(setuptoInternationalInital())}>
              See Less <i ClassName="fa-solid fa-chevron-up"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AllPackages;
