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
import esPhoneLabels from "react-phone-number-input/locale/es.json";
import frPhoneLabels from "react-phone-number-input/locale/fr.json";
import ptPhoneLabels from "react-phone-number-input/locale/pt.json";
import "react-phone-number-input/style.css";
import { getHomeContent } from "../../content/homeContent";
import { localizedPath as buildLocalizedPath } from "../../utils/siteLocales";

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
  ["/weddings-punta-cana/", "/puntacana-wedding-planner/"],
  ["/elopement-vow-renewal/", "/punta-cana-elopement-packages/"],
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
  return buildLocalizedPath(normalizedPath, language);
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
  const normalizedRoute = normalizeInternalPath(service?.page?.url);
  const isGenderReveal = normalizedRoute === "/gender-reveal-punta-cana/";
  const isWedding = normalizedRoute === "/puntacana-wedding-planner/";
  const isElopement = normalizedRoute === "/punta-cana-elopement-packages/";
  const isCorporate = normalizedRoute === "/event-planner/";
  const isProposal = normalizedRoute === "/proposal/";
  const title = isGenderReveal
    ? language === "pt"
      ? "Chá Revelação"
      : language === "fr"
        ? "Gender Reveal"
        : language === "es"
          ? "Revelación de género"
          : "Gender Reveal"
    : isWedding
      ? language === "pt"
        ? "Planejamento de Casamentos"
        : language === "fr"
          ? "Organisation de Mariages"
          : language === "es"
            ? "Planificación de bodas"
            : "Wedding Planning"
      : isElopement
        ? language === "pt"
          ? "Pacotes de Elopement"
          : language === "fr"
            ? "Forfaits Elopement"
            : language === "es"
              ? "Bodas íntimas"
              : "Elopement Packages"
        : isCorporate
          ? language === "pt"
            ? "Eventos Corporativos"
            : language === "fr"
              ? "Événements d’Entreprise"
              : language === "es"
                ? "Eventos corporativos"
                : "Corporate Events"
          : isProposal
            ? language === "pt"
              ? "Pedidos de Casamento"
              : language === "fr"
                ? "Demandes en Mariage"
                : language === "es"
                  ? "Propuestas de matrimonio"
                  : "Marriage Proposals"
            : service.typeOfService;
  const description = isGenderReveal
    ? language === "pt"
      ? "Design, coordenação e execução de um chá revelação personalizado no local escolhido em Punta Cana."
      : language === "fr"
        ? "Design, coordination et réalisation d’une gender reveal personnalisée dans le lieu de votre choix à Punta Cana."
        : language === "es"
          ? "Diseño, coordinación y ejecución de una revelación personalizada en la locación que elijas en Punta Cana."
          : "Design, coordination and execution of a custom reveal at your chosen Punta Cana location."
    : isWedding
      ? language === "pt"
        ? "Planejamento completo, fornecedores e coordenação local para seu casamento de destino em Punta Cana."
        : language === "fr"
          ? "Organisation complète, gestion des prestataires et coordination locale de votre mariage de destination à Punta Cana."
          : language === "es"
            ? "Planificación integral, proveedores y coordinación local para tu boda de destino en Punta Cana."
            : "Full planning, vendor management and local coordination for your destination wedding in Punta Cana."
      : isElopement
        ? language === "pt"
          ? "Pacotes de elopement em praia ou catamarã privativo, com planejamento local em Punta Cana."
          : language === "fr"
            ? "Forfaits elopement sur plage privée ou catamaran, avec organisation locale à Punta Cana."
            : language === "es"
              ? "Paquetes para bodas íntimas en playa o catamarán privado, con planificación local en Punta Cana."
              : "Private beach and catamaran elopement packages with local planning in Punta Cana."
        : isCorporate
          ? language === "pt"
            ? "Planejamento, produção, fornecedores, logística e gestão no local para eventos corporativos em Punta Cana."
            : language === "fr"
              ? "Organisation, production, prestataires, logistique et gestion sur place pour les événements d’entreprise à Punta Cana."
              : language === "es"
                ? "Planificación, producción, proveedores, logística y gestión en sitio para eventos corporativos en Punta Cana."
                : "Planning, production, vendors, logistics and on-site management for corporate events in Punta Cana."
          : isProposal
            ? language === "pt"
              ? "Pacotes completos de pedido de casamento em Punta Cana, com decoração, fotografia e coordenação local."
              : language === "fr"
                ? "Forfaits complets de demande en mariage à Punta Cana, avec décoration, photographie et coordination locale."
                : language === "es"
                  ? "Paquetes completos de propuestas de matrimonio en Punta Cana con decoración, fotografía y coordinación local."
                  : "Complete Punta Cana marriage proposal packages with décor, photography and local coordination."
            : service.cardDescription;

  if (!image || !url) return null;

  return (
    <article className="group relative min-h-[390px] overflow-hidden bg-black shadow-[0_28px_60px_rgba(0,0,0,0.14)]">
      <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.035]">
        <GatsbyImage
          image={image}
          alt={
            language === "pt"
              ? `${title} organizado pela Sertuin Events em Punta Cana`
              : language === "fr"
                ? `${title} organisé par Sertuin Events à Punta Cana`
                : language === "es"
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
          {language === "pt"
            ? "Ver serviço"
            : language === "fr"
              ? "Voir le service"
              : language === "es"
                ? "Ver servicio"
                : "Explore service"}
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
    language === "pt"
      ? {
          phoneCountry: "Selecionar país do telefone",
          phoneError: "Digite um telefone válido com o código do país.",
          emailError: "Digite um e-mail válido com domínio ativo.",
          sending: "Enviando...",
          successTitle: "Solicitação recebida",
          success:
            "Sua solicitação foi enviada. Entraremos em contato em breve.",
          error: "Não foi possível enviar. Tente novamente.",
        }
      : language === "fr"
        ? {
            phoneCountry: "Sélectionnez le pays du téléphone",
            phoneError:
              "Saisissez un numéro de téléphone valide avec l’indicatif du pays.",
            emailError:
              "Saisissez une adresse e-mail valide avec un domaine actif.",
            sending: "Envoi...",
            successTitle: "Demande reçue",
            success: "Merci. Votre demande a bien été envoyée.",
            error: "Impossible d’envoyer la demande. Veuillez réessayer.",
          }
        : language === "es"
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

      form.reset();
      setPhone("");
      setStatus("success");
    } catch (error) {
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
      action={buildLocalizedPath("/contact/thankyou/", language)}
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
          {language === "pt"
            ? "Não preencha este campo:"
            : language === "fr"
              ? "Ne remplissez pas ce champ :"
              : language === "es"
                ? "No completes este campo:"
                : "Do not fill this out:"}{" "}
          <input name="bot-field" />
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
            labels={
              language === "pt"
                ? ptPhoneLabels
                : language === "fr"
                  ? frPhoneLabels
                  : language === "es"
                    ? esPhoneLabels
                    : undefined
            }
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
  const managedText = (value, fallback) => {
    if (!value) return fallback;
    if (language === "pt" || language === "fr") return fallback;
    if (
      language === "es" &&
      /\belopements?\b|\bwedding (?:planner|planning)\b|\bgender\s*reveal\b/i.test(
        value,
      )
    ) {
      return fallback;
    }
    return value;
  };
  const heroImage = getImage(page?.heroImageList?.[0]?.gatsbyImage);
  const featureImage = getImage(featureCard?.image?.gatsbyImage);
  const phoneDigits = (generalInfo?.telephone || "+18295222900").replace(
    /\D/g,
    "",
  );
  const phoneDisplay = "+1 829 522 2900";
  const email = generalInfo?.email || "info@sertuinevents.com";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(
    language === "pt"
      ? "Olá, quero informações para planejar um evento em Punta Cana."
      : language === "fr"
        ? "Bonjour, je souhaite obtenir des informations pour organiser un événement à Punta Cana."
        : language === "es"
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
  const structuredProcessSteps =
    language === "pt" || language === "fr"
      ? null
      : getStructuredProcessSteps(page?.paragraph2);
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
                language === "pt"
                  ? "Evento de destino planejado pela Sertuin Events em Punta Cana"
                  : language === "fr"
                    ? "Événement de destination organisé par Sertuin Events à Punta Cana"
                    : language === "es"
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
              {managedText(page?.heroEyebrow, content.eyebrow)}
            </p>
            <h1 className="mt-6 max-w-5xl font-crimson text-5xl font-medium leading-[0.95] text-white sm:text-6xl md:text-7xl">
              {managedText(page?.heroHeading, content.heroHeading)}
            </h1>
            <p className="mt-7 max-w-3xl font-montserrat text-base leading-8 text-gray-100 md:text-xl md:leading-9">
              {managedText(page?.heroHeading2, content.heroIntro)}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryCtaUrl}
                className="inline-flex items-center justify-center gap-2 bg-primary-color px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-black no-underline transition hover:opacity-90"
              >
                {managedText(page?.primaryCtaLabel, content.primaryCta)}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center justify-center gap-2 border border-white/60 bg-black/20 px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                {managedText(page?.secondaryCtaLabel, content.secondaryCta)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {[
            managedText(page?.contactEyebrow, content.availability),
            language === "pt"
              ? "Um único ponto de contato"
              : language === "fr"
                ? "Un interlocuteur unique"
                : language === "es"
                  ? "Un solo punto de contacto"
                  : "One point of contact",
            language === "pt"
              ? "Coordenação local em Punta Cana"
              : language === "fr"
                ? "Coordination locale à Punta Cana"
                : language === "es"
                  ? "Coordinación local en Punta Cana"
                  : "Local coordination in Punta Cana",
            language === "pt"
              ? "Gestão completa no local"
              : language === "fr"
                ? "Gestion complète sur place"
                : language === "es"
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
              {managedText(page?.sectionTitle, content.eventsTitle)}
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
              {managedText(page?.sectionTitle2, content.whatTitle)}
            </h2>
          </div>
          <div>
            <RichTextBlock
              context={
                language === "pt" || language === "fr" ? null : page?.paragraph1
              }
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
          {language !== "pt" &&
          language !== "fr" &&
          page?.paragraph2?.raw &&
          !structuredProcessSteps ? (
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
                    (language === "pt"
                      ? "Sertuin Events gerenciando um evento em Punta Cana"
                      : language === "fr"
                        ? "Sertuin Events gérant un événement à Punta Cana"
                        : featureCard?.image?.title) ||
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
              {managedText(
                featureCard?.secondaryTitle,
                content.commitmentEyebrow,
              )}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-5xl">
              {managedText(featureCard?.title, content.commitmentTitle)}
            </h2>
            {language !== "pt" && language !== "fr" && page?.paragraph3?.raw ? (
              <RichTextBlock context={page.paragraph3} />
            ) : (
              <p className="mt-7 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
                {managedText(featureCard?.paragraph, content.commitmentBody)}
              </p>
            )}
            <a
              href={primaryCtaUrl}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-primary-color pb-2 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-black no-underline"
            >
              {managedText(featureCard?.buttonText, content.primaryCta)}
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
              {managedText(page?.contactEyebrow, content.contactEyebrow)}
            </p>
            <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight md:text-6xl">
              {managedText(page?.contactHeading, content.contactTitle)}
            </h2>
            <p className="mt-6 font-montserrat text-base leading-8 text-gray-300 md:text-lg">
              {managedText(page?.contactBody, content.contactBody)}
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
                {managedText(page?.contactEyebrow, content.availability)}
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
