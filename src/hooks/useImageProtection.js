import { useEffect } from 'react';

export const useImageProtection = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const protectImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
          // Prevent right click (desktop)
          img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
          });

          // Prevent drag operations (works on both mobile and desktop)
          img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
          });

          // Prevent touch operations (mobile)
          img.addEventListener('touchstart', (e) => {
            e.preventDefault();
          }, { passive: false });

          img.addEventListener('touchend', (e) => {
            e.preventDefault();
          }, { passive: false });

          // Prevent long-press to save (mobile)
          img.addEventListener('touchhold', (e) => {
            e.preventDefault();
          }, { passive: false });

          // Prevent pinch to save (mobile)
          img.addEventListener('gesturestart', (e) => {
            e.preventDefault();
          }, { passive: false });

          // Add copy protection attributes
          img.style.userSelect = 'none';
          img.style.webkitUserSelect = 'none';
          img.style.webkitTouchCallout = 'none';
          img.style.webkitUserDrag = 'none';
          img.setAttribute('draggable', 'false');
          
          // Optional: Add force-press protection (iOS)
          img.style.webkitForcePressCallback = 'none';
        });

        // Prevent save shortcuts (desktop)
        document.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && 
              (e.key === 's' || e.key === 'S' || 
               e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            return false;
          }
        });

        // Prevent force touch (iOS)
        document.addEventListener('touchforcechange', (e) => {
          e.preventDefault();
        }, { passive: false });
      };

      // Handle dynamically loaded images
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeName === 'IMG') {
                protectImages();
              }
            });
          }
        });
      });

      // Initial protection
      protectImages();

      // Start observing
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, []);
};