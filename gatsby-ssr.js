import React from "react";

// Third-party tags injected into the <head> of every statically generated page.
// Google Analytics/Ads are handled separately by gatsby-plugin-google-gtag.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="ahrefs-analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="FwoBLKTSAGZTNXoZ73VLUA"
      async
    />,
  ]);
};
