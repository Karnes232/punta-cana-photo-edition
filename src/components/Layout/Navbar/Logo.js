import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const Logo = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allContentfulAsset(
        filter: { title: { eq: "Logo - Punta Cana Photo Edition" } }
      ) {
        nodes {
          title
          gatsbyImage(width: 500, formats: WEBP, placeholder: BLURRED)
        }
      }
    }
  `);
  console.log(data.allContentfulAsset.nodes[0]);
  const image = getImage(data.allContentfulAsset.nodes[0]);
  return (
    <>
      <div className="flex justify-center items-center overflow-hidden">
        <Link to="/" className="no-underline" aria-label="Home">
          <div className="cursor-pointer flex items-center w-20 md:w-20">
            <GatsbyImage
              image={image}
              alt={data.allContentfulAsset.nodes[0].title}
              className="w-20 md:w-32"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Logo;
