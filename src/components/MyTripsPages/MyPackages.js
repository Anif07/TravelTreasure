import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePackage,
  fetchPackages,
} from "../../redux/slices/myTrips/MyTripsSlice";
import { useNavigate } from "react-router";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";

function MyPackages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myPackages, packageStatus } = useSelector((state) => state.MyTrips);
  console.log(myPackages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const checkingPackageAgain = (id, belong) => {
    navigate("/singlePackage", { state: { id: id, belong: belong } });
  };

  const deletePackageHandler = (id) => {
    dispatch(deletePackage(id));
  };

  const handleExplorePackages = () => {
    navigate("/packages");
  };

  if (packageStatus === "pending") {
    return <Loading />;
  }
  if (packageStatus === "failed") {
    return <NetworkError />;
  }
  if (myPackages.length === 0) {
    return (
      <div className="noBookingPackages">
        <h2>No packages booked</h2>
        <p>
          It looks like you haven't booked any packages yet. Explore our
          exciting packages and book your next adventure!
        </p>
        <button onClick={handleExplorePackages} className="explorePackages">
          Explore Packages
        </button>
      </div>
    );
  }
  return (
    <div className="myPackages">
      {myPackages.map((obj, index) => (
        <div key={index} className="packageContainer">
          <div
            className="mypackageImgContainer"
            onClick={() => checkingPackageAgain(obj.id, obj.belong)}
          >
            <img src={obj.img} alt="my pack" />
          </div>
          <div className="myPackageDetails">
            <h3>{obj.name}</h3>
            <p>{obj.destination}</p>
            <span>
              Price: <i classN="fa-solid fa-indian-rupee-sign"></i>
              {obj.totalPrice}
            </span>
            <div className="cancelPackage">
              <button onClick={() => deletePackageHandler(obj.id)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(MyPackages);
