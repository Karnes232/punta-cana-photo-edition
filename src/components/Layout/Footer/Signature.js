import React from "react";
import { StaticImage } from "gatsby-plugin-image";
const Signature = () => {
  return (
    <>
      <div className="signature hidden">
        <StaticImage
          src="../../../images/signature.png"
          alt="James Karnes"
          className="fixed bottom-5 right-10 w-48"
        />
      </div>
    </>
  );
};

export default Signature;
