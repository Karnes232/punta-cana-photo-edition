import { graphql, Link, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import Seo from "../../components/Layout/seo";
import AdminLayout from "../../components/Layout/AdminLayout";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "../../components/auth/LogoutButton";
import { allowedEmails } from "../../data/allowedEmails";
const Index = ({ data }) => {
  const { t } = useTranslation();
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
      <div className="flex flex-col items-center bg-gray-100 p-8 -mt-5 md:-mt-10 lg:-mt-20">
        {adminUser ? (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 lg:mt-20">
            <h1 className="text-2xl font-bold text-center mb-8">
              Admin Dashboard
            </h1>

            <div className="flex flex-col space-y-4">
              <Link
                to="/admin/package-quotes"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Package Quotes")}
              </Link>

              <Link
                to="/admin/package-contract"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Package Contract")}
              </Link>

              <Link
                to="/admin/rental-items-quotes"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Rental Items Quotes")}
              </Link>

              <Link
                to="/admin/rental-items-contract"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Rental Items Contract")}
              </Link>
            </div>
          </div>
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
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en-US" ? `/${language === "es" ? "es" : language}` : "/admin"}`;

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
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        instagram
        x
        telephone
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
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
  }
`;
