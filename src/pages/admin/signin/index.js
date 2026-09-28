import { graphql, navigate } from "gatsby";
import React, { useEffect } from "react";
import AdminHead from "../../../components/Layout/AdminHead";
import { adminHeroInfo } from "../../../utils/adminData";
import { useI18next } from "gatsby-plugin-react-i18next";
import AdminLayout from "../../../components/Layout/AdminLayout";
import HeroSwiper from "../../../components/HeroSwiper/HeroSwiper";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
const Index = ({ data }) => {
  const { language } = useI18next();
  const provider = new GoogleAuthProvider();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        navigate("/admin/");
      }
    });
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // // The signed-in user info.
          // const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AdminLayout generalInfo={data.sanityGeneralLayout}>
      <HeroSwiper
        heroInfo={adminHeroInfo(data.sanityAdminPage, language)}
        language={language}
      />
      <button
        className="flex justify-center items-center px-5 py-2 gap-4 border rounded-lg w-full max-w-4xl mx-auto"
        onClick={signIn}
      >
        <FcGoogle className="text-2xl" /> Sign in with Google
      </button>
    </AdminLayout>
  );
};

export default Index;

export const Head = ({ data, pageContext }) => {
  return (
    <AdminHead
      siteUrl={data.site.siteMetadata.siteUrl}
      path="/admin/signin/"
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
