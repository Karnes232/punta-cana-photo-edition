import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { cardIcon } from "../../utils/cardIcons";
import { Link } from "gatsby";
import { Instagram, Landmark, ShieldCheck } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/HcYUKFzHrAj86fMh7";
const GOOGLE_REVIEW_URL = "https://g.page/r/CYRe9l94QQaWEBM/review";

// The proposal page's sections, each reading this language's Proposal Page
// document from Sanity (page).

const Eyebrow = ({ children }) => (
  <p className="font-crimson uppercase tracking-[0.22em] text-xs md:text-sm text-gray-500">
    {children}
  </p>
);

const SectionHeading = ({ eyebrow, title, intro, id }) => (
  <div className="max-w-3xl mx-auto text-center px-5">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2
      id={id}
      className="font-crimson font-normal tracking-wide text-3xl md:text-4xl text-gray-900 mt-3"
    >
      {title}
    </h2>
    {intro && (
      <p className="font-crimson text-lg text-gray-700 leading-relaxed mt-5">
        {intro}
      </p>
    )}
  </div>
);

const Icon = ({ component: IconComponent, className = "" }) => (
  <IconComponent
    aria-hidden="true"
    strokeWidth={1.35}
    className={`w-7 h-7 text-primary-color ${className}`}
  />
);

export const ProposalIntroduction = ({ page }) => {
  return (
    <section
      aria-labelledby="proposal-overview-heading"
      className="bg-secondary-bg-color py-14 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white px-6 py-10 md:px-14 md:py-14">
          <SectionHeading
            id="proposal-overview-heading"
            eyebrow={page.introEyebrow}
            title={page.introTitle}
          />
          <div className="max-w-4xl mx-auto mt-7 space-y-5 text-center">
            {(page.introParagraphs || []).map((paragraph) => (
              <p
                key={paragraph}
                className="font-crimson text-lg text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProposalInclusions = ({ page }) => {
  return (
    <section
      aria-labelledby="proposal-inclusions-heading"
      className="py-16 md:py-24 bg-secondary-bg-color"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-inclusions-heading"
          eyebrow={page.inclusionsEyebrow}
          title={page.inclusionsTitle}
          intro={page.inclusionsIntro}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 mt-12">
          {(page.inclusions || []).map(({ _key, icon, title, description }) => (
            <article key={_key} className="bg-white p-7 md:p-8">
              <Icon component={cardIcon(icon)} />
              <h3 className="font-crimson text-2xl text-gray-900 mt-5">
                {title}
              </h3>
              <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="bg-white px-6 py-10 md:px-12 md:py-12 mt-12">
          <h3 className="font-crimson font-normal tracking-wide text-2xl md:text-3xl text-gray-900 text-center">
            {page.upgradesTitle}
          </h3>
          <p className="font-crimson text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            {page.upgradesIntro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
            {(page.upgrades || []).map(({ _key, icon, label }) => (
              <li
                key={_key}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon component={cardIcon(icon)} />
                <span className="font-crimson text-lg text-gray-800">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const ProposalMomentsHeading = ({ page }) => {
  return (
    <div className="pt-16 md:pt-24 pb-10 bg-white">
      <SectionHeading
        id="proposal-moments-heading"
        eyebrow={page.momentsEyebrow}
        title={page.momentsTitle}
        intro={page.momentsIntro}
      />
    </div>
  );
};

export const ProposalBookingProcess = ({ page, language }) => {
  const contactPath = localizedPath("/contact/", language);

  return (
    <section
      aria-labelledby="proposal-booking-heading"
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-booking-heading"
          eyebrow={page.bookingEyebrow}
          title={page.bookingTitle}
          intro={page.bookingIntro}
        />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mt-12">
          {(page.bookingSteps || []).map(
            ({ _key, icon, title, description }, index) => (
              <li key={_key} className="bg-secondary-bg-color p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <Icon component={cardIcon(icon)} />
                  <span className="font-crimson text-3xl text-gray-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-crimson text-xl text-gray-900 mt-6">
                  {title}
                </h3>
                <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                  {description}
                </p>
              </li>
            ),
          )}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to={contactPath}
            className="inline-flex no-underline border border-gray-700 rounded-3xl px-7 py-3 font-crimson text-gray-700 hover:bg-black hover:text-white transition-colors duration-300"
          >
            {page.contactLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export const ProposalTrust = ({ page, instagramUrl }) => {
  const officialInstagram = /^https?:\/\//i.test(instagramUrl || "")
    ? instagramUrl
    : "https://www.instagram.com/sertuinevents/";

  return (
    <section
      aria-labelledby="proposal-trust-heading"
      className="py-16 md:py-24 bg-secondary-bg-color"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-trust-heading"
          eyebrow={page.trustEyebrow}
          title={page.trustTitle}
          intro={page.trustIntro}
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-gray-200 mt-12">
          <article className="bg-white p-7 md:p-10 lg:col-span-2">
            <Icon component={Landmark} />
            <h3 className="font-crimson text-2xl text-gray-900 mt-5">
              {page.companyTitle}
            </h3>
            <ul className="space-y-4 mt-6">
              {(page.experienceFacts || []).map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 font-crimson text-gray-700 leading-relaxed"
                >
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="w-5 h-5 text-primary-color shrink-0 mt-0.5"
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <p className="font-crimson text-sm text-gray-600 leading-relaxed mt-6">
              {page.appointmentNote}
            </p>
            <p className="font-crimson text-gray-700 leading-relaxed mt-6">
              {page.portfolioText}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5">
              <a
                href={officialInstagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-crimson text-gray-700 underline underline-offset-4"
              >
                <Instagram aria-hidden="true" className="w-5 h-5" />
                {page.instagramLabel}
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {page.mapsLabel}
              </a>
            </div>
          </article>

          <div className="bg-white p-7 md:p-10 lg:col-span-3">
            <h3 className="font-crimson text-2xl text-gray-900">
              {page.reviewsTitle}
            </h3>
            <p className="font-crimson text-gray-700 leading-relaxed mt-3">
              {page.reviewsIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 mt-7">
              {(page.reviews || []).map(({ _key, author, excerpt }) => (
                <article key={_key} className="bg-secondary-bg-color p-6">
                  {/* role="img" is required for aria-label to be permitted;
                      on a bare div the implicit generic role discards it. */}
                  <div
                    role="img"
                    aria-label={page.fiveStarsLabel}
                    className="text-primary-color tracking-[0.18em]"
                  >
                    <span aria-hidden="true">★★★★★</span>
                  </div>
                  <blockquote className="font-crimson text-lg text-gray-800 leading-relaxed mt-4">
                    “{excerpt}”
                  </blockquote>
                  <p className="font-crimson text-sm text-gray-600 mt-4">
                    {author}
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block font-crimson text-sm text-gray-700 underline underline-offset-4 mt-2"
                  >
                    {page.reviewSourceLabel}
                  </a>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {page.mapsLabel}
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {page.reviewLinkLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL };
