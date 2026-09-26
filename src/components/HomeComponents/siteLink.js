import { localizedPath } from "../../utils/siteLocales";

// Links edited in Sanity are either a section on the page (#start-your-event),
// which stays as-is, or a site path (/proposal/), which gets the language prefix.
export const siteLink = (url, language) =>
  !url || url.startsWith("#") ? url : localizedPath(url, language);
