import React from "react";

const asAbsoluteUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("//")) return `https:${value}`;
  return value;
};

const transformedUrl = (value, width, format) => {
  const url = asAbsoluteUrl(value);
  if (!url) return "";

  const params = [`w=${width}`];
  if (format) params.push(`fm=${format}`, "q=76");
  return `${url}${url.includes("?") ? "&" : "?"}${params.join("&")}`;
};

const responsiveWidths = (asset, requestedWidths) => {
  const sourceWidth = Number(asset?.width) || 1920;
  const requestedMaximum = Math.max(...requestedWidths.map(Number));
  const maximum = Math.min(sourceWidth, requestedMaximum);
  const widths = requestedWidths
    .map(Number)
    .filter((width) => width > 0 && width <= maximum);

  if (!widths.length || widths[widths.length - 1] !== maximum) {
    widths.push(maximum);
  }

  return [...new Set(widths)].sort((a, b) => a - b);
};

const ContentfulResponsiveImage = ({
  asset,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  sizes = "100vw",
  widths = [480, 960, 1440, 1920],
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  title,
}) => {
  const url = asAbsoluteUrl(asset?.url || asset?.file?.url);
  if (!url) return null;

  const candidates = responsiveWidths(asset, widths);
  const largest = candidates[candidates.length - 1];
  const width = Number(asset?.width) || largest;
  const height =
    Number(asset?.height) || Math.max(1, Math.round((width * 2) / 3));
  const webpSrcSet = candidates
    .map(
      (candidate) => `${transformedUrl(url, candidate, "webp")} ${candidate}w`,
    )
    .join(", ");

  return (
    <picture className={`block ${className}`}>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={transformedUrl(url, largest)}
        srcSet={candidates
          .map((candidate) => `${transformedUrl(url, candidate)} ${candidate}w`)
          .join(", ")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt || ""}
        title={title}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={imgClassName}
      />
    </picture>
  );
};

export default ContentfulResponsiveImage;
