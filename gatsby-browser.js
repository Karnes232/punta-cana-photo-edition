// Self-hosted variable fonts. These replace the two render-blocking
// fonts.googleapis.com stylesheets, which cost ~1.9s of blocked render.
// The wght axis covers every weight the site uses (100-700).
import "@fontsource-variable/crimson-pro";
import "@fontsource-variable/montserrat";

import "./src/styles/global.css";
import "./src/components/Layout/Navbar/header.css";
import "./src/components/Layout/Footer/Footer.css";
import "./src/components/SwiperCarouselComponent/swiper.css";
import "./src/components/ContactForm/contact.css";

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  window.history.scrollRestoration = "manual";
  const currentPosition = getSavedScrollPosition(location, location.key);
  if (!currentPosition) {
    window.scrollTo(0, 0);
  } else {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo(...currentPosition);
      });
    }, 0);
  }

  return false;
};
