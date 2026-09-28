import { graphql, Link, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import AdminHead from "../../components/Layout/AdminHead";
import { adminHeroInfo } from "../../utils/adminData";
import HeroSwiper from "../../components/HeroSwiper/HeroSwiper";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import AdminLayout from "../../components/Layout/AdminLayout";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "../../components/auth/LogoutButton";
import { allowedEmails } from "../../data/allowedEmails";
import { localizedPath } from "../../utils/siteLocales";
const Index = ({ data }) => {
  const { language } = useI18next();
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
    <AdminLayout generalInfo={data.sanityGeneralLayout}>
      <HeroSwiper
        heroInfo={adminHeroInfo(data.sanityAdminPage, language)}
        language={language}
      />
      <div className="flex flex-col items-center bg-gray-100 p-8 -mt-5 md:-mt-10 lg:-mt-20">
        {adminUser ? (
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 lg:mt-20">
            <h1 className="text-2xl font-bold text-center mb-8">
              Admin Dashboard
            </h1>

            <div className="flex flex-col space-y-4">
              <Link
                to={localizedPath("/admin/package-quotes/", language)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Package Quotes")}
              </Link>

              <Link
                to={localizedPath("/admin/package-contract/", language)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Package Contract")}
              </Link>

              <Link
                to={localizedPath("/admin/rental-items-quotes/", language)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-center transition duration-300"
              >
                {t("Rental Items Quotes")}
              </Link>

              <Link
                to={localizedPath("/admin/rental-items-contract/", language)}
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

export const Head = ({ data, pageContext }) => {
  return (
    <AdminHead
      siteUrl={data.site.siteMetadata.siteUrl}
      path="/admin/"
      language={pageContext.language}
    />
  );
};

export const query = graphql`
  query IndexPageQuery {
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
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      facebook
      instagram
      x
      telephone
      messengerLink
      rnc
      email
      address
      logo {
        asset {
          url
        }
      }
    }
    sanityAdminPage(_id: { eq: "adminPage" }) {
      fullScreenHero
      heroHeading {
        en
        es
      }
      heroImages {
        alt
        asset {
          gatsbyImageData(width: 1200, placeholder: NONE)
        }
      }
    }
  }
`;
