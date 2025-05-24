import React, { useState, useEffect } from "react";

const svgCache = new Map();

const ContentfulSvg = ({
  url,
  color = "green",
  intensity = "500",
  className = "",
  isSelected = false,
  ...props
}) => {
  const [svgContent, setSvgContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSvg = async () => {
      if (svgCache.has(url)) {
        setSvgContent(svgCache.get(url));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        let svg = await response.text();

        // More aggressive cleaning of SVG attributes
        svg = svg
          // Remove fill attributes from all elements
          .replace(/fill="[^"]*"/g, "")
          .replace(/fill='[^']*'/g, "")
          // Remove stroke attributes
          .replace(/stroke="[^"]*"/g, "")
          .replace(/stroke='[^']*'/g, "")
          // Add currentColor as fill to the root SVG
          .replace(/<svg([^>]*)>/, '<svg$1 fill="currentColor">');

        svgCache.set(url, svg);
        setSvgContent(svg);
      } catch (error) {
        console.error("Failed to load SVG:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      loadSvg();
    }
  }, [url]);

  if (loading) {
    return <div className={`${className} animate-pulse bg-gray-200`} />;
  }

  const colorClass = `${isSelected ? `text-${color}-${intensity}` : ``}`;

  return (
    <div
      className={`${colorClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

export default ContentfulSvg;
