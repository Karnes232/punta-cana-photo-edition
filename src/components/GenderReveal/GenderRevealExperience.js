import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import { localizedPath } from "../../utils/siteLocales";
import { ArrowRight, Check, ChevronDown, MessageCircle } from "lucide-react";
import {
  LOCATION_VALUES,
  genderRevealFormContent,
} from "../../content/genderRevealFormContent";
import { cardIcon } from "../../utils/cardIcons";

const SectionHeading = ({ eyebrow, title, body, align = "center", light }) => (
  <div
    className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}
  >
    {eyebrow && (
      <p
        className={`mb-3 font-montserrat text-xs font-semibold uppercase tracking-[0.24em] ${
          light ? "text-amber-300" : "text-amber-700"
        }`}
      >
        {eyebrow}
      </p>
    )}
    <h2
      className={`font-crimson text-4xl font-medium leading-[1.05] md:text-5xl ${
        light ? "text-white" : "text-slate-950"
      }`}
    >
      {title}
    </h2>
    {body && (
      <p
        className={`mt-5 font-montserrat text-base leading-7 ${
          light ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {body}
      </p>
    )}
  </div>
);

const Paragraphs = ({ items }) =>
  (items || []).map((paragraph) => (
    <p
      key={paragraph}
      className="mt-5 font-montserrat text-base leading-8 text-slate-600 md:text-lg"
    >
      {paragraph}
    </p>
  ));

// An imageWithAlt from Sanity.
const SanityImage = ({ image, className = "", imgStyle, loading = "lazy" }) => {
  const data = getImage(image?.asset?.gatsbyImageData);
  if (!data) return null;
  return (
    <GatsbyImage
      image={data}
      alt={image.alt || ""}
      className={className}
      imgStyle={{ objectFit: "cover", ...imgStyle }}
      loading={loading}
    />
  );
};

const InquiryForm = ({ submitLabel, language }) => {
  const [phone, setPhone] = useState("");
  const labels =
    genderRevealFormContent[language] || genderRevealFormContent["en-US"];
  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      id="gender-reveal-quote"
      name="gender-reveal"
      method="POST"
      onSubmit={passVisitorName()}
      action={localizedPath("/contact/thankyou/", language)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="bg-white p-6 shadow-2xl shadow-slate-950/15 md:p-10"
    >
      <input type="hidden" name="form-name" value="gender-reveal" />
      <input
        type="hidden"
        name="source"
        value="Punta Cana Gender Reveal page"
      />
      <input
        type="hidden"
        name="subject"
        value="New Punta Cana gender reveal quote request"
      />
      <p className="hidden">
        <label>
          {labels.honeypot}{" "}
          <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.name} *
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.email} *
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.phone} *
          <InternationalPhoneField
            className={inputClass}
            name="phone"
            id="gender-reveal-phone"
            value={phone}
            onChange={setPhone}
            language={language}
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.country}
          <input
            className={inputClass}
            type="text"
            name="country"
            autoComplete="country-name"
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.date} *
          <input
            className={inputClass}
            type="text"
            name="event-date"
            placeholder={labels.datePlaceholder}
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.guests}
          <input
            className={inputClass}
            type="number"
            name="guest-count"
            min="2"
            inputMode="numeric"
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.location} *
          <select
            className={inputClass}
            name="location-type"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {labels.choose}
            </option>
            {LOCATION_VALUES.map((value, index) => (
              <option key={value} value={value}>
                {labels.locationOptions[index]}
              </option>
            ))}
          </select>
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.locationName}
          <input className={inputClass} type="text" name="location-name" />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.vision} *
          <textarea
            className={`${inputClass} min-h-36 resize-y`}
            name="gender-reveal-vision"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-slate-950 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-amber-700"
      >
        {submitLabel}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-slate-500">
        {labels.privacy}
      </p>
    </form>
  );
};

// Gallery photo sizes by position: the first is wide on every screen, the last
// two are wide from tablet up.
const galleryClasses = [
  "col-span-2 h-72 w-full md:h-96",
  "h-72 w-full md:h-96",
  "h-72 w-full md:h-96",
  "h-72 w-full md:col-span-2 md:h-96",
  "h-72 w-full md:col-span-2 md:h-96",
];

// Copy and photos come from this language's Gender Reveal Page document in
// Sanity; phone and email from General Layout.
const GenderRevealExperience = ({ page, generalInfo, language }) => {
  const telephone = (generalInfo?.telephone || "8295222900").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    page.whatsappMessage || "",
  )}`;

  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[720px] bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <SanityImage
            image={page.heroImage}
            className="h-full w-full"
            imgStyle={{ objectPosition: "center 56%" }}
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/68 to-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/45" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-start px-6 pb-16 pt-44 md:items-center md:px-10 md:py-24 lg:px-12">
          <div className="max-w-4xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.26em] text-amber-300 md:text-sm">
              {page.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-crimson text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-7xl">
              {page.heroHeading}
            </h1>
            <p className="mt-7 max-w-2xl font-montserrat text-lg leading-8 text-slate-100 md:text-xl">
              {page.heroText}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#gender-reveal-quote"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline transition hover:bg-amber-500"
              >
                {page.primaryCtaLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/70 bg-white/10 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {page.whatsappCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-12">
          {(page.trustItems || []).map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-4 py-6 first:pl-0 last:pr-0"
            >
              <Check
                className="shrink-0 text-amber-700"
                size={19}
                aria-hidden="true"
              />
              <p className="font-montserrat text-sm font-semibold leading-5 text-slate-800">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={page.introEyebrow}
              title={page.introTitle}
              align="left"
            />
            <Paragraphs items={page.introParagraphs} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(page.introImages || []).map((image, index) => (
              <SanityImage
                key={image._key}
                image={image}
                className={`${index === 1 ? "mt-10 " : ""}h-80 w-full`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={page.serviceEyebrow}
            title={page.serviceTitle}
            body={page.serviceIntro}
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
            {(page.services || []).map((item) => {
              const Icon = cardIcon(item.icon);
              return (
                <article key={item._key} className="bg-white p-7 md:min-h-44 md:p-8">
                  <Icon
                    className="text-amber-700"
                    size={25}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-crimson text-2xl font-medium leading-7 text-slate-950">
                    {item.label}
                  </h3>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <Paragraphs items={[page.serviceNote].filter(Boolean)} />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={page.locationsEyebrow}
            title={page.locationsTitle}
            body={page.locationsIntro}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
            {(page.locations || []).map((item) => {
              const Icon = cardIcon(item.icon);
              return (
                <article
                  key={item._key}
                  className="bg-slate-950 p-8 md:min-h-64 md:p-10"
                >
                  <Icon
                    className="text-amber-400"
                    size={30}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-7 font-crimson text-3xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-montserrat text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <Paragraphs items={[page.locationsNote].filter(Boolean)} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={page.galleryEyebrow}
            title={page.galleryTitle}
            body={page.galleryIntro}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {(page.galleryImages || []).map((image, index) => (
              <SanityImage
                key={image._key}
                image={image}
                className={galleryClasses[index] || "h-72 w-full md:h-96"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={page.processEyebrow}
            title={page.processTitle}
            body={page.processIntro}
          />
          <ol className="mt-14 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {(page.processSteps || []).map((step, index) => (
              <li key={step._key} className="bg-white p-7 md:min-h-72 md:p-8">
                <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-crimson text-3xl font-medium leading-8 text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-4 font-montserrat text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={page.formEyebrow}
              title={page.formTitle}
              body={page.formBody}
              align="left"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-amber-800 underline decoration-amber-500 underline-offset-4"
            >
              <MessageCircle size={19} aria-hidden="true" />
              {page.formWhatsappLabel}
            </a>
          </div>
          <InquiryForm submitLabel={page.formSubmitLabel} language={language} />
        </div>
      </section>

      <section className="bg-[#f7f5f0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={page.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {(page.faqs || []).map((item) => (
              <details key={item.question} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-crimson text-2xl font-medium text-slate-950">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="shrink-0 text-amber-700 transition group-open:rotate-180"
                    size={22}
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-3xl pb-6 font-montserrat text-sm leading-7 text-slate-600 md:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GenderRevealExperience;
