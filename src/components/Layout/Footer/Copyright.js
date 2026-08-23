import { Link, useStaticQuery, graphql } from "gatsby";
import React, { useEffect, useState } from "react";

const Copyright = ({ companyName, language }) => {
  const [date, setDate] = useState(new Date().getFullYear());
  // useEffect(() => {
  //   setDate(new Date().getFullYear());
  // }, []);

  // Queried here rather than threaded through props: generalLayout is selected
  // in 16 page queries plus gatsby-node, so passing it down would mean editing
  // 17 files and would fail silently on any one that was missed. Matches the
  // existing pattern in Layout.js.
  const data = useStaticQuery(graphql`
    query {
      allContentfulGeneralLayout {
        nodes {
          legalName
          rnc
        }
      }
    }
  `);
  const { legalName, rnc } = data.allContentfulGeneralLayout.nodes[0] ?? {};

  return (
    <div className=" flex flex-col xl:flex-row justify-between xl:gap-10 py-4 w-full">
      <div className="flex flex-col gap-1">
        <Link to={language === "es" ? "/es/" : "/"}>
          <p className="tracking-wider cursor-pointer text-slate-400">
            All content Copyright &copy; {date} {companyName}
          </p>
        </Link>
      </div>
      {/* Deliberately outside the Link: the registration number should not be
          a clickable link to the homepage. */}
      {legalName && rnc && (
        <p className="tracking-wider text-slate-400">
          {legalName} &middot; RNC {rnc}
        </p>
      )}
      <p className="text-slate-400 flex flex-col md:flex-row items-center gap-2 lg:flex-1 lg:justify-start  mt-5 lg:mt-0">
        {language === "es" ? "Desarrollado por" : "Built by"}
        <a
          href={
            language === "es"
              ? "https://www.dr-webstudio.com/es"
              : "https://www.dr-webstudio.com/en"
          }
          className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          {/* Sanity's CDN transcodes on request. The source is a 512x487 PNG
              (328 KB) but this renders at 17x16, so ask for webp at ~4x the
              render width: 2.2 KB instead. */}
          <img
            src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png?fm=webp&q=80&w=64"
            alt="DR Web Studio logo"
            className="h-4"
            width="17"
            height="16"
            loading="lazy"
          />
          DR Web Studio
        </a>
        <span className="hidden lg:inline"> —</span>
        {language === "es"
          ? "Desarrollo Web en República Dominicana"
          : "Web Development in the Dominican Republic"}
      </p>
    </div>
  );
};

export default Copyright;
