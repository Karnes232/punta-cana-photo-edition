import { useEffect } from "react";

export const useImageProtection = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const protectImages = () => {
        const images = document.querySelectorAll("img");

        images.forEach((img) => {
          // Prevent right click (desktop)
          img.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            return false;
          });

          // Prevent drag operations (works on both mobile and desktop)
          img.addEventListener("dragstart", (e) => {
            e.preventDefault();
            return false;
          });

          // Prevent long-press context menu on mobile (without blocking scrolling)
          let longPressTimer;
          img.addEventListener(
            "touchstart",
            (e) => {
              // Only prevent if touching directly on the image for long-press
              longPressTimer = setTimeout(() => {
                e.preventDefault();
              }, 500);
            },
            { passive: true }, // Keep passive for better scroll performance
          );

          img.addEventListener(
            "touchend",
            () => {
              clearTimeout(longPressTimer);
            },
            { passive: true },
          );

          img.addEventListener(
            "touchmove",
            () => {
              // Cancel long-press if user is scrolling
              clearTimeout(longPressTimer);
            },
            { passive: true },
          );

          // Prevent pinch to save (mobile)
          img.addEventListener(
            "gesturestart",
            (e) => {
              e.preventDefault();
            },
            { passive: false },
          );

          // Add copy protection attributes
          img.style.userSelect = "none";
          img.style.webkitUserSelect = "none";
          img.style.webkitTouchCallout = "none";
          img.style.webkitUserDrag = "none";
          img.setAttribute("draggable", "false");
          img.style.pointerEvents = "none"; // Prevents context menu on long-press

          // Optional: Add force-press protection (iOS)
          img.style.webkitForcePressCallback = "none";
        });

        // Prevent save shortcuts (desktop)
        const handleKeyDown = (e) => {
          if (
            (e.ctrlKey || e.metaKey) &&
            (e.key === "s" || e.key === "S" || e.key === "c" || e.key === "C")
          ) {
            e.preventDefault();
            return false;
          }
        };
        document.addEventListener("keydown", handleKeyDown);

        // Store cleanup reference
        return handleKeyDown;
      };

      // Handle dynamically loaded images
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeName === "IMG") {
                protectImages();
              }
            });
          }
        });
      });

      // Initial protection
      const handleKeyDown = protectImages();

      // Start observing
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      // Cleanup
      return () => {
        observer.disconnect();
        if (handleKeyDown) {
          document.removeEventListener("keydown", handleKeyDown);
        }
      };
    }
  }, []);
};
