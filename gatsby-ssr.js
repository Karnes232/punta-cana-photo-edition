import React from "react";

// Third-party tags injected into the <head> of every statically generated page.
// Google Analytics/Ads are handled separately by gatsby-plugin-google-gtag.
//
// Deliberately no font preload here. One was tried and measurably hurt: the
// fontsource CSS sets font-display: swap, so text paints immediately in the
// fallback and the webfont was never on the critical path. Preloading it just
// put 48 KB at top priority ahead of the hero image on a slow connection,
// costing ~1.4s of FCP and pushing LCP from 2.7s to 6.0s.
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
