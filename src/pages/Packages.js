import React, { Suspense, lazy } from "react";

import Footer from "../components/Home/Footer";
const AllPackagesComponent = lazy(() =>
  import("../components/Packages/AllPackages")
);
const PackageSearchComponent = lazy(() =>
  import("../components/Packages/PackageSearch")
);

const MemoizedAllPackages = React.memo(AllPackagesComponent);
const MemoizedPackageSearch = React.memo(PackageSearchComponent);

function Packages() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MemoizedPackageSearch />
        <MemoizedAllPackages />
      </Suspense>
      <Footer />
    </div>
  );
}

export default Packages;
