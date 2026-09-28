import React from "react";
import Seo from "./seo";

// The <head> of every /admin page: a fixed title, kept out of search engines.
// `path` is the page's path without the language prefix, e.g. "/admin/signin/".
const AdminHead = ({ siteUrl, path, language }) => {
  const isSpanish = language === "es";
  const url = `${siteUrl.replace(/\/$/, "")}${isSpanish ? "/es" : ""}${path}`;
  const title = isSpanish ? "Administración" : "Admin";

  return (
    <>
      <Seo
        title={title}
        description={title}
        url={url}
        language={isSpanish ? "es" : "en"}
      />
      <link rel="canonical" href={url} />
      <meta name="robots" content="noindex,nofollow" />
    </>
  );
};

export default AdminHead;
