import React, { useMemo, useState } from "react";
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
import { getCorporateEventContent } from "../../content/corporateEventContent";

const serviceIcons = [
  ClipboardCheck,
  BadgeCheck,
  Users,
  Utensils,
  Headphones,
  Hotel,
  Truck,
  ShieldCheck,
];

const whyIcons = [
  MapPin,
  BadgeCheck,
  Users,
  MessageCircle,
  ClipboardCheck,
  WalletCards,
];

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

const EventImage = ({ asset, alt, className = "", loading = "lazy" }) => {
  const image = getImage(asset?.gatsbyImage);
  if (image) {
    return (
      <GatsbyImage
        image={image}
        alt={alt || asset?.title || "Corporate event in Punta Cana"}
        className={className}
        imgStyle={{ objectFit: "cover" }}
        loading={loading}
      />
    );
  }
  if (asset?.url) {
    return (
      <img
        src={`${asset.url}?w=1400&fm=webp&q=78`}
        alt={alt || asset?.title || "Corporate event in Punta Cana"}
        className={`${className} object-cover`}
        loading={loading}
      />
    );
  }
  return null;
};

const CaseStudyGallery = ({ images, client }) => {
  const visibleImages = (images || []).slice(0, 5);
  if (!visibleImages.length) return null;
  return (
    <div
      className="grid grid-cols-2 gap-2 md:gap-3"
      aria-label={`${client} event gallery`}
    >
      {visibleImages.map((asset, index) => (
        <EventImage
          key={`${client}-${index}`}
          asset={asset}
          alt={`${client} corporate event in Punta Cana ${index + 1}`}
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

const ProposalForm = ({ copy, whatsappUrl, isSpanish }) => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok)
        throw new Error(`Submission failed: ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const resetError = () => {
    if (status === "error") setStatus("idle");
  };

  const labels = isSpanish
    ? {
        name: "Nombre y apellido",
        company: "Empresa",
        email: "Correo corporativo",
        phone: "Teléfono / WhatsApp",
        date: "Fecha o fecha aproximada",
        guests: "Cantidad estimada de invitados",
        venue: "Hotel o sede, si ya lo sabe",
        details: "Cuéntenos sobre su evento",
        budget: "Presupuesto estimado (opcional)",
        select: "Seleccione un rango",
        privacy:
          "Al enviar este formulario, autoriza a Sertuin Events a contactarle sobre esta solicitud.",
      }
    : {
        name: "Full name",
        company: "Company",
        email: "Work email",
        phone: "Phone / WhatsApp",
        date: "Date or approximate date",
        guests: "Estimated guest count",
        venue: "Hotel or venue, if known",
        details: "Tell us about your event",
        budget: "Estimated budget (optional)",
        select: "Select a range",
        privacy:
          "By submitting, you authorize Sertuin Events to contact you about this inquiry.",
      };

  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      id="proposal-form"
      name="contact"
      method="POST"
      action="/contact/thankyou/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      onChange={resetError}
      className="rounded-sm bg-white p-6 shadow-2xl shadow-slate-950/15 md:p-10"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="source" value="Corporate Event Planner page" />
      <input
        type="hidden"
        name="subject"
        value="New corporate event proposal request"
      />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
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
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.date} *
          <input
            className={inputClass}
            type="text"
            name="event-date"
            placeholder={
              isSpanish ? "Ej. octubre de 2027" : "e.g. October 2027"
            }
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
          {labels.budget}
          <select
            className={inputClass}
            name="estimated-budget"
            defaultValue=""
          >
            <option value="">{labels.select}</option>
            <option value="Under USD 15,000">Under USD 15,000</option>
            <option value="USD 15,000–30,000">USD 15,000–30,000</option>
            <option value="USD 30,000–60,000">USD 30,000–60,000</option>
            <option value="USD 60,000–100,000">USD 60,000–100,000</option>
            <option value="USD 100,000+">USD 100,000+</option>
            <option value="To be defined">
              {isSpanish ? "Por definir" : "To be defined"}
            </option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-slate-950 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "submitting"
          ? isSpanish
            ? "Enviando…"
            : "Sending…"
          : copy.submit}
        {status !== "submitting" && <ArrowRight size={18} aria-hidden="true" />}
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-slate-500">
        {labels.privacy}
      </p>

      <div aria-live="polite">
        {status === "success" && (
          <div className="mt-6 border-l-4 border-emerald-600 bg-emerald-50 p-4 text-emerald-950">
            <p className="font-montserrat font-semibold">{copy.successTitle}</p>
            <p className="mt-1 font-montserrat text-sm leading-6">
              {copy.successBody}
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-6 border-l-4 border-red-600 bg-red-50 p-4 text-red-950">
            <p className="font-montserrat text-sm leading-6">{copy.error}</p>
            <a
              className="mt-2 inline-flex font-montserrat text-sm font-semibold underline"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </form>
  );
};

const CorporateEventPlanner = ({
  page,
  gallery,
  carousel,
  generalInfo,
  language,
}) => {
  const isSpanish = language === "es";
  const content = useMemo(
    () => getCorporateEventContent(language, page?.paragraph3?.raw),
    [language, page?.paragraph3?.raw],
  );
  const heroImage = page?.heroImageList?.[0];
  const organonImages = carousel?.images || [];
  const mideaImages = gallery?.images || [];
  const telephone = (generalInfo?.telephone || "").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    isSpanish
      ? "Hola, me gustaría hablar sobre un evento corporativo en Punta Cana."
      : "Hello, I would like to discuss a corporate event in Punta Cana.",
  )}`;
  const servicesLine =
    page?.sectionTitle ||
    (isSpanish
      ? "Planificación · Proveedores · Personal · Catering · Logística · Producción · Gestión en sitio"
      : "Planning · Vendors · Staffing · Catering · Logistics · Production · On-Site Management");

  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[780px] bg-slate-950 md:min-h-[760px] lg:min-h-[820px]">
        <div className="absolute inset-0 overflow-hidden">
          <EventImage
            asset={heroImage}
            alt={heroImage?.title || "Corporate event production in Punta Cana"}
            className="h-full w-full"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

        <div className="relative mx-auto flex min-h-[780px] max-w-7xl items-center px-6 pb-16 pt-36 md:min-h-[760px] md:px-10 lg:min-h-[820px] lg:px-12">
          <div className="max-w-4xl">
            <p className="mb-5 font-montserrat text-xs font-semibold uppercase tracking-[0.26em] text-amber-300 md:text-sm">
              {content.eyebrow}
            </p>
            <h1 className="max-w-4xl font-crimson text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              {page?.heroHeading ||
                (isSpanish
                  ? "Planificación y gestión de eventos corporativos en Punta Cana"
                  : "Corporate Event Planner & Management in Punta Cana")}
            </h1>
            <p className="mt-7 max-w-2xl font-montserrat text-lg leading-8 text-slate-100 md:text-xl">
              {page?.heroHeading2 ||
                (isSpanish
                  ? "Un equipo local para planificar, coordinar y gestionar su evento corporativo de principio a fin."
                  : "One local team to plan, coordinate and manage your corporate event from start to finish.")}
            </p>
            <p className="mt-5 max-w-3xl font-montserrat text-sm font-medium leading-7 text-amber-100 md:text-base">
              {servicesLine}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#proposal-form"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-amber-600 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline transition hover:bg-amber-500"
              >
                {content.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/60 bg-white/5 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {content.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-12">
          {content.trustItems.map((item, index) => (
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
            eyebrow={content.eyebrow}
            title={content.introduction.title}
            align="left"
          />
          <p className="max-w-2xl font-montserrat text-lg leading-8 text-slate-600">
            {content.introduction.body}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title={content.workModesTitle}
            intro={content.workModesIntro}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {content.workModes.map((mode, index) => (
              <article
                key={mode.title}
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
            title={content.servicesTitle}
            intro={content.servicesIntro}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <article
                  key={service.title}
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
            title={content.processTitle}
            intro={content.processIntro}
          />
          <ol className="relative mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {content.process.map((step, index) => (
              <li
                key={step.title}
                className="relative border-t border-slate-300 pt-8"
              >
                <span className="absolute -top-4 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 font-montserrat text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-crimson text-2xl font-medium text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 font-montserrat text-sm leading-6 text-slate-600">
                  {step.description}
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
              {content.budget.eyebrow}
            </p>
            <h2 className="mt-3 font-crimson text-4xl font-medium leading-tight text-slate-950 md:text-6xl">
              {content.budget.title}
            </h2>
            <p className="mt-6 max-w-2xl font-montserrat text-base leading-7 text-slate-900/80">
              {content.budget.body}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.budget.points.map((point) => (
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
              {content.budget.changeTitle}
            </h3>
            <p className="mt-4 font-montserrat text-sm leading-7 text-slate-600">
              {content.budget.changeBody}
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <EventImage
              asset={organonImages[0] || heroImage}
              alt="On-site corporate event management in Punta Cana"
              className="h-[480px] w-full md:h-[620px]"
            />
            <div className="absolute bottom-0 right-0 max-w-xs bg-slate-950 p-6 text-white md:p-8">
              <CalendarRange
                className="text-amber-400"
                size={28}
                aria-hidden="true"
              />
              <p className="mt-4 font-montserrat text-sm font-semibold leading-6">
                {content.onsite.points[0]}
              </p>
            </div>
          </div>
          <div className="lg:pl-10">
            <SectionHeader
              eyebrow={content.onsite.eyebrow}
              title={content.onsite.title}
              align="left"
            />
            <p className="mt-6 font-montserrat text-base leading-8 text-slate-600">
              {content.onsite.body}
            </p>
            <ul className="mt-7 space-y-4">
              {content.onsite.points.map((point) => (
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
            title={content.experienceTitle}
            intro={content.experienceIntro}
          />
          <div className="mt-16 space-y-24">
            {content.caseStudies.map((study, index) => {
              const images =
                study.key === "organon" ? organonImages : mideaImages;
              return (
                <article
                  key={study.key}
                  className="grid gap-10 lg:grid-cols-2 lg:items-center"
                >
                  <div className={index % 2 ? "lg:order-2" : ""}>
                    <CaseStudyGallery images={images} client={study.client} />
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
                      {study.facts.map((fact) => (
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
                    {study.key === "organon" && page?.videoUrl && (
                      <div className="mt-8 aspect-video overflow-hidden bg-slate-950">
                        <ReactPlayer
                          url={page.videoUrl}
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
          <SectionHeader title={content.whyTitle} />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {content.whyItems.map((item, index) => {
              const Icon = whyIcons[index % whyIcons.length];
              return (
                <article key={item.title} className="flex gap-5">
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
          <SectionHeader title={content.eventTypesTitle} align="left" light />
          <ul className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 md:grid-cols-3">
            {content.eventTypes.map((type) => (
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
            eyebrow={content.venueStrategy.eyebrow}
            title={content.venueStrategy.title}
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
                {content.venueStrategy.resortTitle}
              </h3>
              <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
                {content.venueStrategy.resortBody}
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
                {content.venueStrategy.independentTitle}
              </h3>
              <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
                {content.venueStrategy.independentBody}
              </p>
            </article>
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center font-montserrat text-base font-semibold leading-7 text-slate-800">
            {content.venueStrategy.closing}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeader title={content.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
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
              eyebrow={content.form.eyebrow}
              title={content.form.title}
              align="left"
            />
            <p className="mt-6 font-montserrat text-base leading-8 text-slate-900/80">
              {content.form.intro}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 font-montserrat text-sm font-bold uppercase tracking-[0.12em] text-slate-950 underline decoration-slate-950/30 underline-offset-8"
            >
              <MessageCircle size={20} aria-hidden="true" />
              {content.secondaryCta}
            </a>
          </div>
          <ProposalForm
            copy={content.form}
            whatsappUrl={whatsappUrl}
            isSpanish={isSpanish}
          />
        </div>
      </section>
    </main>
  );
};

export default CorporateEventPlanner;
