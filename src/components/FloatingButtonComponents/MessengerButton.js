import React from "react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useStaticQuery, graphql } from "gatsby";
const MessengerButton = () => {
  const data = useStaticQuery(graphql`
    query messengerQuery {
      allContentfulGeneralLayout {
        nodes {
          messengerLink
        }
      }
    }
  `);
  console.log(data.allContentfulGeneralLayout.nodes[0].messengerLink);
  return (
    <>
      <a
        href={data.allContentfulGeneralLayout.nodes[0].messengerLink}
        aria-label="Messenger"
        rel="noreferrer"
        target="_blank"
      >
        <button className="fixed z-[500] flex px-2 justify-center items-center bottom-6 right-6 xl:right-10 rounded-full h-14 w-14 bg-transparent text-[#007FFF]">
          <FaFacebookMessenger size={32} />
        </button>
      </a>
    </>
  );
};

export default MessengerButton;
