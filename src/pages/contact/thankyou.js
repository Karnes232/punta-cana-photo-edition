import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import Seo from "../../components/Layout/seo";

const ThankYou = ({ data }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setName(searchParams.get("name"));
  }, []);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulGeneralLayout.nodes[0]} />
      <main className="">
        <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[50vh]">
          <div className="">
            <div className="flex flex-col justify-center items-center text-slate-600 ">
              <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
                Thank you {name}, our team will reach out to you shortly!
              </div>

              <div className="text-center text-sm xl:text-base mt-2 xl:mt-6">
                Please feel free to{" "}
                <a
                  href={`mailto:${data.allContentfulGeneralLayout.nodes[0].email}`}
                  aria-label="Gmail"
                  rel="noreferrer"
                  className="underline"
                >
                  contact us
                </a>{" "}
                with any questions or concerns.
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ThankYou;

export const Head = ({ data }) => {
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}/thankyou`;

  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images?.file?.url}`}
        url={siteUrl}
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulSeo(filter: { page: { eq: "Contact" } }) {
      nodes {
        title
        keywords
        images {
          file {
            url
          }
        }
        description {
          description
        }
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
