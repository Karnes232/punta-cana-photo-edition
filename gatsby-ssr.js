import React from "react";

const googleTagBootstrap = `
(function () {
  var GA_ID = "G-QTDC0PBVYX";
  var ADS_ID = "AW-473253666";
  var STORAGE_KEY = "sertuin_consent_v1";
  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
  var level = stored && stored.level;
  var analyticsGranted = level === "all" || level === "analytics";
  var adsGranted = level === "all";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: adsGranted ? "granted" : "denied",
    ad_user_data: adsGranted ? "granted" : "denied",
    ad_personalization: adsGranted ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", true);

  window.__sertuinLoadGoogleTag = window.__sertuinLoadGoogleTag || function () {
    if (document.querySelector('script[data-sertuin-google-tag="true"]')) return;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    script.setAttribute("data-sertuin-google-tag", "true");
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_update: true
    });
    window.gtag("config", ADS_ID, {
      send_page_view: false,
      allow_ad_personalization_signals: false
    });
  };

  var privacySignal = navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === "1" || window.doNotTrack === "1";
  if (analyticsGranted || adsGranted || (!level && !privacySignal)) {
    window.__sertuinLoadGoogleTag();
  }
})();
`;

// Consent defaults are established before Google loads. Ahrefs is loaded later
// by ConsentManager only after the visitor permits analytics.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="sertuin-google-tag-bootstrap"
      dangerouslySetInnerHTML={{ __html: googleTagBootstrap }}
    />,
  ]);
};
