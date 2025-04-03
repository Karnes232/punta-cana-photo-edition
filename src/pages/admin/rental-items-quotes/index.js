import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../config/firebase";
import { graphql, navigate } from "gatsby";
import AdminLayout from "../../../components/Layout/AdminLayout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import Seo from "../../../components/Layout/seo";
import { useI18next } from "gatsby-plugin-react-i18next";
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
    </AdminLayout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const { language } = useI18next();
  const { title, description, images, keywords } =
    data.allContentfulSeo.nodes[0];
  const siteUrl = `${data.site.siteMetadata.siteUrl}${language !== "en-US" ? `/${language === "es" ? "es" : language}` : "/admin/rental-items-quotes"}`;

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
          gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          title
        }
        fullSize
        heroHeading
        heroHeading2
        sectionTitle
      }
    }
    #   allContentfulPackages(filter: { node_locale: { eq: $language } }) {
    #     nodes {
    #       title
    #       price
    #     }
    #   }
    #   allContentfulPackageAdditions(filter: { node_locale: { eq: $language } }) {
    #     nodes {
    #       addition
    #       price
    #     }
    #   }
  }
`;
