import React, { useEffect, useRef, useState } from "react";

// The Maps embed pulls ~469 KB across 15 scripts and ~290ms of main thread, and
// it sits at the very bottom of the contact page. loading="lazy" alone is not
// enough: Chrome's lazy threshold is roughly 1250px below the fold (more on slow
// connections) and this iframe lands well inside that, so it would still load
// eagerly. Mounting it on intersection makes the deferral deterministic;
// loading="lazy" stays as a second line of defence.
const GoogleMap = () => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;

    const element = containerRef.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  // The wrapper keeps its h-96 height either way, so swapping the placeholder
  // for the iframe causes no layout shift.
  return (
    <div
      ref={containerRef}
      className="google-maps mx-5 h-96 lg:mx-10 xl:mx-auto xl:w-[64rem] max-w-5xl"
    >
      {shouldLoad ? (
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          scrolling="no"
          title="Map of Punta Cana, Dominican Republic"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Punta%20Cana+()&amp;t=h&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          className="border-0"
        ></iframe>
      ) : (
        <div className="h-full w-full bg-black/5" aria-hidden="true" />
      )}
    </div>
  );
};

export default GoogleMap;
