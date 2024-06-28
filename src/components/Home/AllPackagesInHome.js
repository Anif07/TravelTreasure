import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "../../styles/homePage/AllPackagesInHome.css";
import "../../styles/homePage/AllPackagesInHome.css";
import { useNavigate } from "react-router";
import Loading from "../common/Loading";
import NetworkError from "../common/NetworkError";
import {
  fetchIndianPackages,
  fetchInternationalPackages,
} from "../../redux/slices/Home/HomePackagesSlice";

function AllPackagesInHome() {
  const dispatch = useDispatch();
  const { indianPackages, status, internationalPackages } = useSelector(
    (state) => state.HomePackages
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchIndianPackages());
  //   dispatch(fetchInternationalPackages());
  // }, [dispatch]);

  const ExploreHandler = ({ id, belong }) => {
    navigate("/singlePackage", { state: { id: id, belong: "india" } });
  };
  const internationalExploreHandler = ({ id, belong }) => {
    navigate("/singlePackage", { state: { id: id, belong: "international" } });
  };

  // if (status === "loading") {
  //   return <Loading />;
  // }
  // if (status === "failed") {
  //   return <NetworkError />;
  // }
  return (
    <>
      <div className="homeIndiaPackages">
        <div className="homePack">
          <h1>Top India Destinations</h1>
          <div className="grid1">
            <div
              className="homePackageImgContainer"
              onClick={() => {
                ExploreHandler({ id: 1, belong: "india" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718694349/pexels-sudipta-1603650_jotcs6.jpg"
                alt="package"
              />
              <h2 className="location">New Delhi</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                ExploreHandler({ id: 6, belong: "india" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718782385/madurai_zum7q6.jpg"
                alt="package"
              />
              <h2 className="location">Madurai</h2>
            </div>
          </div>
          <div className="grid2">
            <div
              className="homePackageImgContainer"
              onClick={() => {
                ExploreHandler({ id: 2, belong: "india" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718710831/pexels-asadphoto-1450360_qytidm.jpg"
                alt="package"
              />
              <h2 className="location">Goa</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                ExploreHandler({ id: 3, belong: "india" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718727116/pexels-swastikarora-19743480_pphkmv.jpg"
                alt="package"
              />
              <h2 className="location">Alleppey, Kumarakom</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                ExploreHandler({ id: 4, belong: "india" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718727197/pexels-utkarsh-636258668-18446898_sx3isc.jpg"
                alt="package"
              />
              <h2 className="location">Rajastan</h2>
            </div>
          </div>
        </div>
      </div>

      {/* International destinations */}
      <div className="homeIndiaPackages">
        <div className="homePack">
          <h1>Top International Destinations</h1>
          <div className="grid1">
            <div
              className="homePackageImgContainer"
              onClick={() => {
                internationalExploreHandler({ id: 1, belong: "international" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718863653/pexels-pixabay-532826_sts6i6.jpg"
                alt="package"
              />
              <h2 className="location">Paris</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                internationalExploreHandler({ id: 2, belong: "international" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718863695/pexels-pixabay-161401_zfrdok.jpg"
                alt="package"
              />
              <h2 className="location">Japan</h2>
            </div>
          </div>
          <div className="grid2">
            <div
              className="homePackageImgContainer"
              onClick={() => {
                internationalExploreHandler({ id: 3, belong: "international" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718864033/pexels-pixelcop-1878293_azbzlp.jpg"
                alt="package"
              />
              <h2 className="location">Australia</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                internationalExploreHandler({ id: 4, belong: "international" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718881232/pexels-manuel-1422884-2949825_fsctbg.jpg"
                alt="package"
              />
              <h2 className="location">Africa</h2>
            </div>
            <div
              className="homePackageImgContainer"
              onClick={() => {
                internationalExploreHandler({ id: 5, belong: "international" });
              }}
            >
              <img
                src="https://res.cloudinary.com/dsysrrxod/image/upload/v1718881249/pexels-pixabay-460376_nogaiz.jpg"
                alt="package"
              />
              <h2 className="location">Thailand</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPackagesInHome;
