import { IndianImage, WeddingGallery, WeddingFilms } from "./WeddingMedia";
import React, { useMemo, useRef, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { passVisitorName } from "../../utils/thankYouName";
import { localizedPath } from "../../utils/siteLocales";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  HeartHandshake,
  MessageCircle,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { weddingPlannerFormContent } from "../../content/weddingPlannerFormContent";
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

// An imageWithAlt from Sanity.
const SanityImage = ({ image, className = "", loading = "lazy" }) => {
  const data = getImage(image?.asset?.gatsbyImageData);
  if (!data) return null;
  return (
    <GatsbyImage
      image={data}
      alt={image.alt || ""}
      className={className}
      imgStyle={{ objectFit: "cover" }}
      loading={loading}
    />
  );
};

// This language's packages in price-list order, each with its shared price,
// badge, icon and South Asian flag.
export const weddingPackages = (page) =>
  (page?.packages || [])
    .filter((item) => item?.package)
    .map((item) => ({
      key: item._key,
      title: item.title,
      description: item.description,
      includedItems: item.items || [],
      // A missing price becomes NaN below, so no "$0" is shown or sent.
      price: item.package.price ?? undefined,
      mostPopular: item.package.mostPopular,
      southAsian: item.package.southAsian,
      icon: item.package.icon,
      order: item.package.order,
    }))
    .sort((a, b) => a.order - b.order);

const PackageCard = ({ item, copy, onSelect }) => {
  const Icon = cardIcon(item.icon);
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
      <h3
        data-wedding-package-title
        className="font-crimson text-3xl font-medium leading-8 text-slate-950"
      >
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
  submitLabel,
  undecidedLabel,
  language,
  packages,
  selectedPackage,
  onPackageChange,
}) => {
  const [phone, setPhone] = useState("");
  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100";
  const labels =
    weddingPlannerFormContent[language] || weddingPlannerFormContent["en-US"];

  return (
    <form
      id="wedding-inquiry"
      name="wedding-planner"
      method="POST"
      onSubmit={passVisitorName()}
      action={localizedPath("/contact/thankyou/", language)}
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
          {labels.honeypot}{" "}
          <input name="bot-field" />
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
            <option value="Planning guidance">{undecidedLabel}</option>
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
            language={language}
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
        {submitLabel}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-slate-500">
        {labels.privacy}
      </p>
    </form>
  );
};

// Copy, photos, films and packages come from this language's Wedding Planner
// Page document in Sanity (prices from the shared Wedding Packages); phone and
// email from General Layout.
const WeddingPlannerExperience = ({ page, generalInfo, language }) => {
  const formRef = useRef(null);
  const greciaCarouselRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState("");
  const packageList = useMemo(() => weddingPackages(page), [page]);
  const southAsianPackage = packageList.find((item) => item.southAsian);
  const realWeddingImages = page.realWeddingPhotos || [];
  const southAsianPhotos = page.southAsianPhotos || [];
  const greciaCarouselImages = page.greciaPhotos || [];
  const packageCopy = {
    popular: page.popularLabel,
    from: page.fromLabel,
    select: page.selectLabel,
  };
  const galleryCopy = {
    previous: page.previousLabel,
    next: page.nextLabel,
    open: page.openLabel,
    close: page.closeLabel,
    play: page.playLabel,
  };
  const telephone = (generalInfo?.telephone || "8295222900").replace(/\D/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(
    page.whatsappMessage || "",
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
    <main className="wp-page overflow-hidden bg-[#f7f5f0] text-slate-950">
      <section className="relative min-h-[720px] bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <SanityImage
            image={page.heroImage}
            className="h-full w-full"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-start px-6 pb-16 pt-40 md:items-center md:px-10 md:py-24 lg:px-12">
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
                href="#wedding-packages"
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

      <nav className="wp-paths" aria-label={page.pathsLabel}>
        <a className="wp-path" href="#western-weddings"><SanityImage image={realWeddingImages[0] || page.heroImage} className="h-full w-full"/><div className="wp-path-copy"><strong>{page.westernLabel}</strong><span>{page.exploreLabel} ↗</span></div></a>
        <a className="wp-path" href="#indian-weddings"><IndianImage asset={southAsianPhotos[1]||southAsianPhotos[0]} alt={page.southAsianGalleryTitle}/><div className="wp-path-copy"><strong>{page.southAsianLabel}</strong><span>{page.exploreLabel} ↗</span></div></a>
      </nav>

      {realWeddingImages.length > 0 && <section id="western-weddings" className="bg-white px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={page.westernLabel} title={page.realWeddingsTitle} body={page.realWeddingsText}/>
          <WeddingGallery images={realWeddingImages} copy={galleryCopy} label={page.westernLabel} renderImage={(image,full)=><SanityImage image={image} className="h-full w-full" loading={full?'eager':'lazy'}/>}/>
        </div>
      </section>}

      <section
        id="wedding-packages"
        className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={page.packagesEyebrow}
            title={page.packagesTitle}
            body={page.packagesIntro}
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {packageList.filter((item) => !item.southAsian).map((item) => (
              <PackageCard
                key={item.key}
                item={item}
                copy={packageCopy}
                onSelect={selectPackage}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="indian-weddings" className="wp-indian">
        <div className="wp-indian-inner">
          <div className="wp-indian-head"><div><p className="wp-kicker">{page.southAsianLabel}</p><h2>{page.southAsianTitle}</h2><p>{page.southAsianIntro}</p></div><IndianImage asset={southAsianPhotos[1]||southAsianPhotos[0]} className="wp-indian-cover" alt={page.southAsianGalleryTitle}/></div>
          <div className="wp-film-row"><div><h3>{page.filmsTitle}</h3><p>{page.filmsText}</p><button type="button" className="wp-inquiry-cta" onClick={()=>selectPackage(southAsianPackage?.title)}>{page.southAsianCtaLabel} ↗</button></div><WeddingFilms films={page.films} copy={galleryCopy}/></div>
          {southAsianPhotos.length>0&&<>
          <h3>{page.southAsianGalleryTitle}</h3>
          <WeddingGallery images={southAsianPhotos} copy={galleryCopy} label={page.southAsianGalleryTitle} renderImage={(image,full)=>full?<img src={image.asset?.url} alt={image.alt} title={image.alt}/>:<IndianImage asset={image} alt={page.southAsianGalleryTitle}/>}/>
          </>}
          <div className="wp-indian-offer"><div><h3>{page.southAsianOfferTitle}</h3><p>{page.southAsianBody}</p><p className="mt-6">{page.southAsianNote}</p></div>
            {southAsianPackage && <PackageCard key={southAsianPackage.key} item={southAsianPackage} copy={packageCopy} onSelect={selectPackage}/>}</div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={page.processTitle}
            body={page.processIntro}
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(page.processSteps || []).map((step, index) => {
              const Icon = [
                MessageCircle,
                ClipboardCheck,
                Palette,
                CalendarCheck,
              ][index] || Check;
              return (
                <li
                  key={step._key}
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
          <SanityImage image={page.greciaPortrait} className="h-[520px] w-full" />
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              {page.greciaEyebrow}
            </p>
            <h2 className="mt-4 font-crimson text-5xl font-medium leading-none text-white">
              {page.greciaTitle}
            </h2>
            <p className="mt-7 font-montserrat text-lg leading-8 text-slate-200">
              {page.greciaText}
            </p>
            <p className="mt-5 font-montserrat text-base leading-7 text-slate-300">
              {page.greciaQuote}
            </p>
            <div className="mt-8 flex items-center gap-3 text-amber-300">
              <ShieldCheck size={25} aria-hidden="true" />
              <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.12em]">
                {page.greciaCompanyLine}
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
                    {page.greciaGalleryTitle}
                  </h3>
                  <p className="mt-3 font-montserrat text-sm leading-6 text-slate-300">
                    {page.greciaGalleryBody}
                  </p>
                </div>
              </div>
              {greciaCarouselImages.length > 1 && (
                <div className="flex gap-3 pl-11 md:pl-0">
                  <button
                    type="button"
                    onClick={() => scrollGreciaCarousel(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-amber-300 hover:text-amber-300"
                    aria-label={page.previousLabel}
                  >
                    <ChevronLeft size={21} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollGreciaCarousel(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-amber-300 hover:text-amber-300"
                    aria-label={page.nextLabel}
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
              aria-label={page.greciaCarouselLabel}
              tabIndex="0"
              className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] md:-mx-10 md:px-10 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
            >
              {greciaCarouselImages.map((image) => (
                <figure
                  key={image._key}
                  className="w-[82vw] max-w-[460px] flex-none snap-center overflow-hidden bg-slate-900"
                >
                  <SanityImage image={image} className="h-[390px] w-full" />
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title={page.faqTitle} />
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {(page.faqs || []).map((faq) => (
              <details key={faq._key} className="group py-6">
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
              eyebrow={page.formEyebrow}
              title={page.formTitle}
              body={page.formBody}
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
            submitLabel={page.formSubmitLabel}
            undecidedLabel={page.undecidedLabel}
            language={language}
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
