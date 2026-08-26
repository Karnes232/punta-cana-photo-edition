import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { withSizes } from "../../utils/imageSizes";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MailCheck,
  MessageCircle,
  Phone,
} from "lucide-react";
import React, { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getHomeContent } from "../../content/homeContent";
import { trackFormError, trackFormSuccess } from "../../utils/analytics";

const legacyRoutes = new Set([
  "/punta-cana-bachelor-party/",
  "/weddings-punta-cana/",
  "/photo-gallery/",
  "/real-estate-photography/",
  "/videos-and-comercial-photos/",
  "/event-rentals/",
  "/birthday-celebrations/",
  "/floral-art/",
  "/packages/photography-event-planner/",
  "/packages/videography-event-planner/",
]);

const currentRouteAliases = new Map([
  ["/gender-reveal-and-baby-showers/", "/gender-reveal-punta-cana/"],
]);

const normalizeInternalPath = (path) => {
  if (!path || path.startsWith("#") || path.startsWith("http")) return path;
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
  return currentRouteAliases.get(normalized) || normalized;
};

const localizedPath = (path, language) => {
  if (!path || path.startsWith("#") || path.startsWith("http")) return path;
  const normalizedPath = normalizeInternalPath(path);
  if (language !== "es" || normalizedPath.startsWith("/es/")) {
    return normalizedPath;
  }
  return normalizedPath === "/" ? "/es/" : `/es${normalizedPath}`;
};

const RichTextBlock = ({ context, fallbackParagraphs, fallbackItems }) => {
  if (!context?.raw) {
    return (
      <>
        {fallbackParagraphs?.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-5 font-montserrat text-base leading-8 text-gray-700 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
        {fallbackItems?.length > 0 && (
          <ul className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {fallbackItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-white px-5 py-5 font-montserrat text-sm font-semibold leading-6 text-gray-800"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-primary-color"
                  size={18}
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (children) => (
        <strong className="font-semibold text-black">{children}</strong>
      ),
      [MARKS.ITALIC]: (children) => <em>{children}</em>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mt-5 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h3 className="mt-8 font-crimson text-3xl font-medium text-black">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="mt-7 font-crimson text-2xl font-medium text-black">
          {children}
        </h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="mt-8 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="mt-8 grid gap-4 md:grid-cols-3">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="flex items-start gap-3 bg-white px-5 py-5 font-montserrat text-sm font-semibold leading-6 text-gray-800">
          <Check
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-primary-color"
            size={18}
          />
          <span>{children}</span>
        </li>
      ),
    },
  };

  return documentToReactComponents(JSON.parse(context.raw), options);
};

const getStructuredProcessSteps = (context) => {
  if (!context?.raw) return null;

  try {
    const document = JSON.parse(context.raw);
    const readText = (node) => {
      if (typeof node?.value === "string") return node.value;
      return (node?.content || []).map(readText).join(" ");
    };
    const text = readText(document).replace(/\s+/g, " ").trim();
    const sections = text
      .split(/(?=0[1-3]\s*[—-])/)
      .map((section) => section.trim())
      .filter(Boolean);

    if (sections.length !== 3) return null;

    const steps = sections.map((section) => {
      const match = section.match(/^(\d{2})\s*[—-]\s*([^.!?]+)[.!?]\s*(.+)$/);
      return match
        ? { number: match[1], title: match[2].trim(), body: match[3].trim() }
        : null;
    });

    return steps.every(Boolean) ? steps : null;
  } catch {
    return null;
  }
};

// The cards render in a sm:grid-cols-2 lg:grid-cols-4 grid, so they are about
// 320px wide on desktop rather than the source width.
const CARD_SIZES = "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw";

const ServiceCard = ({ service, language }) => {
  const image = withSizes(
    getImage(service?.cardImage?.gatsbyImage),
    CARD_SIZES,
  );
  const url = localizedPath(service?.page?.url, language);
  const isGenderReveal =
    normalizeInternalPath(service?.page?.url) === "/gender-reveal-punta-cana/";
  const title = isGenderReveal
    ? language === "es"
      ? "Revelación de género"
      : "Gender Reveal"
    : service.typeOfService;
  const description = isGenderReveal
    ? language === "es"
      ? "Diseño, coordinación y ejecución de una revelación personalizada en la locación que elijas en Punta Cana."
      : "Design, coordination and execution of a custom reveal at your chosen Punta Cana location."
    : service.cardDescription;

  if (!image || !url) return null;

  return (
    <article className="group relative min-h-[390px] overflow-hidden bg-black shadow-[0_28px_60px_rgba(0,0,0,0.14)]">
      <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.035]">
        <GatsbyImage
          image={image}
          alt={
            language === "es"
              ? `${title} organizado por Sertuin Events en Punta Cana`
              : `${title} planned by Sertuin Events in Punta Cana`
          }
          className="h-full w-full"
          imgClassName="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
      <div className="relative flex min-h-[390px] flex-col justify-end p-7 md:p-8">
        <h3 className="font-crimson text-3xl font-medium leading-tight text-white">
          {title}
        </h3>
        <p className="mt-3 font-montserrat text-sm leading-6 text-gray-100">
          {description}
        </p>
        <Link
          to={url}
          className="mt-6 inline-flex items-center gap-2 font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-primary-color no-underline"
          aria-label={title}
        >
          {language === "es" ? "Ver servicio" : "Explore service"}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
};

const HomeContactForm = ({ content, language }) => {
  const [status, setStatus] = useState("idle");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const phoneCountry = parsePhoneNumber(phone || "")?.country || "";
  const messages =
    language === "es"
      ? {
          phoneCountry: "Seleccionar país del teléfono",
          phoneError:
            "Ingresa un número de teléfono válido con su código de país.",
          emailError:
            "Ingresa un correo electrónico válido con un dominio activo.",
          sending: "Enviando...",
          successTitle: "Solicitud recibida",
          success:
            "Tu solicitud fue enviada correctamente. Te contactaremos muy pronto.",
          error: "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
        }
      : {
          phoneCountry: "Select phone country",
          phoneError: "Enter a valid phone number with its country code.",
          emailError: "Enter a valid email address with an active domain.",
          sending: "Sending...",
          successTitle: "Request received",
          success:
            "Your request was sent successfully. We will contact you shortly.",
          error: "We could not send your request. Please try again.",
        };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!phoneCountry || !phone || !isPossiblePhoneNumber(phone)) {
      setStatus("error");
      setFormError(messages.phoneError);
      trackFormError(event.currentTarget, "invalid_phone");
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
      formData.set("telephone", phone);
      formData.set("phone-country", phoneCountry);

      const validationPayload = Object.fromEntries(formData.entries());
      validationPayload.whatsapp = phone;
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

      trackFormSuccess(form);
      form.reset();
      setPhone("");
      setStatus("success");
    } catch (error) {
      trackFormError(
        form,
        /email/i.test(error.message)
          ? "invalid_email"
          : /phone/i.test(error.message)
            ? "invalid_phone"
            : "submission_error",
      );
      setStatus("error");
      setFormError(
        /email/i.test(error.message)
          ? messages.emailError
          : /phone/i.test(error.message)
            ? messages.phoneError
            : messages.error,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center border border-white/15 bg-white p-8 text-center text-black shadow-2xl"
      >
        <MailCheck
          aria-hidden="true"
          className="text-primary-color"
          size={44}
        />
        <h3 className="mt-5 font-crimson text-3xl font-medium">
          {messages.successTitle}
        </h3>
        <p className="mt-3 max-w-md font-montserrat text-base leading-7 text-gray-700">
          {messages.success}
        </p>
      </div>
    );
  }

  return (
    <form
      name="home-page"
      method="POST"
      onSubmit={handleSubmit}
      action={
        language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/"
      }
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="border border-white/15 bg-white p-6 text-black shadow-2xl md:p-9"
    >
      <input type="hidden" name="form-name" value="home-page" />
      <input type="hidden" name="source" value="Sertuin Events home page" />
      <input type="hidden" name="subject" value="New event planning inquiry" />
      <input type="hidden" name="phone-country" value={phoneCountry} />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <h3 className="font-crimson text-3xl font-medium">{content.formTitle}</h3>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700">
          {content.name}
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-2 w-full border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          />
        </label>
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700">
          {content.emailLabel}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-2 w-full border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          />
        </label>
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700">
          {content.phone}
          <PhoneInput
            international
            name="telephone"
            value={phone}
            onChange={(value) => {
              setPhone(value || "");
              if (status === "error") {
                setStatus("idle");
                setFormError("");
              }
            }}
            countrySelectProps={{
              "aria-label": messages.phoneCountry,
              required: true,
            }}
            numberInputProps={{
              "aria-label": content.phone,
              className:
                "w-full bg-transparent px-4 py-3 font-montserrat text-base font-normal text-black outline-none",
              autoComplete: "tel",
              inputMode: "tel",
            }}
            className="mt-2 border border-gray-300 bg-white px-3 transition focus-within:border-primary-color focus-within:ring-2 focus-within:ring-primary-color"
            required
          />
        </label>
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700">
          {content.eventType}
          <select
            required
            name="event-type"
            defaultValue=""
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          >
            <option value="" disabled>
              {content.selectEvent}
            </option>
            {content.eventOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700 sm:col-span-2">
          {content.date}
          <input
            required
            type="date"
            name="event-date"
            className="mt-2 w-full border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          />
        </label>
        <label className="font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700 sm:col-span-2">
          {content.details}
          <textarea
            required
            name="additionalInfo"
            rows={5}
            className="mt-2 w-full resize-y border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          />
        </label>
      </div>
      {formError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 font-montserrat text-sm font-semibold text-red-700"
        >
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary-color px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? messages.sending : content.submit}
        <ArrowRight aria-hidden="true" size={18} />
      </button>
    </form>
  );
};

const HomeExperience = ({
  page,
  services,
  featureCard,
  generalInfo,
  language,
}) => {
  const content = getHomeContent(language);
  const heroImage = getImage(page?.heroImageList?.[0]?.gatsbyImage);
  const featureImage = getImage(featureCard?.image?.gatsbyImage);
  const phoneDigits = (generalInfo?.telephone || "+18295222900").replace(
    /\D/g,
    "",
  );
  const phoneDisplay = "+1 829 522 2900";
  const email = generalInfo?.email || "info@sertuinevents.com";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(
    language === "es"
      ? "Hola, quiero información para planificar un evento en Punta Cana."
      : "Hello, I would like information about planning an event in Punta Cana.",
  )}`;
  const orderedServices = [...(services || [])]
    .filter(
      (service) =>
        service?.showOnHome !== false &&
        service?.page?.url &&
        !legacyRoutes.has(normalizeInternalPath(service.page.url)),
    )
    .sort((a, b) => {
      if (Number.isFinite(a.homeOrder) || Number.isFinite(b.homeOrder)) {
        return (a.homeOrder ?? 999) - (b.homeOrder ?? 999);
      }
      const firstIndex = content.serviceOrder.indexOf(
        normalizeInternalPath(a.page.url),
      );
      const secondIndex = content.serviceOrder.indexOf(
        normalizeInternalPath(b.page.url),
      );
      return (
        (firstIndex === -1 ? 999 : firstIndex) -
        (secondIndex === -1 ? 999 : secondIndex)
      );
    });
  const structuredProcessSteps = getStructuredProcessSteps(page?.paragraph2);
  const eventsSectionId = "events-we-plan";
  const contactSectionId = "start-your-event";
  const primaryCtaUrl = page?.primaryCtaUrl || content.primaryCtaUrl;
  const secondaryCtaUrl = page?.secondaryCtaUrl || content.secondaryCtaUrl;

  return (
    <main className="overflow-hidden bg-primary-bg-color text-black">
      <section className="relative min-h-[760px] bg-black md:min-h-[780px]">
        {heroImage && (
          <div className="absolute inset-0">
            <GatsbyImage
              image={heroImage}
              alt={
                language === "es"
                  ? "Evento de destino planificado por Sertuin Events en Punta Cana"
                  : "Destination event planned by Sertuin Events in Punta Cana"
              }
              loading="eager"
              fetchPriority="high"
              className="h-full w-full"
              imgClassName="object-cover object-center"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pb-16 pt-40 md:min-h-[780px] md:px-10 md:pt-44 lg:px-12">
          <div className="max-w-5xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.28em] text-primary-color md:text-sm">
              {page?.heroEyebrow || content.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl font-crimson text-5xl font-medium leading-[0.95] text-white sm:text-6xl md:text-7xl">
              {page?.heroHeading || content.heroHeading}
            </h1>
            <p className="mt-7 max-w-3xl font-montserrat text-base leading-8 text-gray-100 md:text-xl md:leading-9">
              {page?.heroHeading2 || content.heroIntro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryCtaUrl}
                className="inline-flex items-center justify-center gap-2 bg-primary-color px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-black no-underline transition hover:opacity-90"
              >
                {page?.primaryCtaLabel || content.primaryCta}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center justify-center gap-2 border border-white/60 bg-black/20 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                {page?.secondaryCtaLabel || content.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {[
            page?.contactEyebrow || content.availability,
            language === "es"
              ? "Un solo punto de contacto"
              : "One point of contact",
            language === "es"
              ? "Coordinación local en Punta Cana"
              : "Local coordination in Punta Cana",
            language === "es"
              ? "Gestión completa en sitio"
              : "Complete on-site management",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-white px-6 py-5 font-montserrat text-xs font-semibold uppercase tracking-[0.08em] text-gray-800"
            >
              {index === 0 ? (
                <Clock3
                  aria-hidden="true"
                  size={19}
                  className="text-primary-color"
                />
              ) : (
                <Check
                  aria-hidden="true"
                  size={19}
                  className="text-primary-color"
                />
              )}
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id={eventsSectionId} className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
              {content.eventsEyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
              {page?.sectionTitle || content.eventsTitle}
            </h2>
            <p className="mt-6 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
              {content.eventsIntro}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {orderedServices.map((service) => (
              <ServiceCard
                key={`${service.typeOfService}-${service.page.url}`}
                service={service}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
              {content.whatEyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
              {page?.sectionTitle2 || content.whatTitle}
            </h2>
          </div>
          <div>
            <RichTextBlock
              context={page?.paragraph1}
              fallbackParagraphs={content.whatParagraphs}
              fallbackItems={content.whatItems}
            />
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
            {content.processEyebrow}
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="font-crimson text-4xl font-medium leading-tight md:text-6xl">
              {content.processTitle}
            </h2>
            <p className="font-montserrat text-base leading-8 text-gray-300 md:text-lg">
              {content.processIntro}
            </p>
          </div>
          {page?.paragraph2?.raw && !structuredProcessSteps ? (
            <div className="mt-12 border border-white/15 bg-white p-8 text-black md:p-12">
              <RichTextBlock context={page.paragraph2} />
            </div>
          ) : (
            <div className="mt-12 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
              {(structuredProcessSteps || content.process).map((step) => (
                <article key={step.number} className="bg-black p-8 md:p-10">
                  <span className="font-montserrat text-xs font-semibold tracking-[0.2em] text-primary-color">
                    {step.number}
                  </span>
                  <h3 className="mt-7 font-crimson text-3xl font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-montserrat text-sm leading-7 text-gray-300">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary-bg-color px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden bg-white shadow-[0_32px_80px_rgba(0,0,0,0.13)] lg:grid-cols-2">
          <div className="relative min-h-[420px] bg-black lg:min-h-[620px]">
            {featureImage && (
              <div className="absolute inset-0">
                <GatsbyImage
                  image={featureImage}
                  alt={
                    featureCard?.image?.title ||
                    "Sertuin Events managing an event in Punta Cana"
                  }
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
              {featureCard?.secondaryTitle || content.commitmentEyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-5xl">
              {featureCard?.title || content.commitmentTitle}
            </h2>
            {page?.paragraph3?.raw ? (
              <RichTextBlock context={page.paragraph3} />
            ) : (
              <p className="mt-7 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
                {featureCard?.paragraph || content.commitmentBody}
              </p>
            )}
            <a
              href={primaryCtaUrl}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-primary-color pb-2 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-black no-underline"
            >
              {featureCard?.buttonText || content.primaryCta}
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        id={contactSectionId}
        className="bg-black px-6 py-20 text-white md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
              {page?.contactEyebrow || content.contactEyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight md:text-6xl">
              {page?.contactHeading || content.contactTitle}
            </h2>
            <p className="mt-6 font-montserrat text-base leading-8 text-gray-300 md:text-lg">
              {page?.contactBody || content.contactBody}
            </p>
            <div className="mt-9 space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 border-b border-white/15 pb-4 font-montserrat text-sm font-semibold text-white no-underline"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="text-primary-color"
                />
                <span>
                  {content.whatsapp}
                  <small className="mt-1 block font-normal text-gray-400">
                    {phoneDisplay}
                  </small>
                </span>
              </a>
              <a
                href={`tel:+${phoneDigits}`}
                className="flex items-center gap-4 border-b border-white/15 pb-4 font-montserrat text-sm font-semibold text-white no-underline"
              >
                <Phone aria-hidden="true" className="text-primary-color" />
                <span>
                  {content.call}
                  <small className="mt-1 block font-normal text-gray-400">
                    {phoneDisplay}
                  </small>
                </span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 border-b border-white/15 pb-4 font-montserrat text-sm font-semibold text-white no-underline"
              >
                <Mail aria-hidden="true" className="text-primary-color" />
                <span>
                  {content.email}
                  <small className="mt-1 block font-normal text-gray-400">
                    {email}
                  </small>
                </span>
              </a>
              <p className="flex items-center gap-4 font-montserrat text-sm font-semibold text-white">
                <CalendarDays
                  aria-hidden="true"
                  className="text-primary-color"
                />
                {page?.contactEyebrow || content.availability}
              </p>
            </div>
          </div>
          <HomeContactForm content={content} language={language} />
        </div>
      </section>
    </main>
  );
};

export default HomeExperience;
