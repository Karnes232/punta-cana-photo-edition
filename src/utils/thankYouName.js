import { storeThankYouName } from "./analytics";

// Keep the optional greeting in this browser tab instead of putting a person's
// name in the URL, browser history, referrers, server logs or analytics.
export const passVisitorName =
  (fieldName = "name") =>
  (event) => {
    const form = event.currentTarget;
    const visitor = (form.elements.namedItem(fieldName)?.value ?? "").trim();
    storeThankYouName(visitor);
  };
