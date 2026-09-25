import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ExpandableMessengerButton from "../FloatingButtonComponents/ExpandableMessengerButton";

const Layout = ({ children, generalInfo, overlayHeader = false }) => {
  const data = useStaticQuery(graphql`
    query {
      sanityGeneralLayout(_id: { eq: "generalLayout" }) {
        messengerLink
        telephone
      }
    }
  `);

  const { messengerLink, telephone } = data.sanityGeneralLayout ?? {};

  return (
    <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
      <Navbar overlay={overlayHeader} />
      <ExpandableMessengerButton
        messengerLink={messengerLink}
        telephone={telephone}
      />
      {children}
      <Footer generalInfo={generalInfo} />
    </div>
  );
};

export default Layout;
