import React, { useEffect, useState } from "react";
import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { OPEN_EVENT, readConsent, saveConsent } from "./consent";

// Bottom bar asking for consent to Analytics and Advertising cookies. Shown
// until the visitor chooses; reopened from "Cookie settings" in the footer and
// on the cookie policy. Accept and Reject have equal weight, as EU rules require.
const buttonClass =
  "px-5 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] transition";

const Toggle = ({ id, label, text, checked, disabled, onChange }) => (
  <label htmlFor={id} className="flex items-start gap-3 py-2">
    <input
      id={id}
      type="checkbox"
      className="mt-1 h-4 w-4 accent-black"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.checked)}
    />
    <span>
      <span className="block font-semibold text-black">{label}</span>
      <span className="block text-gray-600">{text}</span>
    </span>
  </label>
);

const CookieConsent = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, ads: false });

  // Client-only: the static HTML never contains the banner, so there's no
  // hydration mismatch and no flash for visitors who already chose.
  useEffect(() => {
    const saved = readConsent();
    if (saved) setChoice({ analytics: saved.analytics, ads: saved.ads });
    else setOpen(true);
    const reopen = () => {
      const current = readConsent();
      if (current) setChoice({ analytics: current.analytics, ads: current.ads });
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (value) => {
    saveConsent(value);
    setChoice(value);
    setOpen(false);
    setSettings(false);
  };

  if (!open) return null;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white px-4 pt-5 font-montserrat text-sm text-gray-700 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:px-10"
      style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 id="cookie-consent-title" className="font-crimson text-2xl font-medium text-black">
            {t("We use cookies")}
          </h2>
          <p className="mt-2 leading-6">
            {t(
              "With your permission, we use cookies to see how visitors use the site (Google Analytics) and to measure our ads (Google Ads). Nothing is set until you choose. You can change your choice anytime under “Cookie settings” at the bottom of the page.",
            )}{" "}
            <Link to="/cookie-policy/" className="underline underline-offset-2 hover:text-black">
              {t("Cookie Policy")}
            </Link>
          </p>
          {settings && (
            <div className="mt-3 border-t border-gray-100 pt-2">
              <Toggle
                id="consent-necessary"
                label={t("Necessary")}
                text={t("Remembers your cookie choice. Always on.")}
                checked
                disabled
              />
              <Toggle
                id="consent-analytics"
                label={t("Analytics")}
                text={t("Google Analytics: which pages are visited and how, so we can improve the site.")}
                checked={choice.analytics}
                onChange={(analytics) => setChoice((c) => ({ ...c, analytics }))}
              />
              <Toggle
                id="consent-ads"
                label={t("Advertising")}
                text={t("Google Ads: measures which ads lead to requests and lets us show our ads to past visitors.")}
                checked={choice.ads}
                onChange={(ads) => setChoice((c) => ({ ...c, ads }))}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 lg:flex-nowrap" lang={language}>
          <button type="button" className={`${buttonClass} bg-black text-white hover:bg-primary-color hover:text-black`} onClick={() => decide({ analytics: true, ads: true })}>
            {t("Accept all")}
          </button>
          <button type="button" className={`${buttonClass} bg-black text-white hover:bg-primary-color hover:text-black`} onClick={() => decide({ analytics: false, ads: false })}>
            {t("Reject all")}
          </button>
          {settings ? (
            <button type="button" className={`${buttonClass} border border-black text-black hover:bg-gray-100`} onClick={() => decide(choice)}>
              {t("Save my choices")}
            </button>
          ) : (
            <button type="button" className={`${buttonClass} border border-black text-black hover:bg-gray-100`} onClick={() => setSettings(true)}>
              {t("Settings")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
