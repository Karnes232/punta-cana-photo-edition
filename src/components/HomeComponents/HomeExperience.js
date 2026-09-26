import React from "react";
import { getHomeContent } from "../../content/homeContent";
import CommitmentSection from "./CommitmentSection";
import ContactSection from "./ContactSection";
import EventsSection from "./EventsSection";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import TrustBar from "./TrustBar";
import WhatWeDoSection from "./WhatWeDoSection";

// The hero's buttons link to these sections.
const EVENTS_SECTION_ID = "events-we-plan";
const CONTACT_SECTION_ID = "start-your-event";

const PHONE_DISPLAY = "+1 829 522 2900";

// The page content comes from this language's Home Page document in Sanity;
// phone and email from General Layout; the contact form's text from the repo.
const HomeExperience = ({ home, generalInfo, language }) => {
  if (!home) return null;

  const phoneDigits = (generalInfo?.telephone || "+18295222900").replace(
    /\D/g,
    "",
  );
  const email = generalInfo?.email || "info@sertuinevents.com";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneDigits}&text=${encodeURIComponent(
    home.whatsappMessage || "",
  )}`;

  return (
    <main className="overflow-hidden bg-primary-bg-color text-black">
      <HeroSection home={home} language={language} />
      <TrustBar availability={home.availability} items={home.highlights} />
      <EventsSection id={EVENTS_SECTION_ID} home={home} language={language} />
      <WhatWeDoSection home={home} />
      <ProcessSection home={home} />
      <CommitmentSection home={home} language={language} />
      <ContactSection
        id={CONTACT_SECTION_ID}
        home={home}
        formContent={getHomeContent(language)}
        language={language}
        whatsappUrl={whatsappUrl}
        phoneDigits={phoneDigits}
        phoneDisplay={PHONE_DISPLAY}
        email={email}
      />
    </main>
  );
};

export default HomeExperience;
