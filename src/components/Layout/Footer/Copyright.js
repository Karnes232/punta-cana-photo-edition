import useSharedContent from "../useSharedContent";
import { safeLink } from "../../../utils/reviewPolicy";
import { Link, useStaticQuery, graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { localizedPath } from "../../../utils/siteLocales";
import { openCookieSettings } from "../../CookieConsent/consent";

const Copyright = ({ companyName, language }) => {
  const { t, content, text, path } = useSharedContent();
  const [date, setDate] = useState(new Date().getFullYear());

  // Queried here rather than threaded through props: generalLayout is selected
  // in 16 page queries plus gatsby-node, so passing it down would mean editing
  // 17 files and would fail silently on any one that was missed. Matches the
  // existing pattern in Layout.js.
  const data = useStaticQuery(graphql`
    query {
      sanityGeneralLayout(_id: { eq: "generalLayout" }) {
        legalName
        rnc
      }
    }
  `);
  const { legalName, rnc } = data.sanityGeneralLayout ?? {};

  return (
    <div className="w-full py-4">
      <div className="flex flex-col gap-1 xl:flex-row xl:justify-start xl:gap-10 w-full">
        <div className="flex flex-col gap-1">
          <Link to={path(content.homePath)}>
            <p className="tracking-wider cursor-pointer text-slate-600">
              {t("All content Copyright")} &copy; {date} {companyName}
            </p>
          </Link>
        </div>
        {/* Deliberately outside the Link: the registration number should not be
          a clickable link to the homepage. */}
        {legalName && rnc && (
          <p className="tracking-wider text-slate-600">
            {legalName} &middot; {t("RNC")} {rnc}
          </p>
        )}
      </div>
      {/* The legal links and the credit get their own lines, so the copyright row
        never has to squeeze. */}
      <nav
        aria-label={t("Legal")}
        className="mt-4 flex flex-wrap gap-x-5 gap-y-2 tracking-wider text-slate-600"
      >
        {content.legalLinks.map((link) => (
          <Link
            key={link._key}
            to={path(link.url)}
            className="hover:text-orange-500"
          >
            {text(link.label)}
          </Link>
        ))}
        <button
          type="button"
          onClick={openCookieSettings}
          className="tracking-wider hover:text-orange-500"
        >
          {t("Cookie settings")}
        </button>
      </nav>
      {/* Last line, on its own. */}
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-600">
        {t("Built by")}
        {/* DR Web Studio's site has only English and Spanish. */}
        <a
          href={
            safeLink(text(content.creditUrl))
              ? text(content.creditUrl)
              : undefined
          }
          className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={content.creditLogoUrl}
            alt={text(content.creditLogoAlt)}
            className="h-4"
            width="17"
            height="16"
            loading="lazy"
          />
          {text(content.creditName)}
        </a>
        <span className="hidden md:inline"> —</span>
        {t("Web Development in the Dominican Republic")}
      </p>
    </div>
  );
};

export default Copyright;
