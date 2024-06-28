import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/Home/HeroSection";
import Services from "../components/Home/services";
import Footer from "../components/Home/Footer";
import AllPackagesInHome from "../components/Home/AllPackagesInHome";
import TravellerPhotos from "../components/Home/travellerPhotos";

function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <AllPackagesInHome />
      <Services />
      <TravellerPhotos />
      <Footer />
    </div>
  );
}

export default HomePage;
