import React, { Suspense, lazy, useEffect } from "react";
import Loading from "../components/common/Loading";
const HotelSearch = lazy(() => import("../components/Hotels/HotelSearch"));

function HotelPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <HotelSearch />
      </Suspense>
    </div>
  );
}

export default HotelPage;
