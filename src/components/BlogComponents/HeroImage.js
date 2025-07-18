import React, { useEffect, useRef, useState } from "react";
import HeroComponent from "./HeroComponent";
import PhotoGrid from "./PhotoGrid";

const HeroImage = ({ backgroundImages }) => {
  const gridRef = useRef(null);
  const [gridHeight, setGridHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (gridRef.current) {
        setGridHeight(gridRef.current.offsetHeight - 100);
      }
    };

    // Create a ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateHeight);

    // Wait for images to load
    const images = gridRef.current?.getElementsByTagName("img");
    if (images?.length) {
      Promise.all(
        Array.from(images).map(
          (img) =>
            img.complete ||
            new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            }),
        ),
      ).then(updateHeight);
    }

    // Start observing the grid element
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <>
      <div className="absolute top-0 w-full h-[55vh] xl:h-[65vh]">
        <div className="md:hidden">
          {/* <HeroComponent gImage={backgroundImages[0].gatsbyImage} backgroundImages={backgroundImages[0].url}/> */}
          <HeroComponent backgroundImages={backgroundImages[0].url}/>
        </div>
        <div className="hidden md:flex mx-auto" ref={gridRef}>
          <PhotoGrid tourPhotos={backgroundImages} />
          <div style={{ height: `${gridHeight}px` }}></div>
        </div>
      </div>
      <div className={`h-[calc(55vh-6rem)] md:hidden`}></div>
      <div
        className="hidden md:block"
        style={{ height: `${gridHeight}px` }}
      ></div>
    </>
  );
};

export default HeroImage;
