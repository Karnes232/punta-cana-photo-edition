// Keep the optional greeting in this browser session, never in URLs or analytics.
export const passVisitorName = (fieldName = "name") => (event) => {
  const form = event.currentTarget;
  const visitor = (form.elements.namedItem(fieldName)?.value ?? "").trim();
  try { sessionStorage.setItem("sertuin-thankyou-name", visitor); } catch { /* Optional greeting. */ }
  const url = new URL(form.action);
  url.searchParams.delete("name");
  form.action = url.href;
};
