import React, { useState } from "react";
import "../../styles/packages/packageSearch.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setId,
  setSearchStatus,
} from "../../redux/slices/AllPackagesSlice";
import { useNavigate } from "react-router";

function PackageSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localDestination, setLocalDestination] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const { indianPackages, searchStatus, destination } = useSelector(
    (state) => state.AllPackages
  );

  const filteredPackages = indianPackages.filter((obj) =>
    obj.destination.toLowerCase().includes(destination.toLowerCase())
  );

  const packageSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(setDestination(localDestination));
    dispatch(setSearchStatus());
    setHasSearched(true);
  };

  const ExploreHandler = (id) => {
    dispatch(setId(id));
    navigate("/singlePackage", { state: { id: id, belong: "india" } });
  };

  return (
    <div>
      <div className="packageBackgroundImg">
        <img
          src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718696207/packagesSearchImg_sp7e26.jpg"
          alt="backGround"
        />
        <h1>Packages</h1>
      </div>
      <div className="searchContainer">
        <form className="form" onSubmit={packageSubmitHandler}>
          <div>
            <label htmlFor="location">
              <i className="fa-solid fa-location-dot packSearchIcon"></i>
            </label>
            <input
              list="locations"
              id="location"
              name="locations"
              placeholder="Destinations"
              onChange={(e) => setLocalDestination(e.target.value)}
            />
            <datalist id="locations">
              <option value="Goa" />
            </datalist>
          </div>
          <div>
            <label htmlFor="date">
              <i className="fa-solid fa-calendar-days packSearchIcon"></i>
            </label>
            <input type="date" id="date" name="date" min={today} />
          </div>
          <div>
            <label htmlFor="noOfPersons">
              <i className="fa-solid fa-user packSearchIcon"></i>
            </label>
            <input
              type="number"
              id="noOfPersons"
              name="noOfPersons"
              placeholder="Persons"
            />
          </div>
          <div className="searchBtnContainer">
            <button type="submit" className="searchBtn">
              <i className="fa-solid fa-magnifying-glass"></i>Search
            </button>
          </div>
        </form>
      </div>
      <div className="searchedResults">
        {searchStatus === "searched" &&
          destination !== "" &&
          filteredPackages.length !== 0 && <h1>Searched Results</h1>}
        {searchStatus === "searched" &&
        destination !== "" &&
        filteredPackages.length !== 0 ? (
          <div className="packages">
            {filteredPackages.map((obj, index) => (
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
                      onClick={() => {
                        ExploreHandler(obj.id);
                      }}
                    >
                      Explore<i className="fa-solid fa-arrow-right icon"></i>
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            ))}
          </div>
        ) : (
          hasSearched && (
            <div className="noPackagesFound">
              <h1>No Packages Found</h1>
              <p>
                We couldn't find any travel packages matching your search
                criteria. Please try adjusting your search or explore some of
                our popular packages.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default React.memo(PackageSearch);
