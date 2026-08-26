import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import {
  applyConsentLevel,
  getStoredConsentLevel,
} from "../../utils/analytics";

const ConsentManager = () => {
  const [mounted, setMounted] = useState(false);
  const [choice, setChoice] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isSpanish =
    typeof window !== "undefined" &&
    (window.location.pathname === "/es" ||
      window.location.pathname.startsWith("/es/"));

  useEffect(() => {
    setMounted(true);
    if (/^\/(?:es\/)?admin(?:\/|$)/i.test(window.location.pathname)) return;
    setChoice(getStoredConsentLevel());
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("sertuin:privacy-settings", openSettings);
    return () =>
      window.removeEventListener("sertuin:privacy-settings", openSettings);
  }, []);

  if (
    !mounted ||
    typeof window === "undefined" ||
    /^\/(?:es\/)?admin(?:\/|$)/i.test(window.location.pathname)
  ) {
    return null;
  }

  const select = (level) => {
    applyConsentLevel(level);
    setChoice(level);
    setSettingsOpen(false);
  };
  const showPanel = !choice || settingsOpen;
  const privacyPath = isSpanish ? "/es/privacy/" : "/privacy/";

  return (
    <>
      {showPanel ? (
        <section
          aria-labelledby="privacy-preferences-title"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white p-5 font-montserrat text-stone-900 shadow-2xl md:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2
                id="privacy-preferences-title"
                className="font-crimson text-2xl font-semibold"
              >
                {isSpanish
                  ? "Tus preferencias de privacidad"
                  : "Your privacy preferences"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {isSpanish
                  ? "Usamos medición para conocer páginas, paquetes, formularios, dispositivo, rendimiento y ubicación aproximada. Los campos con nombre, teléfono, correo o mensaje nunca se envían a Analytics."
                  : "We use measurement to understand pages, packages, forms, devices, performance and approximate location. Name, phone, email and message fields are never sent to Analytics."}{" "}
                <Link
                  to={privacyPath}
                  className="font-semibold underline underline-offset-2"
                >
                  {isSpanish
                    ? "Ver política de privacidad"
                    : "Read the privacy policy"}
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:max-w-xs lg:justify-end">
              <button
                type="button"
                onClick={() => select("all")}
                className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                {isSpanish ? "Aceptar todo" : "Accept all"}
              </button>
              <button
                type="button"
                onClick={() => select("analytics")}
                className="rounded-full border border-stone-900 px-5 py-3 text-sm font-semibold transition hover:bg-stone-100"
              >
                {isSpanish ? "Solo medición" : "Analytics only"}
              </button>
              <button
                type="button"
                onClick={() => select("necessary")}
                className="rounded-full px-5 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
              >
                {isSpanish ? "Solo necesarias" : "Necessary only"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-stone-300 bg-white/95 px-3 py-2 font-montserrat text-xs font-semibold text-stone-700 shadow-md backdrop-blur transition hover:bg-white"
        >
          {isSpanish ? "Privacidad" : "Privacy"}
        </button>
      )}
    </>
  );
};

export default ConsentManager;
