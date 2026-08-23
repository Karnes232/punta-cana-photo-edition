import React, { useMemo, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

const validHttpsUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
};

const getEmbedUrl = (platform, value) => {
  const url = validHttpsUrl(value);
  if (!url) return null;
  const normalizedPlatform = String(platform || "").toLowerCase();

  if (normalizedPlatform === "instagram") {
    const match = url.pathname.match(/^\/(p|reel|tv)\/([^/]+)/i);
    return match
      ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/captioned/`
      : null;
  }
  if (normalizedPlatform === "tiktok") {
    const videoId = url.pathname.match(/\/video\/(\d+)/)?.[1];
    return videoId
      ? `https://www.tiktok.com/player/v1/${videoId}?autoplay=0`
      : null;
  }
  if (normalizedPlatform === "facebook") {
    const plugin = /\/videos\/|\/reel\/|\/watch/i.test(url.href)
      ? "video"
      : "post";
    return `https://www.facebook.com/plugins/${plugin}.php?href=${encodeURIComponent(url.href)}&show_text=true&width=640&autoplay=false`;
  }
  if (/youtu\.be|youtube\.com/i.test(url.hostname)) {
    const id = url.hostname.includes("youtu.be")
      ? url.pathname.slice(1)
      : url.searchParams.get("v") ||
        url.pathname.match(/\/shorts\/([^/]+)/)?.[1];
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=0`
      : null;
  }
  if (/vimeo\.com/i.test(url.hostname)) {
    const id = url.pathname.match(/\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}?autoplay=0` : null;
  }
  return null;
};

const LazyEmbed = ({ embed, language }) => {
  const [loaded, setLoaded] = useState(false);
  const sourceUrl = validHttpsUrl(embed?.url);
  const embedUrl = useMemo(
    () => getEmbedUrl(embed?.platform, embed?.url),
    [embed?.platform, embed?.url],
  );
  const spanish = language === "es";
  if (!sourceUrl) return null;

  return (
    <div className="social-embed">
      {loaded && embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${embed.platform || "Social"} embed`}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)}>
          <Play aria-hidden="true" />
          {spanish ? "Ver publicación" : "View post"}
        </button>
      )}
      {loaded && !embedUrl && (
        <a href={sourceUrl.href} target="_blank" rel="noopener noreferrer">
          {spanish ? "Abrir publicación" : "Open post"}
          <ExternalLink aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

const LazySocialEmbeds = ({ embeds = [], language }) => {
  if (!embeds?.length) return null;
  return (
    <section className="social-embeds" aria-label="Social media">
      {embeds.map((embed) => (
        <LazyEmbed
          key={embed.contentful_id || embed.url}
          embed={embed}
          language={language}
        />
      ))}
    </section>
  );
};

export default LazySocialEmbeds;
