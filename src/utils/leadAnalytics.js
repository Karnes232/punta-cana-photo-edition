// Only categorical values are sent. Never include form answers or contact details.
export const GA4_DESTINATION = "G-QTDC0PBVYX";
const pendingKey = "sertuin-pending-inquiry";
const forms = new Set(["contact", "package-detail", "wedding-planner", "corporate-event-planner", "gender-reveal"]);
const allowed = () => typeof window !== "undefined" && navigator.doNotTrack !== "1" && window.doNotTrack !== "1" && !/\/admin(?:\/|$)/.test(window.location.pathname);
const event = (name, parameters) => {
  if (!allowed()) return;
  window.dataLayer = window.dataLayer || [];
  const send = window.gtag || function () { window.dataLayer.push(arguments); };
  send("event", name, { send_to: GA4_DESTINATION, ...parameters });
};
export const recordConfirmedInquiry = (formName) => {
  if (!forms.has(formName) && formName !== "home-page" && formName !== "elopement-request") return;
  event("generate_lead", { form_name: formName, method: "website_form" });
};
export const consumeInquiryReceipt = () => {
  if (!allowed() || !/\/contact\/thankyou\/?$/.test(window.location.pathname)) return;
  try {
    const pending = JSON.parse(sessionStorage.getItem(pendingKey) || "null");
    sessionStorage.removeItem(pendingKey);
    if (pending && Date.now() - pending.at >= 0 && Date.now() - pending.at < 300000) recordConfirmedInquiry(pending.form);
  } catch { /* Storage restrictions must never interrupt the inquiry. */ }
};
let installed = false;
export const installInquiryAnalytics = () => {
  if (installed || !allowed()) return;
  installed = true;
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !forms.has(form.name) || !form.checkValidity() || form.elements.namedItem("bot-field")?.value) return;
    try { sessionStorage.setItem(pendingKey, JSON.stringify({ form: form.name, at: Date.now() })); } catch { /* Optional measurement. */ }
  }, true);
  document.addEventListener("click", (e) => {
    const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!link) return;
    let url; try { url = new URL(link.href); } catch { return; }
    const method = url.protocol === "tel:" ? "phone" : url.protocol === "mailto:" ? "email" : ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname) ? "whatsapp" : null;
    if (method) event("contact_click", { method });
  });
  consumeInquiryReceipt();
};
