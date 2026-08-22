import React from "react";
// Importing the file gives webpack's hashed public URL for the preload below.
import crimsonProLatin from "@fontsource-variable/crimson-pro/files/crimson-pro-latin-wght-normal.woff2";

// Third-party tags injected into the <head> of every statically generated page.
// Google Analytics/Ads are handled separately by gatsby-plugin-google-gtag.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // Crimson Pro is the LCP font (the hero h1 on the home page, the intro
    // copy on /contact/). The CSS is inlined, but the font fetch still waits
    // for that CSS to be parsed and matched, which left ~360ms of LCP render
    // delay. Only the latin subset is preloaded: it is the only one these
    // pages fetch, and preloading Montserrat too would compete with the LCP
    // resource rather than help it. crossOrigin is required for fonts even
    // same-origin, or the preload is discarded and fetched twice.
    <link
      key="preload-crimson-pro-latin"
      rel="preload"
      as="font"
      type="font/woff2"
      href={crimsonProLatin}
      crossOrigin="anonymous"
    />,
    <script
      key="ahrefs-analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="FwoBLKTSAGZTNXoZ73VLUA"
      async
    />,
  ]);
};
