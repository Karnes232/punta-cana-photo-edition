import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const imageUrl = (url, width) => `${url}?w=${width}&fm=webp&q=78&fit=fill`;

const BlogGallery = ({
  images = [],
  language = "en-US",
  articleTitle = "",
}) => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (expandedIndex === null) return undefined;
    const closeOnEscape = (event) =>
      event.key === "Escape" && setExpandedIndex(null);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [expandedIndex]);

  if (!images.length) return null;

  const goTo = (index) => {
    const nextIndex = Math.max(0, Math.min(index, images.length - 1));
    trackRef.current?.children?.[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(nextIndex);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (track?.clientWidth)
      setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const expanded = expandedIndex === null ? null : images[expandedIndex]?.image;

  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const localized = (portuguese, french, english) =>
    isPortuguese ? portuguese : isFrench ? french : english;
  const galleryLabel = localized(
    "Galeria de imagens",
    "Galerie d’images",
    "Image gallery",
  );
  const imageAlt = (item, index) =>
    isPortuguese || isFrench
      ? `${articleTitle || localized("Evento em Punta Cana", "Événement à Punta Cana", "Punta Cana event")} — ${localized("imagem", "image", "image")} ${index + 1}`
      : item.altText || "";

  return (
    <section className="blog-gallery" aria-label={galleryLabel}>
      <div className="blog-gallery__frame">
        <div
          className="blog-gallery__track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {images.map((item, index) => {
            const image = item?.image;
            if (!image?.url) return null;
            return (
              <figure className="blog-gallery__slide" key={item.contentful_id}>
                <button
                  type="button"
                  className="blog-gallery__expand"
                  onClick={() => setExpandedIndex(index)}
                  aria-label={`${localized("Ver imagem", "Voir l’image", "View image")} ${index + 1} ${localized("de", "sur", "of")} ${images.length}`}
                >
                  <img
                    src={imageUrl(image.url, 960)}
                    srcSet={`${imageUrl(image.url, 640)} 640w, ${imageUrl(image.url, 960)} 960w, ${imageUrl(image.url, 1440)} 1440w`}
                    sizes="(min-width: 1024px) 960px, 100vw"
                    width={image.width}
                    height={image.height}
                    alt={imageAlt(item, index)}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                {isPortuguese || isFrench ? (
                  <figcaption>{`${articleTitle} — ${localized("imagem", "image", "image")} ${index + 1}`}</figcaption>
                ) : (
                  item.caption && <figcaption>{item.caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="blog-gallery__arrow blog-gallery__arrow--previous"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label={localized(
                "Imagem anterior",
                "Image précédente",
                "Previous image",
              )}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="blog-gallery__arrow blog-gallery__arrow--next"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
              aria-label={localized(
                "Próxima imagem",
                "Image suivante",
                "Next image",
              )}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div
          className="blog-gallery__dots"
          aria-label={localized(
            "Escolher uma imagem",
            "Choisir une image",
            "Choose an image",
          )}
        >
          {images.map((item, index) => (
            <button
              type="button"
              key={item.contentful_id}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => goTo(index)}
              aria-label={`${localized("Imagem", "Image", "Image")} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
      {expanded && (
        <div
          className="blog-gallery__dialog"
          role="dialog"
          aria-modal="true"
          aria-label={localized(
            "Imagem ampliada",
            "Image agrandie",
            "Expanded image",
          )}
          onClick={() => setExpandedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setExpandedIndex(null)}
            aria-label={localized(
              "Fechar imagem ampliada",
              "Fermer l’image agrandie",
              "Close expanded image",
            )}
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={imageUrl(expanded.url, 1800)}
            alt={imageAlt(images[expandedIndex], expandedIndex)}
            width={expanded.width}
            height={expanded.height}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default BlogGallery;
