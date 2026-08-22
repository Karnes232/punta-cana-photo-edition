import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";

// The player is mounted only once it approaches the viewport. react-player/lazy
// defers the player bundle but not the video, and `playing` forces an immediate
// load, so mounting eagerly pulled ~1.2 MB of Vimeo (including a 757 KB mp4) on
// every page load for a video that sits well below the fold.
const VideoPlayer = ({ url, vertical }) => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;

    const element = containerRef.current;
    if (!element) return undefined;

    // Without IntersectionObserver, fall back to loading straight away rather
    // than leaving an empty box.
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

  let height = "h-[35vh] md:h-[45vh] xl:h-[75vh] 2xl:h-[110vh]";
  if (vertical) {
    height = "h-[75vh] md:h-[45vh] lg:h-[70vh] xl:h-[65vh] 2xl:h-[70vh]";
  }

  // The wrapper keeps its height whether or not the player has mounted, so
  // swapping the placeholder for the player causes no layout shift.
  return (
    <div ref={containerRef} className={`mt-3 w-full mx-0 ${height}`}>
      {shouldLoad ? (
        <ReactPlayer
          url={url}
          muted
          controls
          playing={true}
          loop
          width="100%"
          height="100%"
          pip
        />
      ) : (
        <div className="h-full w-full bg-black/5" aria-hidden="true" />
      )}
    </div>
  );
};

export default VideoPlayer;
