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
  page,
  content,
  managedText,
  language,
  whatsappUrl,
  phoneDigits,
  phoneDisplay,
  email,
  availability,
}) => (
  <section id={id} className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-primary-color">
          {managedText(page?.contactEyebrow, content.contactEyebrow)}
        </p>
        <h2 className="mt-4 font-crimson text-4xl font-medium leading-tight md:text-6xl">
          {managedText(page?.contactHeading, content.contactTitle)}
        </h2>
        <p className="mt-6 font-montserrat text-base leading-8 text-gray-300 md:text-lg">
          {managedText(page?.contactBody, content.contactBody)}
        </p>
        <div className="mt-9 space-y-4">
          <ContactLink
            href={whatsappUrl}
            external
            icon={MessageCircle}
            label={content.whatsapp}
            detail={phoneDisplay}
          />
          <ContactLink
            href={`tel:+${phoneDigits}`}
            icon={Phone}
            label={content.call}
            detail={phoneDisplay}
          />
          <ContactLink
            href={`mailto:${email}`}
            icon={Mail}
            label={content.email}
            detail={email}
          />
          <p className="flex items-center gap-4 font-montserrat text-sm font-semibold text-white">
            <CalendarDays aria-hidden="true" className="text-primary-color" />
            {availability}
          </p>
        </div>
      </div>
      <HomeContactForm content={content} language={language} />
    </div>
  </section>
);

export default ContactSection;
