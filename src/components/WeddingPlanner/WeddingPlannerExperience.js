import React, { useMemo, useRef, useState } from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Globe2,
  HeartHandshake,
  MapPinned,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getWeddingPlannerContent,
  normalizeWeddingFaqs,
} from "../../content/weddingPlannerContent";

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

const ContentfulImage = ({ asset, alt, className = "", loading = "lazy" }) => {
  const image = getImage(asset?.gatsbyImage);
  if (image) {
    return (
      <GatsbyImage
        image={image}
        alt={
          alt ||
          asset?.description ||
          asset?.title ||
          "Wedding planned by Sertuin Events in Punta Cana"
        }
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
      src={`${asset.url}?w=1600&fm=webp&q=80`}
      srcSet={`${asset.url}?w=480&fm=webp&q=76 480w, ${asset.url}?w=960&fm=webp&q=76 960w, ${asset.url}?w=1600&fm=webp&q=76 1600w`}
      sizes="100vw"
      width={asset.width || 1600}
      height={asset.height || 1067}
      alt={
        alt ||
        asset?.description ||
        asset?.title ||
        "Wedding planned by Sertuin Events in Punta Cana"
      }
      className={`${className} object-cover`}
      loading={loading}
      fetchPriority={loading === "eager" ? "high" : "auto"}
      decoding="async"
    />
  );
};

const PackageCard = ({ item, copy, onSelect, icon: Icon }) => {
  const items = Array.isArray(item?.includedItems) ? item.includedItems : [];
  const price = Number(item?.price);
  return (
    <article
      className={`relative flex h-full flex-col border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        item?.mostPopular
          ? "border-amber-500 ring-1 ring-amber-500"
          : "border-slate-200"
      }`}
    >
      {item?.mostPopular && (
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 px-4 py-1 font-montserrat text-xs font-bold uppercase tracking-[0.14em] text-white">
          {copy.popular}
        </p>
      )}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
        <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="font-crimson text-3xl font-medium leading-8 text-slate-950">
        {item?.title}
      </h3>
      {item?.description && (
        <p className="mt-4 font-montserrat text-sm leading-6 text-slate-600">
          {item.description}
        </p>
      )}
      <ul className="mt-7 flex-1 space-y-3">
        {items.map((included) => (
          <li
            key={included}
            className="flex items-start gap-3 font-montserrat text-sm leading-6 text-slate-700"
          >
            <Check
              className="mt-1 shrink-0 text-amber-700"
              size={17}
              aria-hidden="true"
            />
            <span>{included}</span>
          </li>
        ))}
      </ul>
      {Number.isFinite(price) && (
        <p className="mt-7 border-t border-slate-200 pt-6 font-crimson text-4xl font-medium text-slate-950">
          <span className="mr-2 font-montserrat text-xs font-semibold uppercase tracking-widest text-slate-500">
            {copy.from}
          </span>
          ${price.toLocaleString("en-US")}
        </p>
      )}
      <button
        type="button"
        onClick={() => onSelect(item?.title)}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-slate-950 px-5 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-amber-700"
      >
        {copy.select}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
};

const InquiryForm = ({
  copy,
  isSpanish,
  packages,
  selectedPackage,
  onPackageChange,
}) => {
  const [phone, setPhone] = useState("");
  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100";
  const labels = isSpanish
    ? {
        package: "Paquete de interés",
        name: "Nombre y apellido",
        email: "Correo electrónico",
        phone: "Teléfono / WhatsApp",
        country: "País de residencia",
        date: "Fecha o mes aproximado",
        guests: "Cantidad estimada de invitados",
        venue: "Venue o resort, si ya lo saben",
        details: "Cuéntennos sobre su boda, cultura y prioridades",
        choose: "Seleccione un paquete",
      }
    : {
        package: "Package of interest",
        name: "Full name",
        email: "Email address",
        phone: "Phone / WhatsApp",
        country: "Country of residence",
        date: "Date or approximate month",
        guests: "Estimated guest count",
        venue: "Venue or resort, if known",
        details: "Tell us about your wedding, culture and priorities",
        choose: "Select a package",
      };

  return (
    <form
      id="wedding-inquiry"
      name="wedding-planner"
      method="POST"
      onSubmit={passVisitorName()}
      action={isSpanish ? "/es/contact/thankyou/" : "/contact/thankyou/"}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="bg-white p-6 shadow-2xl shadow-slate-950/15 md:p-10"
    >
      <input type="hidden" name="form-name" value="wedding-planner" />
      <input
        type="hidden"
        name="source"
        value="Punta Cana Wedding Planner page"
      />
      <input
        type="hidden"
        name="subject"
        value="New Punta Cana wedding planning inquiry"
      />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.package} *
          <select
            className={inputClass}
            name="wedding-package"
            value={selectedPackage}
            onChange={(event) => onPackageChange(event.target.value)}
            required
          >
            <option value="">{labels.choose}</option>
            {packages.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
                {Number.isFinite(Number(item.price))
                  ? ` — USD $${Number(item.price).toLocaleString("en-US")}`
                  : ""}
              </option>
            ))}
          </select>
        </label>
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
            id="wedding-inquiry-phone"
            value={phone}
            onChange={setPhone}
            language={isSpanish ? "es" : "en-US"}
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.country} *
          <input
            className={inputClass}
            type="text"
            name="country"
            autoComplete="country-name"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800">
          {labels.date} *
          <input
            className={inputClass}
            type="text"
            name="wedding-date"
            placeholder={
              isSpanish ? "Ej. noviembre de 2027" : "e.g. November 2027"
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
            min="2"
            inputMode="numeric"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.venue}
          <input className={inputClass} type="text" name="venue-resort" />
        </label>
        <label className="font-montserrat text-sm font-semibold text-slate-800 md:col-span-2">
          {labels.details} *
          <textarea
            className={`${inputClass} min-h-36 resize-y`}
            name="wedding-details"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-amber-600 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-amber-500"
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

const WeddingPlannerExperience = ({
  page,
  galleries,
  packages,
  faqs,
  generalInfo,
  language,
}) => {
  const isSpanish = language === "es";
  const content = getWeddingPlannerContent(language, page?.paragraph3?.raw);
  const formRef = useRef(null);
  const greciaCarouselRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState("");
  const heroImage = page?.heroImageList?.[0];
  const editorialImages = page?.heroImageList?.slice(1) || [];
  const realWeddingGallery = useMemo(
    () =>
      (galleries || []).find((gallery) =>
        /real[-\s]?weddings?|bodas[-\s]?reales/i.test(
          `${gallery?.section || ""} ${gallery?.title || ""}`,
        ),
      ),
    [galleries],
  );
  const greciaGallery = useMemo(
    () =>
      (galleries || []).find((gallery) =>
        /grecia|planner[-\s]?(and|y)?[-\s]?(brides|novias)/i.test(
          `${gallery?.section || ""} ${gallery?.title || ""}`,
        ),
      ),
    [galleries],
  );
  const realWeddingImages = useMemo(() => {
    if (realWeddingGallery?.images?.length) return realWeddingGallery.images;
    return (galleries || [])
      .filter((gallery) => gallery !== greciaGallery)
      .flatMap((gallery) => gallery?.images || []);
  }, [galleries, greciaGallery, realWeddingGallery]);
  const greciaGalleryImages = greciaGallery?.images || [];
  const greciaCarouselImages = greciaGalleryImages.slice(1);
  const packageList = useMemo(() => {
    const cmsPackages = (packages || []).filter(Boolean);
    const hasSouthAsian = cmsPackages.some((item) =>
      /south asian|sudeste asi[aá]tico|indian|sikh/i.test(item?.title || ""),
    );
    return hasSouthAsian
      ? cmsPackages
      : [...cmsPackages, content.packages.fallbackSouthAsian];
  }, [packages, content.packages.fallbackSouthAsian]);
  const faqList = normalizeWeddingFaqs(faqs, language);
  const telephone = (generalInfo?.telephone || "8295222900").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    isSpanish
      ? "Hola, me gustaría planificar mi boda en Punta Cana."
      : "Hello, I would like to plan my wedding in Punta Cana.",
  )}`;

  const selectPackage = (title) => {
    setSelectedPackage(title || "");
    requestAnimationFrame(() => {
      document
        .getElementById("wedding-inquiry")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollGreciaCarousel = (direction) => {
    const carousel = greciaCarouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.firstElementChild?.getBoundingClientRect().width;
    carousel.scrollBy({
      left: direction * ((cardWidth || carousel.clientWidth * 0.82) + 16),
      behavior: "smooth",
    });
  };

  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[720px] bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <ContentfulImage
            asset={heroImage}
            alt="Destination wedding ceremony in Punta Cana planned by Sertuin Events"
            className="h-full w-full"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-start px-6 pb-16 pt-40 md:items-center md:px-10 md:py-24 lg:px-12">
          <div className="max-w-4xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.26em] text-amber-300 md:text-sm">
              {page?.heroEyebrow || content.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-crimson text-5xl font-medium leading-[0.98] text-white sm:text-6xl md:text-7xl">
              {page?.heroHeading || content.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl font-montserrat text-lg leading-8 text-slate-100 md:text-xl">
              {page?.heroHeading2 || content.heroText}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#wedding-packages"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline transition hover:bg-amber-500"
              >
                {page?.primaryCtaLabel || content.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/70 bg-white/10 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white no-underline backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {page?.secondaryCtaLabel || content.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-12">
          {content.trust.map((item, index) => {
            const Icon = [Award, Clock3, Globe2, BadgeDollarSign][index];
            return (
              <div
                key={item}
                className="flex items-center gap-3 px-4 py-6 first:pl-0 last:pr-0"
              >
                <Icon
                  className="shrink-0 text-amber-700"
                  size={21}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="font-montserrat text-sm font-semibold leading-5 text-slate-800">
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow={content.introduction.eyebrow}
            title={content.introduction.title}
            align="left"
          />
          <div>
            <p className="font-montserrat text-lg leading-8 text-slate-600">
              {content.introduction.body}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {editorialImages[0] ? (
                <ContentfulImage
                  asset={editorialImages[0]}
                  alt="Grecia Mejía arranging a beachfront wedding table in Punta Cana"
                  className="h-72 w-full"
                />
              ) : (
                <StaticImage
                  src="../../images/wedding-planner/grecia-table-design.webp"
                  alt="Grecia Mejía arranging a beachfront wedding table in Punta Cana"
                  className="h-72 w-full"
                  imgStyle={{ objectFit: "cover" }}
                  placeholder="blurred"
                />
              )}
              {editorialImages[1] ? (
                <ContentfulImage
                  asset={editorialImages[1]}
                  alt="Grecia Mejía overseeing a wedding setup at a Punta Cana resort"
                  className="mt-8 h-72 w-full"
                />
              ) : (
                <StaticImage
                  src="../../images/wedding-planner/grecia-wedding-setup.webp"
                  alt="Grecia Mejía overseeing a wedding setup at a Punta Cana resort"
                  className="mt-8 h-72 w-full"
                  imgStyle={{ objectFit: "cover" }}
                  placeholder="blurred"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {realWeddingImages.length > 0 && (
        <section
          className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12"
          aria-labelledby="wedding-gallery-title"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={
                isSpanish
                  ? "Bodas reales, detalles reales"
                  : "Real weddings, real details"
              }
              title={
                isSpanish
                  ? "Bodas que hemos ayudado a hacer realidad"
                  : "Weddings we have helped bring to life"
              }
              body={
                isSpanish
                  ? "Una selección del trabajo actual de Sertuin Events en Punta Cana."
                  : "A selection of Sertuin Events’ current wedding work in Punta Cana."
              }
            />
            <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden">
              {realWeddingImages.slice(0, 9).map((asset, index) => (
                <figure
                  key={`${asset?.title || "wedding"}-${index}`}
                  className="group w-[82vw] max-w-[430px] flex-none snap-center overflow-hidden bg-slate-100 shadow-sm"
                >
                  <ContentfulImage
                    asset={asset}
                    className="h-[500px] w-full transition duration-700 group-hover:scale-[1.02]"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={content.expertiseTitle}
            body={content.expertiseIntro}
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
            {content.expertise.map((item, index) => {
              const Icon = [Sparkles, HeartHandshake, Users][index];
              return (
                <article
                  key={item.title}
                  className="bg-slate-950 p-8 md:min-h-72 md:p-10"
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
        </div>
      </section>

      <section
        id="wedding-packages"
        className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={content.packages.eyebrow}
            title={page?.sectionTitle || content.packages.title}
            body={content.packages.intro}
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {packageList.map((item) => {
              const packageTitle = item?.title || "";
              const Icon = /south asian|sudeste asi[aá]tico|indian|sikh/i.test(
                packageTitle,
              )
                ? Globe2
                : /venue|vendor|proveedor/i.test(packageTitle)
                  ? MapPinned
                  : /day coordinator|coordinador/i.test(packageTitle)
                    ? CalendarCheck
                    : Sparkles;
              return (
                <PackageCard
                  key={item.title}
                  item={item}
                  copy={content.packages}
                  onSelect={selectPackage}
                  icon={Icon}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            {editorialImages[2] ? (
              <ContentfulImage
                asset={editorialImages[2]}
                alt="South Asian couple meeting wedding planner Grecia Mejía in Punta Cana"
                className="col-span-2 h-80 w-full md:h-[480px]"
              />
            ) : (
              <StaticImage
                src="../../images/wedding-planner/south-asian-couple-with-grecia.webp"
                alt="South Asian couple meeting wedding planner Grecia Mejía in Punta Cana"
                className="col-span-2 h-80 w-full md:h-[480px]"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
            )}
            {editorialImages[3] ? (
              <ContentfulImage
                asset={editorialImages[3]}
                alt="Grecia Mejía planning wedding logistics at a Punta Cana resort"
                className="h-56 w-full"
              />
            ) : (
              <StaticImage
                src="../../images/wedding-planner/grecia-planning-at-resort.webp"
                alt="Grecia Mejía planning wedding logistics at a Punta Cana resort"
                className="h-56 w-full"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
            )}
            {editorialImages[4] ? (
              <ContentfulImage
                asset={editorialImages[4]}
                alt="Grecia Mejía supporting a bride on her Punta Cana wedding day"
                className="h-56 w-full"
              />
            ) : (
              <StaticImage
                src="../../images/wedding-planner/grecia-supporting-bride.webp"
                alt="Grecia Mejía supporting a bride on her Punta Cana wedding day"
                className="h-56 w-full"
                imgStyle={{ objectFit: "cover" }}
                placeholder="blurred"
              />
            )}
          </div>
          <div>
            <SectionHeading
              eyebrow={content.southAsian.eyebrow}
              title={content.southAsian.title}
              align="left"
            />
            <p className="mt-7 font-montserrat text-lg leading-8 text-slate-600">
              {content.southAsian.body}
            </p>
            <div className="mt-8 border-l-4 border-amber-600 bg-[#f7f5f0] p-5">
              <p className="font-montserrat text-sm font-semibold leading-6 text-slate-800">
                {content.southAsian.note}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                selectPackage(content.packages.fallbackSouthAsian.title)
              }
              className="mt-8 inline-flex items-center gap-2 bg-slate-950 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-amber-700"
            >
              {content.packages.select}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={content.processTitle}
            body={content.processIntro}
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.process.map((step, index) => {
              const Icon = [
                MessageCircle,
                ClipboardCheck,
                Palette,
                CalendarCheck,
              ][index];
              return (
                <li
                  key={step.title}
                  className="border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                      <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="font-montserrat text-xs font-bold tracking-[0.2em] text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-crimson text-2xl font-medium text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-montserrat text-sm leading-6 text-slate-600">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {greciaGalleryImages[0] || editorialImages[5] ? (
            <ContentfulImage
              asset={greciaGalleryImages[0] || editorialImages[5]}
              className="h-[520px] w-full"
            />
          ) : (
            <StaticImage
              src="../../images/wedding-planner/grecia-supporting-bride.webp"
              alt="Wedding planner Grecia Mejía with a bride in Punta Cana"
              className="h-[520px] w-full"
              imgStyle={{ objectFit: "cover", objectPosition: "center" }}
              placeholder="blurred"
            />
          )}
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              {content.grecia.eyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-5xl font-medium leading-none text-white">
              {content.grecia.title}
            </h2>
            <p className="mt-7 font-montserrat text-lg leading-8 text-slate-200">
              {content.grecia.body}
            </p>
            <p className="mt-5 font-montserrat text-base leading-7 text-slate-300">
              {content.grecia.body2}
            </p>
            <div className="mt-8 flex items-center gap-3 text-amber-300">
              <ShieldCheck size={25} aria-hidden="true" />
              <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.12em]">
                {isSpanish
                  ? "Sertuin Events · SERTUIN SRL"
                  : "Sertuin Events · SERTUIN SRL"}
              </p>
            </div>
          </div>
        </div>
        {greciaCarouselImages.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl border-t border-white/15 pt-12">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div className="flex max-w-3xl items-start gap-4">
                <HeartHandshake
                  className="mt-1 shrink-0 text-amber-300"
                  size={28}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-crimson text-3xl font-medium text-white md:text-4xl">
                    {greciaGallery?.title || content.grecia.galleryTitle}
                  </h3>
                  <p className="mt-3 font-montserrat text-sm leading-6 text-slate-300">
                    {content.grecia.galleryBody}
                  </p>
                </div>
              </div>
              {greciaCarouselImages.length > 1 && (
                <div className="flex gap-3 pl-11 md:pl-0">
                  <button
                    type="button"
                    onClick={() => scrollGreciaCarousel(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-amber-300 hover:text-amber-300"
                    aria-label={isSpanish ? "Foto anterior" : "Previous photo"}
                  >
                    <ChevronLeft size={21} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollGreciaCarousel(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-amber-300 hover:text-amber-300"
                    aria-label={isSpanish ? "Foto siguiente" : "Next photo"}
                  >
                    <ChevronRight size={21} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            <div
              ref={greciaCarouselRef}
              role="region"
              aria-roledescription="carousel"
              aria-label={
                isSpanish
                  ? "Grecia con parejas y novias"
                  : "Grecia with couples and brides"
              }
              tabIndex="0"
              className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
            >
              {greciaCarouselImages.map((asset, index) => (
                <figure
                  key={`${asset?.title || "grecia"}-${index}`}
                  className="w-[82vw] max-w-[460px] flex-none snap-center overflow-hidden bg-slate-900"
                >
                  <ContentfulImage asset={asset} className="h-[390px] w-full" />
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={content.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {faqList.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-crimson text-2xl font-medium text-slate-950">
                  {faq.question}
                  <ChevronDown
                    className="shrink-0 transition group-open:rotate-180"
                    size={22}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 max-w-3xl font-montserrat text-base leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={formRef}
        className="bg-[#f7f5f0] px-6 py-20 md:px-10 md:py-28 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={content.form.eyebrow}
              title={content.form.title}
              body={content.form.body}
              align="left"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-amber-800 underline decoration-amber-600 underline-offset-4"
            >
              <MessageCircle size={19} aria-hidden="true" />
              WhatsApp: {generalInfo?.telephone || "+1 829 522 2900"}
            </a>
          </div>
          <InquiryForm
            copy={content.form}
            isSpanish={isSpanish}
            packages={packageList}
            selectedPackage={selectedPackage}
            onPackageChange={setSelectedPackage}
          />
        </div>
      </section>
    </main>
  );
};

export default WeddingPlannerExperience;
