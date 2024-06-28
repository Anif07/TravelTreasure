import React, { Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const HotelSearch = lazy(() => import("../components/Hotels/HotelSearch"));

function HotelPage() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <HotelSearch />
      </Suspense>
    </div>
  );
}

export default HotelPage;
