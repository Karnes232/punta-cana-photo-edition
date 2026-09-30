// The visitor's cookie choice, stored in localStorage and sent to Google as
// Consent Mode v2 signals. gatsby-ssr.js sets every signal to "denied" before
// Google's tag loads and re-applies a stored choice, so nothing is stored
// until the visitor accepts. Bump VERSION to ask everyone again.
export const STORAGE_KEY = "sertuin-consent";
export const VERSION = 1;
export const OPEN_EVENT = "sertuin:open-cookie-settings";

export const readConsent = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    return saved && saved.v === VERSION ? saved : null;
  } catch {
    return null;
  }
};

const signals = ({ analytics, ads }) => ({
  analytics_storage: analytics ? "granted" : "denied",
  ad_storage: ads ? "granted" : "denied",
  ad_user_data: ads ? "granted" : "denied",
  ad_personalization: ads ? "granted" : "denied",
});

export const saveConsent = (choice) => {
  const value = { v: VERSION, analytics: !!choice.analytics, ads: !!choice.ads, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private windows can refuse storage; the choice still applies to this page.
  }
  // gtag.js reads the arguments object, so push through gtag (defined in <head>).
  window.dataLayer = window.dataLayer || [];
  const gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag("consent", "update", signals(value));
  return value;
};

// Reopens the banner with its settings shown (footer and cookie policy link).
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

// Inline script for gatsby-ssr.js: runs in <head>, before Google's tag.
export const consentDefaultsScript = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{var c=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'null');if(c&&c.v===${VERSION}){gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.ads?'granted':'denied',ad_user_data:c.ads?'granted':'denied',ad_personalization:c.ads?'granted':'denied'});}}catch(e){}
`;
