import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const Logo = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allContentfulGeneralLayout {
        nodes {
          logo {
            title
            gatsbyImage(width: 500, formats: WEBP, placeholder: BLURRED)
          }
        }
      }
    }
  `);
  const image = getImage(
    data.allContentfulGeneralLayout.nodes[0].logo.gatsbyImage,
  );
  return (
    <>
      <div className="flex justify-center items-center overflow-hidden">
        <Link to="/" className="no-underline" aria-label="Home">
          <div className="cursor-pointer flex items-center w-20 md:w-20">
            <GatsbyImage
              image={image}
              alt={data.allContentfulGeneralLayout.nodes[0].logo.title}
              className="w-20 md:w-32"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Logo;
