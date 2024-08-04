import React, { Suspense, lazy, useEffect } from "react";
import Loading from "../components/common/Loading";

const FlightsSearch = lazy(() => import("../components/Flights/FlightsSearch"));
const Footer = lazy(() => import("../components/Home/Footer"));

function Flights() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <FlightsSearch />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Flights;
