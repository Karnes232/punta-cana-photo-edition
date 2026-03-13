import React from "react";
import WeddingPlannerPackageCard from "./WeddingPlannerPackageCard";

const OurPackages = ({ weddingPackages }) => {
  const sortedPackages = React.useMemo(() => {
    const mostPopular = weddingPackages.find((pkg) => pkg.mostPopular);
    const regularPackages = weddingPackages.filter((pkg) => !pkg.mostPopular);

    if (!mostPopular) return weddingPackages;

    // For mobile: most popular first
    // For desktop: most popular in middle (index 1)
    return [regularPackages[0], mostPopular, regularPackages[1]];
  }, [weddingPackages]);
  return (
    <div className="w-full mt-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedPackages.map((packageData) => (
          <WeddingPlannerPackageCard
            key={packageData.title}
            packageData={packageData}
          />
        ))}
      </div>
    </div>
  );
};

export default OurPackages;
