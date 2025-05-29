import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useImageProtection } from "../../hooks/useImageProtection";
import { CartProvider } from "../../context/cart";
import FloatingCartButton from "../FloatingButtonComponents/FloatingCartButton";
import ExpandableMessengerButton from "../FloatingButtonComponents/ExpandableMessengerButton";

const Layout = ({ children, generalInfo }) => {
  useImageProtection();

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
    <CartProvider>
      <div className="min-h-screen font-crimson flex flex-col justify-between bg-primary-bg-color">
        <Navbar />
        <FloatingCartButton />
        <ExpandableMessengerButton
          messengerLink={messengerLink}
          telephone={telephone}
        />
        {children}
        <Footer generalInfo={generalInfo} />
      </div>
    </CartProvider>
  );
};

export default Layout;
