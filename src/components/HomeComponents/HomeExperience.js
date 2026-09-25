import React from "react";
import { getHomeContent } from "../../content/homeContent";
import CommitmentSection from "./CommitmentSection";
import ContactSection from "./ContactSection";
import EventsSection from "./EventsSection";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import TrustBar from "./TrustBar";
import WhatWeDoSection from "./WhatWeDoSection";
import { legacyRoutes, normalizeInternalPath } from "./homeRoutes";
import { createManagedText } from "./managedText";

// The hero's CTAs link to these sections.
const EVENTS_SECTION_ID = "events-we-plan";
const CONTACT_SECTION_ID = "start-your-event";

const PHONE_DISPLAY = "+1 829 522 2900";

// Current service cards only, in Contentful's homeOrder when it's set,
// otherwise in the order listed in homeContent.js.
const orderServices = (services, serviceOrder) => {
  const orderIndex = (service) => {
    const index = serviceOrder.indexOf(normalizeInternalPath(service.page.url));
    return index === -1 ? 999 : index;
  };

  return [...(services || [])]
    .filter(
      (service) =>
        service?.showOnHome !== false &&
        service?.page?.url &&
        !legacyRoutes.has(normalizeInternalPath(service.page.url)),
    )
    .sort((a, b) => {
      if (Number.isFinite(a.homeOrder) || Number.isFinite(b.homeOrder)) {
        return (a.homeOrder ?? 999) - (b.homeOrder ?? 999);
      }
      return orderIndex(a) - orderIndex(b);
    });
};

const HomeExperience = ({
  page,
  services,
  featureCard,
  generalInfo,
  language,
}) => {
  const content = getHomeContent(language);
  const managedText = createManagedText(language);
  const sectionProps = { page, content, managedText, language };

  const phoneDigits = (generalInfo?.telephone || "+18295222900").replace(
    /\D/g,
    "",
  );
  const email = generalInfo?.email || "info@sertuinevents.com";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(
    content.whatsappMessage,
  )}`;
  const availability = managedText(page?.contactEyebrow, content.availability);
  const primaryCtaUrl = page?.primaryCtaUrl || content.primaryCtaUrl;
  const secondaryCtaUrl = page?.secondaryCtaUrl || content.secondaryCtaUrl;

  return (
    <main className="overflow-hidden bg-primary-bg-color text-black">
      <HeroSection
        {...sectionProps}
        primaryCtaUrl={primaryCtaUrl}
        secondaryCtaUrl={secondaryCtaUrl}
      />
      <TrustBar availability={availability} items={content.trustItems} />
      <EventsSection
        {...sectionProps}
        id={EVENTS_SECTION_ID}
        services={orderServices(services, content.serviceOrder)}
      />
      <WhatWeDoSection {...sectionProps} />
      <ProcessSection {...sectionProps} />
      <CommitmentSection
        {...sectionProps}
        featureCard={featureCard}
        ctaUrl={primaryCtaUrl}
      />
      <ContactSection
        {...sectionProps}
        id={CONTACT_SECTION_ID}
        whatsappUrl={whatsappUrl}
        phoneDigits={phoneDigits}
        phoneDisplay={PHONE_DISPLAY}
        email={email}
        availability={availability}
      />
    </main>
  );
};

export default HomeExperience;
