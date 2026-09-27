import { recordConfirmedInquiry } from "../../utils/leadAnalytics";
import React, { useMemo, useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import esPhoneLabels from "react-phone-number-input/locale/es.json";
import frPhoneLabels from "react-phone-number-input/locale/fr.json";
import ptPhoneLabels from "react-phone-number-input/locale/pt.json";
import "react-phone-number-input/style.css";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  HeartHandshake,
  MailCheck,
  Palmtree,
  ShieldCheck,
  ShipWheel,
} from "lucide-react";

import { elopementFormContent } from "../../content/elopementFormContent";
import { cardIcon } from "../../utils/cardIcons";
import { localizedPath } from "../../utils/siteLocales";

// The price builder's choices from this language's Elopement Page, each with
// the price of its linked Elopement Price. Settings are identified by their
// setting (beach or catamaran); décor by its key in the page.
export const elopementChoices = (page) => ({
  experiences: (page.experiences || [])
    .filter((item) => item.option)
    .map((item) => ({
      ...item,
      id: item.option.setting,
      price: item.option.price,
    })),
  decorations: (page.decorations || [])
    .filter((item) => item.option)
    .map((item) => ({
      ...item,
      id: item._key,
      price: item.option.price,
      catamaran: item.option.catamaranAllowed !== false,
    })),
  legal: page.legalUpgrade
    ? { ...page.legalUpgrade, price: page.legalUpgrade.option?.price || 0 }
    : { price: 0 },
});

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

// The legal upgrade's price as each language writes it: +US$1,200,
// +US$ 1.200 (pt) or +1 200 USD (fr).
const upgradePrice = (value, language) => {
  const group = (separator) =>
    String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  if (language === "pt") return `+US$ ${group(".")}`;
  if (language === "fr") return `+${group(" ")} USD`;
  return `+US$${group(",")}`;
};

// Sanity serves each photo at the width asked for.
const sized = (url, width) => `${url}?w=${width}`;
const srcSet = (url, widths) =>
  widths.map((width) => `${sized(url, width)} ${width}w`).join(", ");

const scrollToSection = (event, id) => {
  event.preventDefault();

  if (typeof document === "undefined") return;

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${id}`);
  }
};

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "center",
  dark = false,
}) => (
  <div
    className={`mx-auto max-w-3xl ${align === "left" ? "text-left" : "text-center"}`}
  >
    <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
      {eyebrow}
    </p>
    <h2
      className={`mt-3 font-crimson text-4xl font-normal leading-tight md:text-5xl ${
        dark ? "text-white" : "text-stone-900"
      }`}
    >
      {title}
    </h2>
    {intro && (
      <p
        className={`mt-5 font-montserrat text-base leading-7 md:text-lg ${
          dark ? "text-stone-300" : "text-stone-600"
        }`}
      >
        {intro}
      </p>
    )}
  </div>
);

const ExperienceCard = ({ experience, page, active, onSelect }) => {
  const Icon = experience.id === "catamaran" ? ShipWheel : Palmtree;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group w-full rounded-3xl border p-6 text-left transition md:p-8 ${
        active
          ? "border-amber-500 bg-amber-50 shadow-[0_18px_45px_rgba(120,89,20,0.12)]"
          : "border-stone-200 bg-white hover:border-amber-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-white p-3 text-amber-700 shadow-sm">
          <Icon size={24} strokeWidth={1.6} />
        </span>
        <span
          className={`rounded-full px-3 py-1 font-montserrat text-xs font-semibold uppercase tracking-wider ${
            active ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-600"
          }`}
        >
          {active ? page.selectedLabel : page.selectLabel}
        </span>
      </div>
      <p className="mt-5 font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        {experience.eyebrow}
      </p>
      <h3 className="mt-2 font-crimson text-3xl text-stone-900">
        {experience.title}
      </h3>
      <p className="mt-2 font-montserrat text-sm leading-6 text-stone-600">
        {experience.summary}
      </p>
      <div className="mt-5 flex items-end justify-between border-t border-stone-200 pt-5">
        <span className="font-montserrat text-xs uppercase tracking-wider text-stone-500">
          {page.fromLabel}
        </span>
        <span className="font-crimson text-3xl text-stone-900">
          {money(experience.price)}
        </span>
      </div>
    </button>
  );
};

const DecorCard = ({ decoration, page, active, disabled, onSelect }) => {
  const [photo, setPhoto] = useState(0);
  const photos = decoration.photos || [];
  const current = photos[photo];
  const name = decoration.name;
  const label = (template) => (template || "").replace("{name}", name);

  const changePhoto = (direction) => {
    setPhoto((index) => (index + direction + photos.length) % photos.length);
  };

  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-white transition ${
        active
          ? "border-amber-500 shadow-[0_18px_45px_rgba(120,89,20,0.13)]"
          : "border-stone-200"
      } ${disabled ? "opacity-55" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {current?.asset?.url && (
          <img
            src={current.asset.url}
            alt={current.alt}
            loading="lazy"
            width="1600"
            height="1200"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <button
            type="button"
            onClick={() => changePhoto(-1)}
            aria-label={label(page.previousPhotoLabel)}
            className="pointer-events-auto rounded-full bg-white/90 p-2 text-stone-800 shadow backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="rounded-full bg-stone-950/70 px-3 py-1 font-montserrat text-xs text-white backdrop-blur">
            {photo + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={() => changePhoto(1)}
            aria-label={label(page.nextPhotoLabel)}
            className="pointer-events-auto rounded-full bg-white/90 p-2 text-stone-800 shadow backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-crimson text-2xl leading-tight text-stone-900">
            {name}
          </h3>
          <span className="whitespace-nowrap font-crimson text-2xl text-amber-700">
            +{money(decoration.price)}
          </span>
        </div>
        <p className="mt-3 min-h-[4.5rem] font-montserrat text-sm leading-6 text-stone-600">
          {decoration.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 font-montserrat text-xs text-stone-600">
          <span className="rounded-full bg-stone-100 px-3 py-1.5">
            {page.realTouchLabel}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1.5">
            {decoration.catamaran
              ? page.beachAndCatamaranLabel
              : page.beachOnlyLabel}
          </span>
        </div>
        {disabled && (
          <p className="mt-3 font-montserrat text-xs font-semibold text-rose-700">
            {page.unavailableCatamaran}
          </p>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onSelect}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-montserrat text-sm font-semibold transition ${
            active
              ? "bg-amber-500 text-white"
              : "border border-stone-300 text-stone-800 hover:border-amber-500"
          } disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400`}
        >
          {active ? <Check size={17} /> : null}
          {active ? page.selectedLabel : page.selectLabel}
        </button>
      </div>
    </article>
  );
};

const Summary = ({
  page,
  experience,
  decoration,
  legal,
  upgrade,
  customQuote,
}) => {
  const total =
    experience.price + decoration.price + (legal ? upgrade.price : 0);

  return (
    <aside className="rounded-3xl bg-stone-950 p-6 text-white shadow-2xl md:p-8 lg:sticky lg:top-6">
      <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
        {page.estimateTitle}
      </p>
      <div className="mt-6 space-y-4 font-montserrat text-sm">
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{page.experienceLine}</span>
          <span className="text-right">
            {experience.title}
            <strong className="block text-base">
              {money(experience.price)}
            </strong>
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{page.decorLine}</span>
          <span className="text-right">
            {decoration.name}
            <strong className="block text-base">
              {money(decoration.price)}
            </strong>
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">
            {legal ? page.legalLine : page.symbolicTitle}
          </span>
          <strong>{legal ? money(upgrade.price) : page.includedLabel}</strong>
        </div>
      </div>
      <div className="mt-6 border-t border-white/20 pt-6">
        {customQuote ? (
          <>
            <p className="font-crimson text-3xl text-amber-300">
              {page.customQuote}
            </p>
            <p className="mt-3 font-montserrat text-sm leading-6 text-stone-300">
              {page.customQuoteText}
            </p>
          </>
        ) : (
          <p className="font-crimson text-5xl text-amber-300">{money(total)}</p>
        )}
        <p className="mt-3 font-montserrat text-xs leading-5 text-stone-400">
          {page.totalNote}
        </p>
      </div>
      <a
        href="#reserve"
        onClick={(event) => scrollToSection(event, "reserve")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3.5 font-montserrat text-sm font-bold text-white transition hover:bg-amber-600"
      >
        {page.reserveSelection}
        <ArrowRight size={17} />
      </a>
    </aside>
  );
};

const ElopementForm = ({
  page,
  experience,
  decoration,
  legal,
  upgrade,
  guestCount,
  setGuestCount,
  language,
}) => {
  const [status, setStatus] = useState("idle");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const form = elopementFormContent[language] || elopementFormContent["en-US"];
  const total =
    experience.price + decoration.price + (legal ? upgrade.price : 0);
  const customQuote = experience.id === "catamaran" && guestCount > 10;
  const phoneCountry = parsePhoneNumber(phone || "")?.country || "";
  const ceremony = legal ? upgrade.title : page.symbolicTitle;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!phoneCountry || !phone || !isPossiblePhoneNumber(phone)) {
      setStatus("error");
      setFormError(form.phoneError);
      return;
    }

    setStatus("sending");
    const formElement = event.currentTarget;

    try {
      const formData = new FormData(formElement);
      formData.set("whatsapp", phone);
      formData.set("phone-country", phoneCountry);
      const validationPayload = Object.fromEntries(formData.entries());
      validationPayload["validate-only"] = true;
      const validationResponse = await fetch(
        "/.netlify/functions/elopementRequest",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validationPayload),
        },
      );
      const validationResult = await validationResponse
        .json()
        .catch(() => ({}));

      if (!validationResponse.ok) {
        throw new Error(validationResult.error || "Form validation failed");
      }

      const formResponse = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!formResponse.ok) {
        throw new Error("Form submission failed");
      }

      formElement.reset();
      setPhone("");
      recordConfirmedInquiry("elopement-request");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setFormError(
        /email/i.test(error.message)
          ? form.emailError
          : /phone/i.test(error.message)
            ? form.phoneError
            : form.error,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <MailCheck
          className="mx-auto text-emerald-700"
          size={40}
          strokeWidth={1.5}
        />
        <h3 className="mt-4 font-crimson text-3xl text-stone-900">
          {page.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-xl font-montserrat text-sm leading-6 text-stone-700">
          {page.successText}
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-montserrat text-sm text-stone-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      name="elopement-request"
      method="POST"
      action={localizedPath("/contact/thankyou/", language)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(74,56,18,0.09)] md:p-8"
    >
      <input type="hidden" name="form-name" value="elopement-request" />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="experience" value={experience.title} />
      <input type="hidden" name="decoration" value={decoration.name} />
      <input type="hidden" name="ceremony" value={ceremony} />
      <input
        type="hidden"
        name="estimated-total"
        value={customQuote ? page.customQuote : money(total)}
      />
      <p className="hidden">
        <label>
          {form.honeypot}
          <input name="bot-field" />
        </label>
      </p>

      <div className="mb-7 rounded-2xl bg-amber-50 p-5">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-wider text-amber-800">
          {page.selectedLabel}
        </p>
        <p className="mt-2 font-crimson text-2xl text-stone-900">
          {experience.title} + {decoration.name}
        </p>
        <p className="mt-1 font-montserrat text-sm text-stone-600">
          {customQuote ? page.customQuote : money(total)} · {ceremony}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {form.names}
          <input
            className={inputClass}
            type="text"
            name="couple-names"
            minLength="2"
            maxLength="160"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {form.email}
          <input
            className={inputClass}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            maxLength="200"
            pattern="^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$"
            required
          />
        </label>
        <div className="font-montserrat text-sm font-semibold text-stone-700">
          <span>{form.whatsapp}</span>
          <PhoneInput
            international
            labels={
              language === "pt"
                ? ptPhoneLabels
                : language === "fr"
                  ? frPhoneLabels
                  : language === "es"
                    ? esPhoneLabels
                    : undefined
            }
            name="whatsapp"
            value={phone}
            onChange={(value) => {
              setPhone(value || "");
              if (status === "error") {
                setStatus("idle");
                setFormError("");
              }
            }}
            countrySelectProps={{
              "aria-label": form.phoneCountry,
              required: true,
            }}
            numberInputProps={{
              className:
                "w-full bg-transparent px-3 py-3 font-montserrat text-sm text-stone-900 outline-none",
              autoComplete: "tel",
              inputMode: "tel",
            }}
            className="mt-2 rounded-xl border border-stone-300 bg-white px-3 transition focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100"
            required
          />
          <input type="hidden" name="phone-country" value={phoneCountry} />
        </div>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {form.date}
          <input className={inputClass} type="date" name="date" required />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {form.guests}
          <input
            className={inputClass}
            type="number"
            name="guests"
            min="2"
            max={experience.id === "catamaran" ? "60" : undefined}
            value={guestCount}
            onChange={(event) =>
              setGuestCount(
                Math.max(
                  2,
                  Math.min(
                    experience.id === "catamaran" ? 60 : 999,
                    Number(event.target.value) || 2,
                  ),
                ),
              )
            }
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {form.hotel}
          <input
            className={inputClass}
            type="text"
            name="hotel"
            maxLength="200"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {form.message}{" "}
          <span className="font-normal text-stone-500">({form.optional})</span>
          <textarea
            className={inputClass}
            name="message"
            rows="4"
            maxLength="2000"
          />
        </label>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 font-montserrat text-sm font-semibold text-rose-700"
        >
          {formError || form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-4 font-montserrat text-sm font-bold text-white transition hover:bg-amber-600 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? form.sending : page.formSubmitLabel}
        <ArrowRight size={18} />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-stone-500">
        {page.formNotice}
      </p>
    </form>
  );
};

// Every section of the elopement page from this language's Elopement Page
// document in Sanity; prices from the linked Elopement Prices.
const ElopementExperience = ({ page, language = "en-US" }) => {
  const {
    experiences,
    decorations,
    legal: upgrade,
  } = useMemo(() => elopementChoices(page), [page]);
  const [experienceId, setExperienceId] = useState("beach");
  const [decorationId, setDecorationId] = useState(decorations[0]?.id);
  const [legal, setLegal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const hero = page.heroImage?.asset;

  const experience =
    experiences.find((item) => item.id === experienceId) || experiences[0];
  const decoration =
    decorations.find((item) => item.id === decorationId) || decorations[0];
  if (!experience || !decoration) return null;
  const customQuote = experience.id === "catamaran" && guestCount > 10;

  const selectExperience = (id) => {
    setExperienceId(id);
    if (id === "catamaran") {
      setGuestCount((current) => Math.min(current, 60));
    }
    if (id === "catamaran" && !decoration.catamaran) {
      setDecorationId(decorations.find((item) => item.catamaran)?.id);
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="absolute left-0 top-0 h-screen w-full bg-stone-900">
        {hero?.url && (
          <img
            src={sized(hero.url, 1600)}
            srcSet={srcSet(hero.url, [480, 960, 1600, 2400])}
            sizes="100vw"
            alt={page.heroImage.alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={hero.metadata?.dimensions?.width}
            height={hero.metadata?.dimensions?.height}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end justify-center px-5 pb-[14vh] text-center md:px-10 md:pb-[16vh]">
          <h1 className="max-w-5xl font-crimson text-5xl font-normal leading-[1.02] text-white md:text-7xl lg:text-8xl">
            {page.heroTitle}
          </h1>
        </div>
      </section>
      <div className="h-[90vh]" aria-hidden="true" />

      <section
        id="builder"
        className="scroll-mt-6 bg-stone-50 px-5 py-20 md:px-10 md:py-24"
      >
        <SectionHeading
          eyebrow={page.builderEyebrow}
          title={page.builderTitle}
          intro={page.builderIntro}
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {(page.formula || []).map((item, index) => (
            <React.Fragment key={item}>
              <div className="rounded-2xl border border-stone-200 bg-white px-5 py-5 text-center font-montserrat text-sm font-semibold text-stone-800">
                {item}
              </div>
              {index < page.formula.length - 1 && (
                <span className="text-center font-crimson text-3xl text-amber-600">
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <h2 className="font-crimson text-3xl text-stone-900">
            {page.stepOne}
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {experiences.map((item) => (
              <ExperienceCard
                key={item._key}
                experience={item}
                page={page}
                active={experience.id === item.id}
                onSelect={() => selectExperience(item.id)}
              />
            ))}
          </div>
        </div>

        {experience.id === "catamaran" && (
          <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-sky-200 bg-sky-50 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <label
                htmlFor="catamaran-guests"
                className="font-montserrat text-sm font-bold text-stone-900"
              >
                {page.guestsLabel}
              </label>
              <p className="mt-1 font-montserrat text-sm text-stone-600">
                {page.guestsHelp}
              </p>
            </div>
            <input
              id="catamaran-guests"
              type="number"
              min="2"
              max="60"
              value={guestCount}
              onChange={(event) =>
                setGuestCount(
                  Math.max(2, Math.min(60, Number(event.target.value) || 2)),
                )
              }
              className="mt-4 w-28 rounded-xl border border-sky-300 bg-white px-4 py-3 font-montserrat text-lg font-bold outline-none focus:border-amber-500 md:mt-0"
            />
          </div>
        )}

        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="font-crimson text-3xl text-stone-900">
            {page.stepTwo}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {decorations.map((item) => (
              <DecorCard
                key={item.id}
                decoration={item}
                page={page}
                active={decoration.id === item.id}
                disabled={experience.id === "catamaran" && !item.catamaran}
                onSelect={() => setDecorationId(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <h2 className="font-crimson text-3xl text-stone-900">
              {page.stepThree}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setLegal(false)}
                className={`rounded-3xl border p-6 text-left transition ${
                  !legal
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <HeartHandshake
                    className="text-amber-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                  {!legal && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 font-montserrat text-xs font-bold text-white">
                      {page.selectedLabel}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-crimson text-3xl text-stone-900">
                  {page.symbolicTitle}
                </h3>
                <p className="mt-1 font-montserrat text-xs font-bold uppercase tracking-wider text-amber-700">
                  {page.symbolicIncluded}
                </p>
                <p className="mt-4 font-montserrat text-sm leading-6 text-stone-600">
                  {page.symbolicChoiceText}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setLegal(true)}
                className={`rounded-3xl border p-6 text-left transition ${
                  legal
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <FileCheck2
                    className="text-amber-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                  {legal && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 font-montserrat text-xs font-bold text-white">
                      {page.selectedLabel}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <h3 className="font-crimson text-3xl text-stone-900">
                    {upgrade.title}
                  </h3>
                  <span className="font-crimson text-2xl text-amber-700">
                    {upgradePrice(upgrade.price, language)}
                  </span>
                </div>
                <p className="mt-4 font-montserrat text-sm leading-6 text-stone-600">
                  {upgrade.choiceText}
                </p>
                <p className="mt-3 font-montserrat text-xs font-semibold leading-5 text-rose-700">
                  {upgrade.caution}
                </p>
              </button>
            </div>
          </div>
          <Summary
            page={page}
            experience={experience}
            decoration={decoration}
            legal={legal}
            upgrade={upgrade}
            customQuote={customQuote}
          />
        </div>
      </section>

      <section
        id="included"
        className="scroll-mt-6 px-5 py-20 md:px-10 md:py-28"
      >
        <SectionHeading
          eyebrow={page.includedEyebrow}
          title={page.includedTitle}
          intro={page.includedIntro}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(page.inclusions || []).map((item) => {
            const Icon = cardIcon(item.icon);
            return (
              <article
                key={item._key}
                className="rounded-3xl border border-stone-200 p-6"
              >
                <Icon className="text-amber-700" size={27} strokeWidth={1.5} />
                <h3 className="mt-5 font-crimson text-2xl text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-2 font-montserrat text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-stone-950 px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={page.legalEyebrow}
            title={page.legalTitle}
            intro={page.legalIntro}
            dark
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-white/15 bg-white/5 p-7 md:p-9">
              <HeartHandshake
                className="text-amber-300"
                size={32}
                strokeWidth={1.4}
              />
              <h3 className="mt-5 font-crimson text-3xl">
                {page.symbolicTitle}
              </h3>
              <p className="mt-2 font-montserrat text-sm font-bold uppercase tracking-wider text-amber-300">
                {page.symbolicIncluded}
              </p>
              <p className="mt-5 font-montserrat text-sm leading-7 text-stone-300">
                {page.symbolicText}
              </p>
            </article>
            <article className="rounded-3xl border border-amber-400/40 bg-amber-400/10 p-7 md:p-9">
              <FileCheck2
                className="text-amber-300"
                size={32}
                strokeWidth={1.4}
              />
              <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-crimson text-3xl">{upgrade.title}</h3>
                <span className="font-crimson text-3xl text-amber-300">
                  {upgradePrice(upgrade.price, language)}
                </span>
              </div>
              <p className="mt-5 font-montserrat text-sm leading-7 text-stone-200">
                {upgrade.text}
              </p>
              <p className="mt-4 flex gap-2 font-montserrat text-xs font-semibold leading-5 text-amber-200">
                <ShieldCheck className="shrink-0" size={18} /> {upgrade.caution}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={page.realEyebrow}
          title={page.realTitle}
          intro={page.realIntro}
        />
        <div className="mx-auto mt-12 max-w-6xl columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
          {(page.galleryPhotos || [])
            .filter((image) => image.asset?.url)
            .map((image) => (
              <figure
                key={image._key}
                className="mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-stone-100 md:mb-5"
                style={{ contentVisibility: "auto" }}
              >
                <img
                  src={sized(image.asset.url, 960)}
                  srcSet={srcSet(image.asset.url, [480, 960, 1600])}
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  width={image.asset.metadata?.dimensions?.width}
                  height={image.asset.metadata?.dimensions?.height}
                  className="h-auto w-full"
                />
              </figure>
            ))}
        </div>
      </section>

      <section
        id="reserve"
        className="scroll-mt-6 bg-stone-50 px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={page.reserveEyebrow}
              title={page.reserveTitle}
              intro={page.reserveIntro}
              align="left"
            />
            <h3 className="mt-10 font-crimson text-3xl text-stone-900">
              {page.paymentTitle}
            </h3>
            <ol className="mt-6 space-y-5">
              {(page.paymentSteps || []).map((step, index) => (
                <li key={step._key} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-montserrat text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-montserrat text-sm font-bold text-stone-900">
                      {step.title}
                    </h4>
                    <p className="mt-1 font-montserrat text-sm leading-6 text-stone-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-montserrat text-sm font-semibold leading-6 text-rose-800">
              <ShieldCheck className="shrink-0" size={21} />{" "}
              {page.depositNotice}
            </p>
          </div>
          <ElopementForm
            page={page}
            experience={experience}
            decoration={decoration}
            legal={legal}
            upgrade={upgrade}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            language={language}
          />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={page.faqEyebrow}
          title={page.faqTitle}
          intro={page.faqIntro}
        />
        <div className="mx-auto mt-12 max-w-4xl divide-y divide-stone-200 border-y border-stone-200">
          {(page.faqs || []).map((faq) => (
            <details key={faq._key} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-crimson text-xl text-stone-900 md:text-2xl">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 font-montserrat text-lg text-amber-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 font-montserrat text-sm leading-7 text-stone-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ElopementExperience;
