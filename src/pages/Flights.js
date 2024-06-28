import React, { Suspense, lazy } from "react";
import Loading from "../components/common/Loading";

const FlightsSearch = lazy(() => import("../components/Flights/FlightsSearch"));
const Footer = lazy(() => import("../components/Home/Footer"));

function Flights() {
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
