import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AdminHead from "../../../components/Layout/AdminHead";
import {
  adminAdditions,
  adminHeroInfo,
  adminPackages,
} from "../../../utils/adminData";
import { auth } from "../../../config/firebase";
import { graphql, navigate } from "gatsby";
import AdminLayout from "../../../components/Layout/AdminLayout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import { useI18next } from "gatsby-plugin-react-i18next";
import { allowedEmails } from "../../../data/allowedEmails";
import LogoutButton from "../../../components/auth/LogoutButton";
import PackageContractForm from "../../../components/AdminComponents/PackageContractForm";

const Index = ({ data }) => {
  const { language } = useI18next();
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
      <div className="flex flex-col items-center bg-gray-100 p-8 lg:pt-24 -mt-5 md:-mt-10 lg:-mt-20">
        {adminUser ? (
          <PackageContractForm
            packages={adminPackages(data, language)}
            additions={adminAdditions(data, language)}
            companyInfo={data.sanityGeneralLayout}
          />
        ) : (
          <div className="text-center text-2xl font-bold min-h-[25vh] flex flex-col justify-center items-center">
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
      path="/admin/package-contract/"
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
      companyStamp {
        asset {
          url
        }
      }
      signature {
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
    allSanityProposalPackagePage(filter: { language: { in: ["en", "es"] } }) {
      nodes {
        language
        name
        package {
          price
        }
      }
    }
    allSanityElopementPage(filter: { language: { in: ["en", "es"] } }) {
      nodes {
        language
        experiences {
          title
          option {
            price
          }
        }
      }
    }
    allSanityProposalAddOn {
      nodes {
        _id
        name
        price
      }
    }
    allSanityProposalPackageTexts(filter: { language: { in: ["en", "es"] } }) {
      nodes {
        language
        addOnNames {
          name
          addOn {
            _id
          }
        }
      }
    }
  }
`;
