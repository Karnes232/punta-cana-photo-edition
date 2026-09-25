import React from "react";
import ServiceCard from "./ServiceCard";

const EventsSection = ({ id, page, content, managedText, services, language }) => (
  <section id={id} className="px-6 py-20 md:px-10 md:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#80651f]">
          {content.eventsEyebrow}
        </p>
        <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight text-black md:text-6xl">
          {managedText(page?.sectionTitle, content.eventsTitle)}
        </h2>
        <p className="mt-6 font-montserrat text-base leading-8 text-gray-700 md:text-lg">
          {content.eventsIntro}
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={`${service.typeOfService}-${service.page.url}`}
            service={service}
            content={content}
            language={language}
          />
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
