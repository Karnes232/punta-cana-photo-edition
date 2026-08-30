import React, { useMemo, useState } from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import { localizedPath } from "../../utils/siteLocales";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Home,
  Hotel,
  MapPin,
  MessageCircle,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getGenderRevealContent,
  isCurrentGenderRevealCopy,
  normalizeGenderRevealFaqs,
} from "../../content/genderRevealContent";

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

const safeText = (value, fallback) =>
  isCurrentGenderRevealCopy(value) ? value : fallback;

const readRichText = (node) => {
  if (typeof node?.value === "string") return node.value;
  return (node?.content || []).map(readRichText).join(" ");
};

const ManagedParagraphs = ({ context, fallback }) => {
  let paragraphs = [];
  try {
    const document = context?.raw ? JSON.parse(context.raw) : null;
    const completeText = readRichText(document).replace(/\s+/g, " ").trim();
    if (isCurrentGenderRevealCopy(completeText)) {
      paragraphs = (document?.content || [])
        .map(readRichText)
        .map((text) => text.replace(/\s+/g, " ").trim())
        .filter(Boolean);
    }
  } catch {
    paragraphs = [];
  }

  const copy = paragraphs.length > 0 ? paragraphs : fallback;
  return copy.map((paragraph) => (
    <p
      key={paragraph}
      className="mt-5 font-montserrat text-base leading-8 text-slate-600 md:text-lg"
    >
      {paragraph}
    </p>
  ));
};

const ContentfulImage = ({ asset, alt, className = "", loading = "lazy" }) => {
  const image = getImage(asset?.gatsbyImage);
  if (image) {
    return (
      <GatsbyImage
        image={image}
        alt={alt || asset?.title || "Gender reveal in Punta Cana"}
        className={className}
        imgStyle={{ objectFit: "cover" }}
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : "auto"}
      />
    );
  }
  if (!asset?.url) return null;
  return (
    <img
      src={`${asset.url}?w=1800&fm=webp&q=80`}
      srcSet={`${asset.url}?w=480&fm=webp&q=76 480w, ${asset.url}?w=960&fm=webp&q=76 960w, ${asset.url}?w=1800&fm=webp&q=76 1800w`}
      sizes="100vw"
      width={asset.width || 1800}
      height={asset.height || 1200}
      alt={alt || asset?.title || "Gender reveal in Punta Cana"}
      className={`${className} object-cover`}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "auto"}
      decoding="async"
    />
  );
};

const InquiryForm = ({ copy, language }) => {
  const [phone, setPhone] = useState("");
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const labels = isPortuguese
    ? {
        name: "Nome e sobrenome",
        email: "E-mail",
        phone: "Telefone / WhatsApp",
        country: "País de residência",
        date: "Data ou mês aproximado",
        guests: "Número aproximado de convidados",
        location: "Tipo de local",
        locationName: "Nome do hotel, villa ou local, se souber",
        vision: "Conte-nos o que deseja para a revelação",
        choose: "Selecione uma opção",
        hotel: "Hotel ou resort",
        villa: "Villa privativa",
        beach: "Praia ou venue independente",
        other: "Outro local / ainda não decidido",
      }
    : isFrench
      ? {
          name: "Nom complet",
          email: "Adresse e-mail",
          phone: "Téléphone / WhatsApp",
          country: "Pays de résidence",
          date: "Date ou mois approximatif",
          guests: "Nombre approximatif d’invités",
          location: "Type de lieu",
          locationName: "Nom de l’hôtel, de la villa ou du lieu, si connu",
          vision: "Décrivez-nous la révélation imaginée",
          choose: "Sélectionnez une option",
          hotel: "Hôtel ou resort",
          villa: "Villa privée",
          beach: "Plage ou lieu indépendant",
          other: "Autre lieu / à définir",
        }
      : isSpanish
        ? {
            name: "Nombre y apellido",
            email: "Correo electrónico",
            phone: "Teléfono / WhatsApp",
            country: "País de residencia",
            date: "Fecha o mes aproximado",
            guests: "Cantidad aproximada de invitados",
            location: "Tipo de locación",
            locationName: "Nombre del hotel, villa o locación, si lo sabes",
            vision: "Cuéntanos qué quieres para la revelación",
            choose: "Selecciona una opción",
            hotel: "Hotel o resort",
            villa: "Villa privada",
            beach: "Playa o espacio independiente",
            other: "Otra locación / por definir",
          }
        : {
            name: "Full name",
            email: "Email address",
            phone: "Phone / WhatsApp",
            country: "Country of residence",
            date: "Date or approximate month",
            guests: "Approximate guest count",
            location: "Location type",
            locationName: "Hotel, villa or venue name, if known",
            vision: "Tell us what you want for the reveal",
            choose: "Select an option",
            hotel: "Hotel or resort",
            villa: "Private villa",
            beach: "Beach or independent venue",
            other: "Another location / not decided",
          };
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
          {isPortuguese
            ? "Não preencha este campo:"
            : isFrench
              ? "Ne remplissez pas ce champ :"
              : isSpanish
                ? "No completes este campo:"
                : "Do not fill this out:"}{" "}
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
            placeholder={
              isPortuguese
                ? "Ex.: novembro de 2027"
                : isFrench
                  ? "Ex. : novembre 2027"
                  : isSpanish
                    ? "Ej. noviembre de 2027"
                    : "e.g. November 2027"
            }
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
            <option value="Hotel or resort">{labels.hotel}</option>
            <option value="Private villa">{labels.villa}</option>
            <option value="Beach or independent venue">{labels.beach}</option>
            <option value="Other or not decided">{labels.other}</option>
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
        {copy.submit}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-slate-500">
        {copy.privacy}
      </p>
    </form>
  );
};

const GenderRevealExperience = ({
  page,
  galleries,
  cards,
  faqs,
  generalInfo,
  language,
}) => {
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const content = getGenderRevealContent(language);
  const safeLocalizedText = (value, fallback) =>
    isPortuguese ||
    isFrench ||
    (isSpanish && /\bgender\s*reveal/i.test(value || ""))
      ? fallback
      : safeText(value, fallback);
  const faqList = normalizeGenderRevealFaqs(faqs, language);
  const telephone = (generalInfo?.telephone || "8295222900").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    isPortuguese
      ? "Olá, quero solicitar uma cotação para um chá revelação em Punta Cana."
      : isFrench
        ? "Bonjour, je souhaite demander un devis pour une gender reveal à Punta Cana."
        : isSpanish
          ? "Hola, quiero cotizar una revelación de género en Punta Cana."
          : "Hello, I would like a quote for a gender reveal in Punta Cana.",
  )}`;
  const managedGallery = useMemo(
    () =>
      (galleries || []).find(
        (gallery) =>
          /^sertuin gender reveal/i.test(gallery?.title || "") &&
          gallery?.images?.length >= 4,
      ),
    [galleries],
  );
  const managedCards = useMemo(() => {
    const currentCards = (cards || [])
      .map((card) => ({
        title: card?.title?.trim(),
        body: [card?.paragraph, card?.paragraph2]
          .filter(Boolean)
          .join(" ")
          .trim(),
      }))
      .filter(
        (card) =>
          card.title &&
          card.body &&
          isCurrentGenderRevealCopy(`${card.title} ${card.body}`) &&
          (!isSpanish ||
            !/\bgender\s*reveal/i.test(`${card.title} ${card.body}`)),
      );
    return !isPortuguese && !isFrench && currentCards.length >= 3
      ? currentCards
      : null;
  }, [cards, isSpanish, isPortuguese, isFrench]);
  const heroAsset = managedGallery?.images?.[0];
  const cmsGalleryImages = managedGallery?.images?.slice(1) || [];
  const managedPageCurrent =
    isCurrentGenderRevealCopy(page?.heroHeading) &&
    !isPortuguese &&
    !isFrench &&
    (!isSpanish || !/\bgender\s*reveal/i.test(page?.heroHeading || ""));
  const introTitle = safeLocalizedText(
    page?.sectionTitle,
    content.introduction.title,
  );
  const serviceTitle = safeLocalizedText(
    page?.sectionTitle2,
    content.service.title,
  );
  const formCopy = {
    ...content.form,
    eyebrow: safeLocalizedText(page?.contactEyebrow, content.form.eyebrow),
    title: safeLocalizedText(page?.contactHeading, content.form.title),
    body: safeLocalizedText(page?.contactBody, content.form.body),
  };
  const locationCards = managedCards || content.locations.items;

  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[720px] bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          {heroAsset ? (
            <ContentfulImage
              asset={heroAsset}
              alt={
                isPortuguese
                  ? "Chá revelação personalizado em Punta Cana"
                  : isFrench
                    ? "Gender reveal personnalisée à Punta Cana"
                    : isSpanish
                      ? "Revelación de género personalizada en Punta Cana"
                      : "Custom gender reveal celebration in Punta Cana"
              }
              className="h-full w-full"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <StaticImage
              src="../../images/gender-reveal/punta-cana-gender-reveal-beach.webp"
              alt={
                isPortuguese
                  ? "Chá revelação com fumaça azul em uma praia de Punta Cana"
                  : isFrench
                    ? "Gender reveal avec fumée bleue sur une plage de Punta Cana"
                    : isSpanish
                      ? "Revelación con humo azul en una playa de Punta Cana"
                      : "Blue smoke gender reveal celebration on a Punta Cana beach"
              }
              className="h-full w-full"
              imgStyle={{ objectFit: "cover", objectPosition: "center 56%" }}
              loading="eager"
              placeholder="blurred"
              formats={["auto", "webp"]}
              quality={84}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/68 to-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/45" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-start px-6 pb-16 pt-44 md:items-center md:px-10 md:py-24 lg:px-12">
          <div className="max-w-4xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.26em] text-amber-300 md:text-sm">
              {safeLocalizedText(page?.heroEyebrow, content.eyebrow)}
            </p>
            <h1 className="mt-5 max-w-4xl font-crimson text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-7xl">
              {safeLocalizedText(page?.heroHeading, content.heroTitle)}
            </h1>
            <p className="mt-7 max-w-2xl font-montserrat text-lg leading-8 text-slate-100 md:text-xl">
              {safeLocalizedText(page?.heroHeading2, content.heroText)}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#gender-reveal-quote"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline transition hover:bg-amber-500"
              >
                {safeLocalizedText(page?.primaryCtaLabel, content.primaryCta)}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/70 bg-white/10 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {safeLocalizedText(
                  page?.secondaryCtaLabel,
                  content.secondaryCta,
                )}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-12">
          {content.trust.map((item) => (
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
              eyebrow={content.introduction.eyebrow}
              title={introTitle}
              align="left"
            />
            <ManagedParagraphs
              context={managedPageCurrent ? page?.paragraph1 : null}
              fallback={content.introduction.paragraphs}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StaticImage
              src="../../images/gender-reveal/gender-reveal-setup-punta-cana.webp"
              alt={
                isPortuguese
                  ? "Decoração personalizada para chá revelação em uma praia de Punta Cana"
                  : isFrench
                    ? "Décoration personnalisée de gender reveal sur une plage de Punta Cana"
                    : isSpanish
                      ? "Decoración personalizada para una revelación en una playa de Punta Cana"
                      : "Custom gender reveal setup on a Punta Cana beach"
              }
              className="h-80 w-full"
              imgStyle={{ objectFit: "cover" }}
              placeholder="blurred"
            />
            <StaticImage
              src="../../images/gender-reveal/expecting-couple-gender-reveal-punta-cana.webp"
              alt={
                isPortuguese
                  ? "Casal durante seu chá revelação em Punta Cana"
                  : isFrench
                    ? "Couple pendant sa gender reveal à Punta Cana"
                    : isSpanish
                      ? "Pareja embarazada durante su revelación de género en Punta Cana"
                      : "Expecting couple at their Punta Cana gender reveal"
              }
              className="mt-10 h-80 w-full"
              imgStyle={{ objectFit: "cover" }}
              placeholder="blurred"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.service.eyebrow}
            title={serviceTitle}
            body={content.service.intro}
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
            {content.service.items.map((item, index) => {
              const Icon = [
                Sparkles,
                PartyPopper,
                ClipboardCheck,
                MapPin,
                Users,
                Check,
              ][index];
              return (
                <article key={item} className="bg-white p-7 md:min-h-44 md:p-8">
                  <Icon
                    className="text-amber-700"
                    size={25}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-crimson text-2xl font-medium leading-7 text-slate-950">
                    {item}
                  </h3>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <ManagedParagraphs
              context={managedPageCurrent ? page?.paragraph2 : null}
              fallback={[content.service.note]}
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.locations.eyebrow}
            title={content.locations.title}
            body={content.locations.intro}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
            {locationCards.map((item, index) => {
              const Icon = [Hotel, Home, MapPin][index % 3];
              return (
                <article
                  key={item.title}
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
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <ManagedParagraphs
              context={managedPageCurrent ? page?.paragraph3 : null}
              fallback={[]}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.gallery.eyebrow}
            title={content.gallery.title}
            body={content.gallery.intro}
          />
          {cmsGalleryImages.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {cmsGalleryImages.map((asset, index) => (
                <ContentfulImage
                  key={`${asset?.title || "gender-reveal"}-${index}`}
                  asset={asset}
                  alt={
                    isPortuguese
                      ? "Chá revelação planejado pela Sertuin Events em Punta Cana"
                      : isFrench
                        ? "Gender reveal organisée par Sertuin Events à Punta Cana"
                        : isSpanish
                          ? "Revelación de género planificada por Sertuin Events en Punta Cana"
                          : asset?.title ||
                            "Custom gender reveal planned by Sertuin Events in Punta Cana"
                  }
                  className={`${index === 0 || index === 5 ? "col-span-2" : ""} h-64 w-full md:h-80`}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              <StaticImage
                src="../../images/gender-reveal/blue-smoke-gender-reveal-punta-cana.webp"
                alt={
                  isPortuguese
                    ? "Momento da revelação com fumaça azul em uma praia de Punta Cana"
                    : isFrench
                      ? "Moment de la révélation avec fumée bleue sur une plage de Punta Cana"
                      : isSpanish
                        ? "Momento de revelación con humo azul en una playa de Punta Cana"
                        : "Blue smoke reveal moment on a Punta Cana beach"
                }
                className="col-span-2 h-72 w-full md:h-96"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
              <StaticImage
                src="../../images/gender-reveal/gender-reveal-villa-punta-cana.webp"
                alt={
                  isPortuguese
                    ? "Decoração rosa e azul para chá revelação em uma villa privativa de Punta Cana"
                    : isFrench
                      ? "Décoration rose et bleue de gender reveal dans une villa privée de Punta Cana"
                      : isSpanish
                        ? "Decoración rosa y azul para una revelación en una villa de Punta Cana"
                        : "Pink and blue gender reveal decoration at a private Punta Cana villa"
                }
                className="h-72 w-full md:h-96"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
              <StaticImage
                src="../../images/gender-reveal/gender-reveal-couple-punta-cana-beach.webp"
                alt={
                  isPortuguese
                    ? "Casal celebrando um chá revelação na praia em Punta Cana"
                    : isFrench
                      ? "Couple célébrant sa gender reveal sur une plage de Punta Cana"
                      : isSpanish
                        ? "Pareja celebrando su revelación en una playa de Punta Cana"
                        : "Couple celebrating a gender reveal on the beach in Punta Cana"
                }
                className="h-72 w-full md:h-96"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
              <StaticImage
                src="../../images/gender-reveal/gender-reveal-celebration-punta-cana.webp"
                alt={
                  isPortuguese
                    ? "Chá revelação com decoração e efeitos de luz em Punta Cana"
                    : isFrench
                      ? "Gender reveal avec décoration et effets lumineux à Punta Cana"
                      : isSpanish
                        ? "Celebración de revelación con decoración y efectos de luces en Punta Cana"
                        : "Gender reveal celebration with décor and sparkling effects in Punta Cana"
                }
                className="h-72 w-full md:col-span-2 md:h-96"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
              <StaticImage
                src="../../images/gender-reveal/gender-reveal-sunset-punta-cana.webp"
                alt={
                  isPortuguese
                    ? "Futuros pais após o chá revelação ao pôr do sol em Punta Cana"
                    : isFrench
                      ? "Futurs parents après leur gender reveal au coucher du soleil à Punta Cana"
                      : isSpanish
                        ? "Futuros padres después de su revelación al atardecer en Punta Cana"
                        : "Expecting parents after their Punta Cana gender reveal at sunset"
                }
                className="h-72 w-full md:col-span-2 md:h-96"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.process.eyebrow}
            title={content.process.title}
            body={content.process.intro}
          />
          <ol className="mt-14 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {content.process.steps.map((step) => (
              <li key={step.number} className="bg-white p-7 md:min-h-72 md:p-8">
                <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-amber-700">
                  {step.number}
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
              eyebrow={formCopy.eyebrow}
              title={formCopy.title}
              body={formCopy.body}
              align="left"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-amber-800 underline decoration-amber-500 underline-offset-4"
            >
              <MessageCircle size={19} aria-hidden="true" />
              {content.secondaryCta}
            </a>
          </div>
          <InquiryForm copy={formCopy} language={language} />
        </div>
      </section>

      <section className="bg-[#f7f5f0] px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={content.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {faqList.map((item) => (
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
