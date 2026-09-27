import React from "react";
import { Link } from "gatsby";
import { Check, ChevronDown, Music2, UtensilsCrossed } from "lucide-react";
import { cardIcon } from "../../utils/cardIcons";

// The details of one proposal package: its summary, price, setup and what it
// includes, then every package's shared inclusions and conditions. The
// package's text comes from its Package Page (page) and Proposal Package
// (pkg); the shared text from this language's Package Page Texts (texts).

const DetailIcon = ({ icon: Icon }) => (
  <Icon
    aria-hidden="true"
    strokeWidth={1.4}
    className="h-6 w-6 shrink-0 text-primary-color"
  />
);

const ProposalPackageDetails = ({ page, pkg, texts, language }) => {
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const content = texts || {};
  const homePath = isPortuguese
    ? "/pt/"
    : isFrench
      ? "/fr/"
      : isSpanish
        ? "/es/"
        : "/";
  const proposalPath = isPortuguese
    ? "/pt/proposal/"
    : isFrench
      ? "/fr/proposal/"
      : isSpanish
        ? "/es/proposal/"
        : "/proposal/";

  if (!page || !pkg) return null;

  const inclusions = content.inclusions || [];
  const quickInclusions = inclusions.filter((item) => item.essential);
  const specialInclusions = [
    pkg.charcuterieIncluded && {
      icon: UtensilsCrossed,
      title: content.charcuterieTitle,
      short: content.charcuterieShort,
      description: content.charcuterieText,
    },
    pkg.dinnerIncluded && {
      icon: UtensilsCrossed,
      title: content.dinnerTitle,
      short: content.dinnerShort,
      description: content.dinnerText,
    },
    pkg.violinIncluded && {
      icon: Music2,
      title: content.violinTitle,
      short: content.violinShort,
      description: content.violinText,
    },
  ].filter(Boolean);

  const handleBookingClick = (event) => {
    const bookingSection = document.getElementById("package-booking");
    if (!bookingSection) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    bookingSection.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-secondary-bg-color">
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <nav aria-label={content.breadcrumbLabel} className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link
                to={homePath}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary-color"
              >
                {content.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li>
              <Link
                to={proposalPath}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary-color"
              >
                {content.breadcrumbProposals}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li aria-current="page" className="text-gray-800">
              {page.name}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-8 border-b border-stone-200 pb-9 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="font-crimson text-xs uppercase tracking-[0.24em] text-gray-500 md:text-sm">
              {content.eyebrow}
            </p>
            <p className="mt-3 font-crimson text-xl leading-relaxed text-gray-700 md:text-2xl">
              {page.summary}
            </p>
          </div>
          <div className="lg:min-w-72 lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {content.basePriceLabel}
            </p>
            <p className="mt-1 font-crimson text-4xl text-gray-950 md:text-5xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(pkg.price)}
            </p>
            <p className="mt-2 text-sm text-gray-600">{content.priceNote}</p>
            <a
              href="#package-booking"
              aria-controls="packageForm"
              onClick={handleBookingClick}
              className="mt-5 inline-flex rounded-full bg-black px-6 py-3 font-crimson text-white no-underline transition-colors hover:bg-primary-color"
            >
              {content.bookLabel}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-crimson text-2xl font-normal text-gray-900 md:text-3xl">
            {content.quickTitle}
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickInclusions.map(({ _key, icon, title }) => (
              <li
                key={_key}
                className="flex items-center gap-3 font-crimson text-lg text-gray-800"
              >
                <DetailIcon icon={cardIcon(icon)} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        {specialInclusions.length > 0 && (
          <div className="mt-7 border-l-2 border-primary-color bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              {content.specialTitle}
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {specialInclusions.map(({ icon, title, short }) => (
                <div key={title} className="flex items-start gap-3">
                  <DetailIcon icon={icon} />
                  <div>
                    <h3 className="font-crimson text-xl text-gray-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {short}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <details className="group border border-stone-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-crimson text-xl text-gray-900 md:px-6">
              <span>{content.setupDetailsLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="border-t border-stone-200 px-5 py-6 md:px-6">
              <h2 className="font-crimson text-2xl text-gray-900">
                {content.setupTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {content.setupIntro}
              </p>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {(page.setup || []).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-crimson text-base leading-relaxed text-gray-700"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-primary-color"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {specialInclusions.length > 0 && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {specialInclusions.map(({ title, description }) => (
                    <div key={title} className="bg-stone-50 p-4">
                      <h3 className="font-crimson text-lg text-gray-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {page.exclusions?.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <h3 className="font-crimson text-xl text-gray-900">
                    {content.exclusionsTitle}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600">
                    {page.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>

          <details className="group border border-stone-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-crimson text-xl text-gray-900 md:px-6">
              <span>{content.completeInfoLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="grid gap-8 border-t border-stone-200 px-5 py-6 lg:grid-cols-2 md:px-6">
              <div>
                <h2 className="font-crimson text-2xl text-gray-900">
                  {content.commonTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {content.commonIntro}
                </p>
                <div className="mt-5 space-y-4">
                  {inclusions.map(({ _key, icon, title, description }) => (
                    <div key={_key} className="flex items-start gap-3">
                      <DetailIcon icon={cardIcon(icon)} />
                      <div>
                        <h3 className="font-crimson text-lg text-gray-900">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-crimson text-2xl text-gray-900">
                  {content.importantTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {content.importantIntro}
                </p>
                <ul className="mt-5 space-y-3">
                  {(content.conditions || []).map((condition) => (
                    <li
                      key={condition}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary-color"
                      />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default ProposalPackageDetails;
