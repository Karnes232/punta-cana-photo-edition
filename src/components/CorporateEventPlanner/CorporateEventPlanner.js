import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactPlayer from "react-player/lazy";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarRange,
  Check,
  ClipboardCheck,
  Headphones,
  Hotel,
  MapPin,
  MessageCircle,
  Route,
  ShieldCheck,
  Truck,
  Users,
  Utensils,
  WalletCards,
} from "lucide-react";
import {
  BUDGET_VALUES,
  eventPlannerFormContent,
} from "../../content/eventPlannerFormContent";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import { localizedPath } from "../../utils/siteLocales";

// Card icons by the name chosen in Sanity (studio/schemaTypes/objects/iconCard.ts).
const cardIcons = {
  "badge-check": BadgeCheck,
  "clipboard-check": ClipboardCheck,
  headphones: Headphones,
  hotel: Hotel,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  "shield-check": ShieldCheck,
  truck: Truck,
  users: Users,
  utensils: Utensils,
  "wallet-cards": WalletCards,
};

const SectionHeader = ({
  eyebrow,
  title,
  intro,
  align = "center",
  light = false,
}) => (
  <div
    className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
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
    {intro && (
      <p
        className={`mt-5 font-montserrat text-base leading-7 ${light ? "text-slate-200" : "text-slate-600"}`}
      >
        {intro}
      </p>
    )}
  </div>
);

// An imageWithAlt from Sanity.
const EventImage = ({ image, className = "", loading = "lazy" }) => {
  const data = getImage(image?.asset?.gatsbyImageData);
  if (!data) return null;
  return (
    <GatsbyImage
      image={data}
      alt={image.alt || ""}
      className={className}
      imgStyle={{ objectFit: "cover" }}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "auto"}
    />
  );
};

const galleryLabel = {
  "en-US": (client) => `${client} event gallery`,
  es: (client) => `Galería del evento corporativo ${client}`,
  pt: (client) => `Galeria do evento corporativo ${client}`,
  fr: (client) => `Galerie de l’événement d’entreprise ${client}`,
};

const CaseStudyGallery = ({ images, client, language }) => {
  const visibleImages = (images || []).slice(0, 5);
  if (!visibleImages.length) return null;
  return (
    <div
      className="grid grid-cols-2 gap-2 md:gap-3"
      aria-label={(galleryLabel[language] || galleryLabel["en-US"])(client)}
    >
      {visibleImages.map((image, index) => (
        <EventImage
          key={image._key}
          image={image}
          className={`w-full rounded-sm ${
            index === 0
              ? "col-span-2 h-64 md:h-80"
              : index === 1 || index === 2
                ? "h-40 md:h-52"
                : "hidden h-40 md:block md:h-52"
          }`}
        />
      ))}
    </div>
  );
};

const ProposalForm = ({ submitLabel, language }) => {
  const [phone, setPhone] = useState("");
  const labels =
    eventPlannerFormContent[language] || eventPlannerFormContent["en-US"];

  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      id="corporate-event-form"
      name="corporate-event-planner"
      method="POST"
      onSubmit={passVisitorName()}
      action={localizedPath("/contact/thankyou/", language)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="rounded-sm bg-white p-6 shadow-2xl shadow-slate-950/15 md:p-10"
    >
      <input type="hidden" name="form-name" value="corporate-event-planner" />
      <input type="hidden" name="source" value="Corporate Event Planner page" />
      <input
        type="hidden"
        name="subject"
        value="New corporate event proposal request"
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
          {labels.company} *
          <input
            className={inputClass}
            type="text"
            name="company"
            autoComplete="organization"
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
            id="corporate-event-phone"
            value={phone}
            onChange={setPhone}
            language={language}
            required
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
          {labels.guests} *
          <input
            className={inputClass}
            type="number"
            name="guest-count"
            min="1"
            inputMode="numeric"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.venue}
          <input className={inputClass} type="text" name="hotel-venue" />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.details} *
          <textarea
            className={`${inputClass} min-h-36 resize-y`}
            name="event-details"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.budget} *
          <select
            className={inputClass}
            name="estimated-budget"
            defaultValue=""
            required
          >
            <option value="">{labels.select}</option>
            {BUDGET_VALUES.map((value, index) => (
              <option key={value} value={value}>
                {labels.budgetOptions[index]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-slate-950 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-amber-700"
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

const CorporateEventPlanner = ({ page, generalInfo, language }) => {
  const telephone = (generalInfo?.telephone || "").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    page.whatsappMessage || "",
  )}`;

  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[680px] bg-slate-950 md:min-h-[700px] lg:min-h-[720px]">
        <div className="absolute inset-0 overflow-hidden">
          <EventImage
            image={page.heroImage}
            className="h-full w-full"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-start px-6 pb-16 pt-36 md:min-h-[700px] md:items-center md:px-10 md:py-20 lg:min-h-[720px] lg:px-12">
          <div className="max-w-5xl">
            <p className="mb-5 font-montserrat text-xs font-semibold uppercase tracking-[0.26em] text-amber-300 md:text-sm">
              {page.eyebrow}
            </p>
            <h1 className="max-w-5xl font-crimson text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-[4rem]">
              {page.heroHeading}
            </h1>
            <p className="mt-7 max-w-2xl font-montserrat text-lg leading-8 text-slate-100 md:text-xl">
              {page.heroSubheading}
            </p>
            <p className="mt-5 max-w-3xl font-montserrat text-sm font-medium leading-7 text-amber-100 md:text-base">
              {page.servicesLine}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#corporate-event-form"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-amber-600 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline transition hover:bg-amber-500"
              >
                {page.primaryCtaLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/60 bg-white/5 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
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
                size={20}
                strokeWidth={2.2}
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeader
            eyebrow={page.eyebrow}
            title={page.introTitle}
            align="left"
          />
          <p className="max-w-2xl font-montserrat text-lg leading-8 text-slate-600">
            {page.introBody}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={page.workModesTitle}
            intro={page.workModesIntro}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {(page.workModes || []).map((mode, index) => (
              <article
                key={mode._key}
                className="group relative overflow-hidden border border-slate-200 bg-[#f7f5f0] p-8 md:p-10"
              >
                <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-amber-700">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-crimson text-3xl font-medium text-slate-950 md:text-4xl">
                  {mode.title}
                </h3>
                <p className="mt-5 font-montserrat text-base leading-7 text-slate-600">
                  {mode.description}
                </p>
                <p className="mt-7 border-t border-slate-300 pt-5 font-montserrat text-sm font-semibold leading-6 text-slate-800">
                  {mode.bestFor}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-600 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={page.servicesTitle}
            intro={page.servicesIntro}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {(page.services || []).map((service) => {
              const Icon = cardIcons[service.icon] || Check;
              return (
                <article
                  key={service._key}
                  className="bg-slate-950 p-7 transition hover:bg-slate-900 md:min-h-64 md:p-8"
                >
                  <Icon
                    className="text-amber-400"
                    size={28}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-7 font-crimson text-2xl font-medium leading-7 text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 font-montserrat text-sm leading-6 text-slate-300">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={page.processTitle}
            intro={page.processIntro}
          />
          <ol className="relative mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {(page.processSteps || []).map((step, index) => (
              <li
                key={step._key}
                className="relative border-t border-slate-300 pt-8"
              >
                <span className="absolute -top-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 font-montserrat text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-crimson text-2xl font-medium text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 font-montserrat text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#d4a548] px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.24em] text-slate-950/70">
              {page.budgetEyebrow}
            </p>
            <h2 className="mt-3 font-crimson text-4xl font-medium leading-tight text-slate-950 md:text-6xl">
              {page.budgetTitle}
            </h2>
            <p className="mt-6 max-w-2xl font-montserrat text-base leading-7 text-slate-900/80">
              {page.budgetBody}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {(page.budgetPoints || []).map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-montserrat text-sm font-semibold leading-6 text-slate-950"
                >
                  <Check
                    className="mt-0.5 shrink-0"
                    size={18}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <aside className="border border-slate-950/15 bg-[#f7f5f0] p-8 shadow-xl md:p-10">
            <WalletCards
              size={32}
              strokeWidth={1.7}
              className="text-amber-700"
              aria-hidden="true"
            />
            <h3 className="mt-6 font-crimson text-3xl font-medium text-slate-950">
              {page.budgetChangeTitle}
            </h3>
            <p className="mt-4 font-montserrat text-sm leading-7 text-slate-600">
              {page.budgetChangeBody}
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <EventImage
              image={page.onsiteImage}
              className="h-[480px] w-full md:h-[620px]"
            />
            <div className="absolute bottom-0 right-0 max-w-xs bg-slate-950 p-6 text-white md:p-8">
              <CalendarRange
                className="text-amber-400"
                size={28}
                aria-hidden="true"
              />
              <p className="mt-4 font-montserrat text-sm font-semibold leading-6">
                {page.onsitePoints?.[0]}
              </p>
            </div>
          </div>
          <div className="lg:pl-10">
            <SectionHeader
              eyebrow={page.onsiteEyebrow}
              title={page.onsiteTitle}
              align="left"
            />
            <p className="mt-6 font-montserrat text-base leading-8 text-slate-600">
              {page.onsiteBody}
            </p>
            <ul className="mt-7 space-y-4">
              {(page.onsitePoints || []).map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 font-montserrat text-sm font-semibold text-slate-800"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <Check size={16} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={page.caseStudiesTitle}
            intro={page.caseStudiesIntro}
          />
          <div className="mt-16 space-y-24">
            {(page.caseStudies || []).map((study, index) => {
              return (
                <article
                  key={study._key}
                  className="grid gap-10 lg:grid-cols-2 lg:items-center"
                >
                  <div className={index % 2 ? "lg:order-2" : ""}>
                    <CaseStudyGallery
                      images={study.images}
                      client={study.client}
                      language={language}
                    />
                  </div>
                  <div
                    className={index % 2 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}
                  >
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
                      {study.client}
                    </p>
                    <h3 className="mt-4 font-crimson text-4xl font-medium leading-tight text-slate-950 md:text-5xl">
                      {study.title}
                    </h3>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {(study.facts || []).map((fact) => (
                        <li
                          key={fact}
                          className="border border-slate-300 bg-white px-3 py-2 font-montserrat text-xs font-semibold text-slate-700"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-montserrat text-base leading-8 text-slate-600">
                      {study.description}
                    </p>
                    {study.videoUrl && (
                      <div className="mt-8 aspect-video overflow-hidden bg-slate-950">
                        <ReactPlayer
                          url={study.videoUrl}
                          controls
                          width="100%"
                          height="100%"
                          light
                          playsinline
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={page.whyTitle} />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {(page.whyItems || []).map((item) => {
              const Icon = cardIcons[item.icon] || Check;
              return (
                <article key={item._key} className="flex gap-5">
                  <Icon
                    className="mt-1 shrink-0 text-amber-700"
                    size={25}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-crimson text-2xl font-medium text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-montserrat text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <SectionHeader title={page.eventTypesTitle} align="left" light />
          <ul className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 md:grid-cols-3">
            {(page.eventTypes || []).map((type) => (
              <li
                key={type}
                className="flex items-center gap-3 bg-slate-950 px-4 py-5 font-montserrat text-sm font-semibold leading-5 text-slate-100"
              >
                <ArrowRight
                  className="shrink-0 text-amber-400"
                  size={15}
                  aria-hidden="true"
                />
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={page.venueEyebrow}
            title={page.venueTitle}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="border border-slate-200 bg-white p-8 md:p-10">
              <Hotel
                className="text-amber-700"
                size={30}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <h3 className="mt-6 font-crimson text-3xl font-medium text-slate-950">
                {page.resortTitle}
              </h3>
              <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
                {page.resortBody}
              </p>
            </article>
            <article className="border border-slate-200 bg-white p-8 md:p-10">
              <Building2
                className="text-amber-700"
                size={30}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <h3 className="mt-6 font-crimson text-3xl font-medium text-slate-950">
                {page.independentTitle}
              </h3>
              <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
                {page.independentBody}
              </p>
            </article>
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center font-montserrat text-base font-semibold leading-7 text-slate-800">
            {page.venueClosing}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeader title={page.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {(page.faqs || []).map((faq) => (
              <details key={faq._key} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-crimson text-xl font-medium text-slate-950 md:text-2xl">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 font-montserrat text-xl font-light transition group-open:rotate-45 group-open:bg-slate-950 group-open:text-white">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-4 font-montserrat text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d4a548] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow={page.formEyebrow}
              title={page.formTitle}
              align="left"
            />
            <p className="mt-6 font-montserrat text-base leading-8 text-slate-900/80">
              {page.formIntro}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-slate-950 underline decoration-slate-950/30 underline-offset-8"
            >
              <MessageCircle size={20} aria-hidden="true" />
              {page.whatsappCtaLabel}
            </a>
          </div>
          <ProposalForm submitLabel={page.formSubmitLabel} language={language} />
        </div>
      </section>
    </main>
  );
};

export default CorporateEventPlanner;
