import React from "react";
import { localizedUrl } from "../../utils/siteLocales";

const LocalizedAlternates = ({ rootUrl, path }) => (
  <>
    <link
      rel="alternate"
      hrefLang="en"
      href={localizedUrl(rootUrl, path, "en-US")}
    />
    <link
      rel="alternate"
      hrefLang="es"
      href={localizedUrl(rootUrl, path, "es")}
    />
    <link
      rel="alternate"
      hrefLang="pt-BR"
      href={localizedUrl(rootUrl, path, "pt")}
    />
    <link
      rel="alternate"
      hrefLang="fr-FR"
      href={localizedUrl(rootUrl, path, "fr")}
    />
    <link
      rel="alternate"
      hrefLang="x-default"
      href={localizedUrl(rootUrl, path, "en-US")}
    />
  </>
);

export default LocalizedAlternates;
