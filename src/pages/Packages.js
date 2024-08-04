import React, { Suspense, lazy, useEffect } from "react";

import Footer from "../components/Home/Footer";
import Loading from "../components/common/Loading";
const AllPackagesComponent = lazy(() =>
  import("../components/Packages/AllPackages")
);
const PackageSearchComponent = lazy(() =>
  import("../components/Packages/PackageSearch")
);

const MemoizedAllPackages = React.memo(AllPackagesComponent);
const MemoizedPackageSearch = React.memo(PackageSearchComponent);

function Packages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MemoizedPackageSearch />
        <MemoizedAllPackages />
      </Suspense>
      <Footer />
    </div>
  );
}

export default Packages;
