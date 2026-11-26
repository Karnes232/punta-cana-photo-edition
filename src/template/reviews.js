import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import { Heart, Ear, Check } from "lucide-react";
import Layout from "../components/Layout/Layout";
import { localizedPath, getLanguageConfig } from "../utils/siteLocales";
import { safeLink } from "../utils/reviewPolicy";
import "../styles/reviews.css";

const serviceRoutes = {
  proposalPage: "/proposal/",
  weddingPlannerPage: "/puntacana-wedding-planner/",
  elopementPage: "/punta-cana-elopement-packages/",
  genderRevealPage: "/gender-reveal-punta-cana/",
  eventPlannerPage: "/event-planner/",
};
const icons = { heart: Heart, ear: Ear, check: Check };
const carouselCopy = {
  en: {
    previous: "Previous review",
    next: "Next review",
    label: "Client testimonials",
  },
  es: {
    previous: "Reseña anterior",
    next: "Siguiente reseña",
    label: "Testimonios de nuestros clientes",
  },
  pt: {
    previous: "Avaliação anterior",
    next: "Próxima avaliação",
    label: "Depoimentos dos nossos clientes",
  },
  fr: {
    previous: "Avis précédent",
    next: "Avis suivant",
    label: "Témoignages de nos clients",
  },
};
const local = (value, lang) => value?.[lang] || value?.en || "";
const destination = (url, language) => {
  if (!safeLink(url)) return undefined;
  if (!url.startsWith("/")) return url;
  // Preserve fragments/query strings and don't double-prefix localized paths.
  if (/^\/(es|pt|fr)(\/|$)/.test(url)) return url;
  const match = url.match(/^([^?#]*)(.*)$/);
  return localizedPath(match[1], language) + match[2];
};
const imageUrl = (value, project, dataset) => {
  const ref = value?.asset?._ref;
  const match = ref?.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  return match
    ? `https://cdn.sanity.io/images/${project}/${dataset}/${match[1]}-${match[2]}.${match[3]}?w=1400&auto=format`
    : undefined;
};
function Reviews({ data, pageContext: ctx }) {
  const { copy, categories, reviews, sanityLanguage: lang, language } = ctx;
  const [selected, select] = useState("");
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [trackHeight, setTrackHeight] = useState(null);
  const controls = carouselCopy[lang] || carouselCopy.en;
  const filtered = reviews.filter(
    (r) => !selected || r.category._ref === selected,
  );
  const current = categories.find((c) => c._id === selected);
  useEffect(() => {
    const slide = track.current?.querySelectorAll(".reviews-card")[active];
    if (!slide) {
      setTrackHeight(null);
      return;
    }
    const measure = () =>
      setTrackHeight(Math.ceil(slide.getBoundingClientRect().height) + 24);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active, selected]);
  const move = (index) => {
    const slides = track.current?.querySelectorAll(".reviews-card");
    if (!slides?.length) return;
    const next = Math.max(0, Math.min(index, slides.length - 1));
    const slide = slides[next];
    const left =
      slide.getBoundingClientRect().left -
      track.current.getBoundingClientRect().left +
      track.current.scrollLeft;
    track.current.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setActive(next);
  };
  const picture = (value, eager = false, background = false) => {
    const src = imageUrl(value, ctx.project, ctx.dataset);
    return src && value.alt ? (
      <figure className={background ? "reviews-background" : undefined}>
        <img
          src={src}
          alt={value.alt}
          loading={eager ? "eager" : "lazy"}
          style={{
            objectPosition: `${(value.hotspot?.x ?? 0.5) * 100}% ${(value.hotspot?.y ?? 0.5) * 100}%`,
          }}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ) : null;
  };
  const button = (value) =>
    value?.enabled && value.label && destination(value.url, language) ? (
      <a
        className={`reviews-button ${value.variant === "secondary" ? "reviews-secondary" : ""}`}
        href={destination(value.url, language)}
      >
        {value.label}
      </a>
    ) : null;
  const externalProps = (review) => ({
    href: review.googleReviewUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  });
  const card = (review) => {
    const label = copy.googleLabel;
    const displayedText =
      review.translation?.[lang] || review.translation?.en || review.text;
    return (
      <article key={review._id} className="reviews-card">
        <div className="reviews-card-copy">
          <h3>{review.clientName}</h3>
          {review.reviewDate && (
            <time dateTime={review.reviewDate}>
              {new Intl.DateTimeFormat(lang, {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(review.reviewDate))}
            </time>
          )}
          {local(review.eventLabel, lang) && (
            <p>{local(review.eventLabel, lang)}</p>
          )}
          {review.eventLocation && <p>{review.eventLocation}</p>}
          {review.rating && (
            <p className="reviews-stars" aria-label={`${review.rating} / 5`}>
              {"★".repeat(review.rating)}
            </p>
          )}
          <blockquote lang={lang}>{displayedText}</blockquote>
          <a className="reviews-button" {...externalProps(review)}>
            {label}
            <span className="sr-only"> — {copy.externalLabel}</span>
          </a>
        </div>
        <a
          className="reviews-card-photo"
          {...externalProps(review)}
          aria-label={`${review.photo.alt} — ${copy.externalLabel}`}
        >
          {picture(review.photo)}
        </a>
      </article>
    );
  };
  const philosophy = copy.companyPhilosophy;
  const sections = {
    companyPhilosophy: philosophy?.enabled && (
      <section
        className={`reviews-section reviews-philosophy ${philosophy.variant === "split" ? "reviews-split" : ""}`}
      >
        <div>
          <p>{philosophy.eyebrow}</p>
          <h2>{philosophy.heading}</h2>
          <p>{philosophy.subtitle}</p>
          <PortableText
            value={philosophy.body || []}
            components={{
              marks: {
                link: ({ value, children }) =>
                  destination(value.href, language) ? (
                    <a href={destination(value.href, language)}>{children}</a>
                  ) : (
                    <>{children}</>
                  ),
              },
            }}
          />
          {button(philosophy.cta)}
        </div>
        {picture(philosophy.image)}
      </section>
    ),
    values: copy.valuesEnabled && (
      <section className="reviews-section">
        <h2>{copy.valuesHeading}</h2>
        <div className="reviews-grid">
          {copy.values
            ?.filter((v) => v.enabled)
            .map((v) => {
              const Icon = icons[v.icon];
              return (
                <article key={v._key}>
                  {Icon && <Icon aria-hidden="true" />}
                  <h3>{v.heading}</h3>
                  <p>{v.description}</p>
                </article>
              );
            })}
        </div>
      </section>
    ),
    featured: copy.featuredEnabled && reviews.some((r) => r.featured) && (
      <section className="reviews-section">
        <h2>{copy.featuredHeading}</h2>
        <div className="reviews-grid">
          {reviews
            .filter((r) => r.featured)
            .slice(0, 6)
            .map(card)}
        </div>
      </section>
    ),
    faq: copy.faqEnabled && (
      <section className="reviews-section">
        <h2>{copy.faqHeading}</h2>
        {copy.faqs?.map((f) => (
          <details key={f._key}>
            <summary>{f.question}</summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </section>
    ),
  };
  const closing = copy.closing;
  const servicePath =
    current &&
    (serviceRoutes[current.serviceType] ||
      (Object.values(serviceRoutes).includes(current.servicePath)
        ? current.servicePath
        : undefined));
  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <main className="reviews-page">
        <header
          className={`reviews-section reviews-hero reviews-backdrop reviews-${copy.hero.variant || "plain"}`}
        >
          {copy.hero.enabled && <p>{copy.hero.eyebrow}</p>}
          <h1>{copy.hero.heading}</h1>
          {copy.hero.enabled && (
            <>
              <p>{copy.hero.description}</p>
              <p>{copy.hero.secondaryParagraph}</p>
              <div className="reviews-buttons">
                {button(copy.hero.primary)}
                {button(copy.hero.secondary)}
              </div>
              {copy.hero.mediaEnabled && picture(copy.hero.image, true, true)}
            </>
          )}
        </header>
        {(
          copy.sectionOrder || [
            "companyPhilosophy",
            "values",
            "featured",
            "faq",
          ]
        ).map((key) => (
          <React.Fragment key={key}>{sections[key]}</React.Fragment>
        ))}
        <section id="client-reviews" className="reviews-section">
          <h2>{copy.reviewsHeading}</h2>
          <p>{copy.reviewsIntro}</p>
          <nav aria-label={copy.filterLabel} className="reviews-buttons">
            {[
              { _id: "", name: { [lang]: copy.allReviews } },
              ...categories,
            ].map((c) => (
              <button
                className="reviews-button reviews-secondary"
                type="button"
                key={c._id}
                aria-pressed={selected === c._id}
                onClick={() => {
                  select(c._id);
                  setActive(0);
                }}
              >
                {local(c.name, lang)}
              </button>
            ))}
          </nav>
          {current && (
            <div>
              <h3>{local(current.name, lang)}</h3>
              <p>{local(current.description, lang)}</p>
              <p>{local(current.intro, lang)}</p>
              {picture(current.image)}
            </div>
          )}
          <div className="reviews-carousel-controls">
            <button
              type="button"
              className="reviews-arrow"
              aria-label={controls.previous}
              aria-controls="review-track"
              disabled={active === 0}
              onClick={() => move(active - 1)}
            >
              {"←"}
            </button>
            <span aria-live="polite" aria-atomic="true">
              {filtered.length ? `${active + 1} / ${filtered.length}` : "0 / 0"}
            </span>
            <button
              type="button"
              className="reviews-arrow"
              aria-label={controls.next}
              aria-controls="review-track"
              disabled={active >= filtered.length - 1}
              onClick={() => move(active + 1)}
            >
              {"→"}
            </button>
          </div>
          <div
            key={selected}
            id="review-track"
            ref={track}
            role="region"
            aria-label={controls.label}
            tabIndex={0}
            className="reviews-carousel"
            style={trackHeight ? { height: trackHeight } : undefined}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                move(active + (event.key === "ArrowRight" ? 1 : -1));
              }
            }}
            onScroll={(event) => {
              const el = event.currentTarget;
              const slides = Array.from(el.querySelectorAll(".reviews-card"));
              const left = el.getBoundingClientRect().left;
              const nearest = slides.reduce(
                (best, slide, index) =>
                  Math.abs(slide.getBoundingClientRect().left - left) <
                  Math.abs(slides[best].getBoundingClientRect().left - left)
                    ? index
                    : best,
                0,
              );
              setActive(nearest);
            }}
          >
            {filtered.map(card)}
            {!filtered.length && <p>{copy.emptyMessage}</p>}
          </div>
          {current?.ctaEnabled && servicePath && (
            <aside className="reviews-section">
              <h3>{local(current.ctaHeading, lang)}</h3>
              <p>{local(current.ctaDescription, lang)}</p>
              {picture(current.ctaImage)}
              {button({
                enabled: true,
                label: local(current.ctaLabel, lang),
                url: servicePath,
                variant: current.variant,
              })}
            </aside>
          )}
        </section>
        {closing?.enabled && (
          <section
            className={`reviews-section reviews-backdrop reviews-${closing.variant || "plain"}`}
          >
            <p>{closing.eyebrow}</p>
            <h2>{closing.heading}</h2>
            <p>{closing.description}</p>
            {picture(closing.image, false, true)}
            <div className="reviews-buttons">
              {button(closing.primary)}
              {button(closing.secondary)}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
export default Reviews;
export function Head({ pageContext: ctx, data }) {
  const seo = ctx.copy.seo;
  const root = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const url = root + localizedPath("/reviews/", ctx.language);
  const img = imageUrl(seo.image, ctx.project, ctx.dataset);
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: getLanguageConfig(ctx.language).htmlLang,
  };
  return (
    <>
      <html lang={getLanguageConfig(ctx.language).htmlLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={url} />
      {ctx.alternates.map((a) => (
        <link
          key={a.language}
          rel="alternate"
          hrefLang={a.language}
          href={root + a.path}
        />
      ))}
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta
        property="og:description"
        content={seo.ogDescription || seo.description}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {img && (
        <>
          <meta property="og:image" content={img} />
          <meta property="og:image:alt" content={seo.image.alt} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta
        name="twitter:description"
        content={seo.ogDescription || seo.description}
      />
      {img && <meta name="twitter:image" content={img} />}
      {(seo.noIndex || !ctx.reviews.length) && (
        <meta name="robots" content="noindex, follow" />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
export const query = graphql`
  query ReviewsTemplateQuery {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    sanityGeneralLayout(_id: { eq: "generalLayout" }) {
      companyName
      instagram
      facebook
      x
      telephone
      messengerLink
    }
  }
`;
