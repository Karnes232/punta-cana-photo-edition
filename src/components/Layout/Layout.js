import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ExpandableMessengerButton from "../FloatingButtonComponents/ExpandableMessengerButton";
import { useI18next } from "gatsby-plugin-react-i18next";

const Layout = ({ children, generalInfo, overlayHeader = false }) => {
  const { language } = useI18next();
  const data = useStaticQuery(graphql`
    query {
      allContentfulGeneralLayout {
        nodes {
          messengerLink
          telephone
        }
      }
    }
  `);

  const { messengerLink, telephone } = data.allContentfulGeneralLayout.nodes[0];

  return (
    <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
      <Navbar overlay={overlayHeader} />
      <ExpandableMessengerButton
        messengerLink={messengerLink}
        telephone={telephone}
        language={language}
      />
      {children}
      <Footer generalInfo={generalInfo} />
    </div>
  );
};

export default Layout;
