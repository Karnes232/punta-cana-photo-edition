import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useI18next } from "gatsby-plugin-react-i18next";
const Logo = ({ overlay = false }) => {
  const { language } = useI18next();
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allContentfulGeneralLayout {
        nodes {
          logo {
            title
            # Rendered at w-20 (80px) / md:w-32 (128px); 256 covers 2x DPR.
            gatsbyImage(width: 256, formats: WEBP, placeholder: BLURRED)
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
      <div
        className={`flex items-center justify-center overflow-hidden ${
          overlay ? "drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]" : ""
        }`}
      >
        <Link
          to={language === "es" ? "/es/" : "/"}
          className="no-underline"
          aria-label={language === "es" ? "Inicio" : "Home"}
        >
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
