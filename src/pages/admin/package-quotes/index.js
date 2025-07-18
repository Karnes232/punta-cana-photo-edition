import { graphql, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import Seo from "../../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
import AdminLayout from "../../../components/Layout/AdminLayout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import LogoutButton from "../../../components/auth/LogoutButton";
import PackageQuoteForm from "../../../components/AdminComponents/PackageQuoteForm";
import { allowedEmails } from "../../../data/allowedEmails";

const Index = ({ data }) => {
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        if (allowedEmails.includes(currentUser.email)) {
          setAdminUser(true);
        }
      } else {
        navigate("/admin/signin");
      }
    });
  }, []);

  return (
    <AdminLayout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <HeroSwiper heroInfo={data.allContentfulPageContent.nodes[0]} />
      <div className="flex flex-col items-center bg-gray-100 p-8 lg:pt-24 -mt-5 md:-mt-10 lg:-mt-20">
        {adminUser ? (
          <PackageQuoteForm
            packages={data.allContentfulPackages.nodes}
            additions={data.allContentfulPackageAdditions.nodes}
            companyInfo={data.allContentfulGeneralLayout.nodes[0]}
          />
        ) : (
          <div className="text-center text-2xl font-bold min-h-[25vh]  flex flex-col justify-center items-center">
            You are not authorized to access this page
          </div>
        )}

        <LogoutButton />
      </div>
    </AdminLayout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en-US" ? `/${language === "es" ? "es" : language}` : "/admin/package-quotes/"}`;

  const schema = data?.allContentfulSeo?.nodes[0]?.schema?.internal?.content;

  let JsonSchema = {};
  if (schema) {
    JsonSchema = JSON.parse(schema);
  }

  return (
    <>
      <Seo
        title={title}
        description={description.description}
        keywords={keywords.join(", ")}
        image={`https:${images.file.url}`}
        url={siteUrl}
        schemaMarkup={JsonSchema}
        language={language === "en-US" ? "en" : language} // Convert to standard HTML lang attribute
      />
      <link rel="canonical" href={siteUrl} />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery($language: String!) {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout(filter: { node_locale: { eq: $language } }) {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
        messengerLink
        rnc
        email
        address
      }
    }
    allContentfulSeo(
      filter: { page: { eq: "Admin" }, node_locale: { eq: $language } }
    ) {
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
        schema {
          internal {
            content
          }
        }
      }
    }
    allContentfulPageContent(
      filter: { page: { eq: "Admin" }, node_locale: { eq: $language } }
    ) {
      nodes {
        page
        heroImageList {
          gatsbyImage(layout: CONSTRAINED, width: 1200, placeholder: NONE, formats: WEBP, quality: 75)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
    allContentfulPackages(
      sort: { price: DESC }
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        price
      }
    }
    allContentfulPackageAdditions(filter: { node_locale: { eq: $language } }) {
      nodes {
        addition
        price
      }
    }
  }
`;
