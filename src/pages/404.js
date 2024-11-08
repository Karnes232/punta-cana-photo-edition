import * as React from "react";
import { graphql, Link } from "gatsby";

import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import Layout from "../components/Layout/Layout";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};

const NotFoundPage = ({ data }) => {
  return (
    <>
      <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
        <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
        <main
          style={pageStyles}
          className="min-h-[50vh] flex flex-col items-center justify-center"
        >
          <h1 style={headingStyles} className="text-left w-full">
            Page not found
          </h1>
          <p style={paragraphStyles}>
            Sorry 😔, we couldn’t find what you were looking for.
            <br />
            {process.env.NODE_ENV === "development" ? (
              <>
                <br />
                Try creating a page in{" "}
                <code style={codeStyles}>src/pages/</code>.
                <br />
              </>
            ) : null}
            <br />
            <Link to="/">Go home</Link>.
          </p>
        </main>
      </Layout>
    </>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        email
        instagram
        x
        telephone
        heroImageList {
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
      }
    }
  }
`;
