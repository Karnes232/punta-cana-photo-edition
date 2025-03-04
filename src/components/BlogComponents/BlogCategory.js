import React from "react";
import { Link } from "gatsby";
import useWindowWidth from "../../hooks/useWindowWidth";

const BlogCategory = ({ title, gImage, url }) => {
  const windowWidth = useWindowWidth();
  let image = gImage?.gatsbyImage?.images?.fallback?.srcSet.split(",");
  const imageSrc = [];
  image?.forEach((element) => {
    const image = element.split(" ");
    const imageObject = { imageSrc: image[0], imageWidth: image[1] };
    imageSrc.push(imageObject);
  });
  let HeroStyles = {};
  if (windowWidth < 1500) {
    HeroStyles = {
      backgroundImage:
        "linear-gradient(45deg, rgba(245, 246, 252, 0.2), rgba(0, 0, 0, 0.6)), url(" +
        imageSrc[1]?.imageSrc +
        ")",
    };
  } else {
    HeroStyles = {
      backgroundImage:
        "linear-gradient(45deg, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 0.53)), url(" +
        imageSrc[2]?.imageSrc +
        ")",
    };
  }
  return (
    <>
      <Link to={`/blog/${url}`}>
        <div className="w-80 h-60 mx-auto my-5 rounded-lg overflow-hidden shadow-lg">
          <div
            className={`h-full bg-center bg-no-repeat bg-cover`}
            style={HeroStyles}
          >
            <h1
              translate="no"
              className="relative inline-block text-center text-white z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-yellowtail tracking-widest text-3xl md:text-4xl"
            >
              {title}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCategory;
