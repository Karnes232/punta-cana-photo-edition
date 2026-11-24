import React from "react";
import { graphql } from "gatsby";
import { Heart, Ear, Check } from "lucide-react";
import Layout from "../components/Layout/Layout";
import ResponsiveImage from "../components/ResponsiveImage";
import { localizedPath, getLanguageConfig } from "../utils/siteLocales";
import { safeLink } from "../utils/reviewPolicy";
import {
  CURRENT_BRAND_ID,
  local,
  byOrder,
  homepage,
  visibleItems,
} from "../utils/aboutPolicy";
import { aboutImageAsset } from "../utils/aboutImage";
import "../styles/about.css";

const icons = { heart: Heart, ear: Ear, check: Check };
const paragraphs = (text) =>
  (text || "")
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>);
const destination = (url, language) =>
  safeLink(url)
    ? url.startsWith("/")
      ? localizedPath(url, language)
      : url
    : undefined;
function Photo({ image, eager = false, founders = false }) {
  const asset = aboutImageAsset(image);
  return asset && image.alt ? (
    <ResponsiveImage
      asset={asset}
      alt={image.alt}
      sizes={
        founders
          ? "(max-width: 760px) 90vw, 440px"
          : "(max-width: 760px) 90vw, 380px"
      }
      widths={[360, 640, 900, 1200]}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      imgClassName="about-photo"
    />
  ) : null;
}
export default function About({ data, pageContext: ctx }) {
  const p = ctx.copy,
    lang = ctx.sanityLanguage,
    company = p.company.corporateProfile;
  const founders = visibleItems(company.founders),
    brands = (p.brands || [])
      .filter((b) => b.active !== false)
      .slice()
      .sort(byOrder);
  const closing = p.closing;
  return (
    <Layout generalInfo={data.sanityGeneralLayout}>
      <main className="about-page">
        <header className="about-container about-intro">
          <p className="about-eyebrow">{p.eyebrow}</p>
          <h1>{p.heading}</h1>
          <p className="about-subtitle">{p.subtitle}</p>
        </header>
        <section
          className="about-container about-founders"
          aria-labelledby="founders-heading"
        >
          <figure>
            <Photo image={p.foundersPhoto} eager founders />
            {p.photoCaption && <figcaption>{p.photoCaption}</figcaption>}
          </figure>
          <div className="about-biography">
            <h2 id="founders-heading">{p.foundersHeading}</h2>
            <p className="about-eyebrow">{p.foundersSubtitle}</p>
            {paragraphs(p.introduction)}
            {paragraphs(p.biography)}
            <div className="about-profiles">
              {founders.map((f) => (
                <article key={f._id}>
                  {f.photo && <Photo image={f.photo} />}
                  <h3>{f.name}</h3>
                  <p className="about-profile-title">{local(f.title, lang)}</p>
                  {paragraphs(local(f.biography, lang))}
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="about-container about-company">
          <h2>{p.companyHeading}</h2>
          {paragraphs(local(company.description, lang))}
        </section>
        <section className="about-brand-wrap">
          <div className="about-container about-main-brand">
            <div>
              <span className="about-current">{p.currentBrandLabel}</span>
              <h2>{p.brandHeading}</h2>
            </div>
            <div>
              {paragraphs(p.brandDescription)}
              <div className="about-service-links">
                {(p.serviceLinks || [])
                  .filter((l) => destination(l.path, ctx.language))
                  .map((l) => (
                    <a key={l._key} href={destination(l.path, ctx.language)}>
                      {l.label}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <section className="about-container about-purpose">
          <div className="about-two">
            <div>
              <h2>{p.purposeHeading}</h2>
              {paragraphs(p.purpose)}
            </div>
            <div>
              <h2>{p.commitmentHeading}</h2>
              {paragraphs(p.commitment)}
            </div>
          </div>
          <h2>{p.processHeading}</h2>
          <div className="about-steps">
            {visibleItems(p.steps).map((s) => {
              const Icon = icons[s.icon];
              return (
                <article key={s._key}>
                  {Icon && <Icon size={24} aria-hidden="true" />}
                  <h3>{local(s.heading, lang)}</h3>
                  {paragraphs(local(s.description, lang))}
                </article>
              );
            })}
          </div>
        </section>
        {p.valuesEnabled && (
          <section className="about-container about-values">
            <h2>{p.valuesHeading}</h2>
            {paragraphs(p.valuesIntro)}
            <div className="about-values-grid">
              {visibleItems(company.values).map((v) => (
                <article key={v._key}>
                  <h3>{local(v.heading, lang)}</h3>
                  {paragraphs(local(v.description, lang))}
                </article>
              ))}
            </div>
          </section>
        )}
        {p.directoryEnabled && (
          <section className="about-container about-directory">
            <p className="about-eyebrow">{p.directorySubtitle}</p>
            <h2>{p.directoryHeading}</h2>
            {paragraphs(p.directoryIntro)}
            <div className="about-brands">
              {brands.map((b) => {
                const current = b.brandId === CURRENT_BRAND_ID,
                  url = homepage(b);
                return (
                  <article
                    key={b._id}
                    className={`about-card${current ? " about-card-current" : ""}`}
                  >
                    {b.logo && (
                      <div className="about-brand-logo">
                        <Photo image={b.logo} />
                      </div>
                    )}
                    {current && (
                      <span className="about-current">
                        {p.currentBrandLabel}
                      </span>
                    )}
                    <h3>{b.name}</h3>
                    <p className="about-specialty">
                      {local(b.specialty, lang)}
                    </p>
                    {paragraphs(local(b.description, lang))}
                    {b.image && <Photo image={b.image} />}
                    <div className="about-card-action">
                      {url ? (
                        <a
                          className="about-button"
                          href={url}
                          aria-label={`${local(b.homepageButtonLabel, lang)} — ${b.name}`}
                        >
                          {local(b.homepageButtonLabel, lang)}
                        </a>
                      ) : (
                        <button
                          className="about-button"
                          type="button"
                          disabled
                          aria-label={`${local(b.homepageButtonLabel, lang)} — ${b.name}`}
                        >
                          {local(b.homepageButtonLabel, lang)}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {closing?.visible && (
          <section
            className={`about-closing about-${["plain", "soft", "dark"].includes(closing.variant) ? closing.variant : "plain"}`}
          >
            <div className="about-container">
              <h2>{closing.heading}</h2>
              {paragraphs(closing.description)}
              {closing.image && <Photo image={closing.image} />}{" "}
              {destination(closing.url, ctx.language) && (
                <a
                  className="about-button"
                  href={destination(closing.url, ctx.language)}
                >
                  {closing.label}
                </a>
              )}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
export function Head({ data, pageContext: ctx }) {
  const p = ctx.copy,
    seo = p.seo,
    lang = ctx.sanityLanguage,
    root = data.site.siteMetadata.siteUrl.replace(/\/$/, ""),
    url = root + localizedPath("/about/", ctx.language);
  const company = p.company.corporateProfile,
    founders = visibleItems(company.founders),
    brands = (p.brands || []).filter((b) => b.active !== false);
  const companyId = `${root}/#sertuin-srl`,
    people = founders.map((f) => ({
      "@type": "Person",
      "@id": `${root}/#${f._id.replace(/^drafts\./, "")}`,
      name: f.name,
      jobTitle: local(f.title, lang),
      description: local(f.biography, lang),
      worksFor: { "@id": companyId },
    }));
  const graph = [
    {
      "@type": "AboutPage",
      "@id": url,
      url,
      name: seo.title,
      description: seo.description,
      inLanguage: getLanguageConfig(ctx.language).htmlLang,
      about: [
        { "@id": companyId },
        ...people.map((f) => ({ "@id": f["@id"] })),
      ],
    },
    {
      "@type": "Organization",
      "@id": companyId,
      name: company.legalName,
      description: local(company.description, lang),
      location: {
        "@type": "Place",
        name: `${company.location}, ${company.country}`,
      },
      brand: brands.map((b) => ({ "@id": `${root}/#brand-${b.brandId}` })),
    },
    ...people,
    ...brands.map((b) => ({
      "@type": "Brand",
      "@id": `${root}/#brand-${b.brandId}`,
      name: b.name,
      description: local(b.description, lang),
      ...(homepage(b) ? { url: homepage(b) } : {}),
    })),
  ];
  const image = aboutImageAsset(seo.image);
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
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta
        property="og:description"
        content={seo.ogDescription || seo.description}
      />
      {image && (
        <>
          <meta
            property="og:image"
            content={image.url.startsWith("/") ? root + image.url : image.url}
          />
          <meta property="og:image:alt" content={seo.image.alt} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta
        name="twitter:description"
        content={seo.ogDescription || seo.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
export const query = graphql`
  query AboutTemplateQuery {
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
