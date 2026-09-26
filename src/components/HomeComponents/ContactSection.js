import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";
import HomeContactForm from "./HomeContactForm";

const ContactLink = ({ href, icon: Icon, label, detail, external }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    className="flex items-center gap-4 border-b border-white/15 pb-4 font-montserrat text-sm font-semibold text-white no-underline"
  >
    <Icon aria-hidden="true" className="text-primary-color" />
    <span>
      {label}
      <small className="mt-1 block font-normal text-gray-400">{detail}</small>
    </span>
  </a>
);

const ContactSection = ({
  id,
  home,
  formContent,
  language,
  whatsappUrl,
  phoneDigits,
  phoneDisplay,
  email,
}) => (
  <section id={id} className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
          {home.contactEyebrow}
        </p>
        <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight md:text-6xl">
          {home.contactTitle}
        </h2>
        <p className="mt-6 font-montserrat text-base leading-8 text-gray-300 md:text-lg">
          {home.contactBody}
        </p>
        <div className="mt-9 space-y-4">
          <ContactLink
            href={whatsappUrl}
            external
            icon={MessageCircle}
            label={home.whatsappLabel}
            detail={phoneDisplay}
          />
          <ContactLink
            href={`tel:+${phoneDigits}`}
            icon={Phone}
            label={home.callLabel}
            detail={phoneDisplay}
          />
          <ContactLink
            href={`mailto:${email}`}
            icon={Mail}
            label={home.emailLabel}
            detail={email}
          />
          <p className="flex items-center gap-4 font-montserrat text-sm font-semibold text-white">
            <CalendarDays aria-hidden="true" className="text-primary-color" />
            {home.availability}
          </p>
        </div>
      </div>
      <HomeContactForm content={formContent} language={language} />
    </div>
  </section>
);

export default ContactSection;
