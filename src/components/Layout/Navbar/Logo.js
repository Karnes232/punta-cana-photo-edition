import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useI18next } from "gatsby-plugin-react-i18next";
import { withSizes } from "../../../utils/imageSizes";
import { localizedPath } from "../../../utils/siteLocales";

// Rendered at w-20 (80px), or w-32 (128px) from md up. Without this the
// derived sizes claims 256px, which makes high-DPR devices fetch the 512px
// candidate for an 80px slot.
const LOGO_SIZES = "(min-width: 768px) 128px, 80px";
const Logo = ({ overlay = false }) => {
  const { language } = useI18next();
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allContentfulGeneralLayout {
        nodes {
          logo {
            title
            # Rendered at w-20 (80px) / md:w-32 (128px); 256 covers 2x DPR.
            gatsbyImage(
              width: 256
              formats: WEBP
              placeholder: BLURRED
              quality: 65
            )
          }
        }
      }
    }
  `);
  const image = withSizes(
    getImage(data.allContentfulGeneralLayout.nodes[0].logo.gatsbyImage),
    LOGO_SIZES,
  );
  return (
    <>
      <div
        className={`flex items-center justify-center overflow-hidden ${
          overlay ? "drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]" : ""
        }`}
      >
        <Link
          to={localizedPath("/", language)}
          className="no-underline"
          aria-label={
            language === "pt"
              ? "Início"
              : language === "fr"
                ? "Accueil"
                : language === "es"
                  ? "Inicio"
                  : "Home"
          }
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
