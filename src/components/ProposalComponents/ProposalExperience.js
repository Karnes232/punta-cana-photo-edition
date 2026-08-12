import React from "react";
import { Link } from "gatsby";
import {
  BadgeDollarSign,
  CalendarCheck2,
  Camera,
  CarFront,
  Clock3,
  FileText,
  Flower2,
  Instagram,
  MapPin,
  MapPinned,
  Music2,
  PartyPopper,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UtensilsCrossed,
  UserRoundCheck,
  Video,
  Wine,
} from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/HcYUKFzHrAj86fMh7";
const GOOGLE_REVIEW_URL = "https://g.page/r/CYRe9l94QQaWEBM/review";

const copy = {
  "en-US": {
    overviewEyebrow: "A complete experience, clearly priced",
    overviewTitle: "A Private, All-Inclusive Proposal in Punta Cana",
    overviewParagraphs: [
      "Every Sertuin Events package is a complete, all-inclusive experience held on our own private beach in Uvero Alto. The published package price already includes private round-trip transportation from any hotel or accommodation throughout Punta Cana, private beach access, your selected romantic setup, a celebratory beverage, professional photography, your preferred song and a dedicated on-site coordinator.",
      "Choose the package that reflects your vision, reserve your date with a US$200 deposit and let our team coordinate the arrival, timing and reveal while you focus entirely on your partner and the question you came to ask.",
    ],
    quickFacts: [
      [MapPin, "Private beach included", "No separate rental or venue fee"],
      [CarFront, "Round-trip transportation", "No Punta Cana zone surcharge"],
      [
        Camera,
        "70+ edited photographs",
        "Professionally edited in high resolution",
      ],
      [
        Clock3,
        "Delivered within 48 hours",
        "Your complete photography gallery",
      ],
      [
        Smartphone,
        "Proposal video included",
        "Phone recording at no additional cost",
      ],
      [
        CalendarCheck2,
        "Reserve with US$200",
        "No full advance payment required",
      ],
    ],
    packagesFallbackTitle: "Punta Cana Proposal Packages and Prices",
    inclusionsEyebrow: "Included with every package",
    inclusionsTitle: "Everything Essential Is Already Included",
    inclusionsIntro:
      "The published package price covers the services needed to coordinate, create and document your proposal. There are no separate mandatory charges for transportation within Punta Cana, private beach access or professional photography.",
    inclusions: [
      [
        MapPin,
        "Private Beach Access",
        "Your experience takes place on our own private beach in Uvero Alto, with no separate beach rental or venue fee.",
      ],
      [
        CarFront,
        "Private Transportation",
        "Private pickup and return transportation from any hotel or accommodation throughout Punta Cana, with no zone surcharge.",
      ],
      [
        Flower2,
        "Selected Romantic Setup",
        "The decoration associated with your chosen package is completely prepared before your arrival.",
      ],
      [
        Camera,
        "Professional Photography",
        "Receive more than 70 professionally edited, high-resolution photographs within 48 hours.",
      ],
      [
        Smartphone,
        "Proposal Video",
        "We record the actual proposal on a phone at no additional cost, even when professional video is not added.",
      ],
      [
        Music2,
        "Music and Celebration",
        "Your preferred song is played through our sound system and a celebratory beverage is included.",
      ],
      [
        UserRoundCheck,
        "Dedicated Coordinator",
        "Your on-site coordinator manages the arrival, timing, selected music and reveal.",
      ],
    ],
    upgradesTitle: "Optional Ways to Personalize Your Experience",
    upgradesIntro:
      "Your package already includes everything essential. These optional enhancements can be added according to your vision and availability.",
    upgrades: [
      [Video, "Cinematic video and drone coverage"],
      [Music2, "Live musicians"],
      [UtensilsCrossed, "Private romantic dinner"],
      [Sparkles, "Cold sparks"],
      [Flower2, "Custom flowers"],
    ],
    momentsEyebrow: "Real Sertuin Events experiences",
    momentsTitle: "Real Punta Cana Proposal Moments",
    momentsIntro:
      "Explore real setups and celebrations created by our team on the private beach in Uvero Alto.",
    bookingEyebrow: "Simple and secure",
    bookingTitle: "How to Reserve Your Punta Cana Proposal",
    bookingIntro:
      "You do not have to pay the full package price in advance. A US$200 deposit reserves your date and is deducted from the total.",
    bookingSteps: [
      [
        CalendarCheck2,
        "Choose your package and date",
        "Send your preferred package, date, hotel or accommodation and any initial personalization requests.",
      ],
      [
        ShieldCheck,
        "Confirm availability",
        "Our team confirms the private beach, transportation and the services associated with your selected package.",
      ],
      [
        FileText,
        "Receive your service agreement",
        "We send a written agreement with the selected services, payment terms and a secure PayPal payment link.",
      ],
      [
        BadgeDollarSign,
        "Reserve with a US$200 deposit",
        "The deposit is deducted from the total. You do not need to pay the full package price in advance.",
      ],
      [
        PartyPopper,
        "We coordinate every detail",
        "After confirmation, we coordinate pickup, music, personalization, arrival, timing and reveal. The remaining balance is paid after the experience according to your agreement.",
      ],
    ],
    pricingTitle: "Clear and Transparent Pricing",
    pricingText:
      "There are no separate mandatory charges for the private beach, professional photographer or transportation within Punta Cana. Optional services are added only when you request them and are listed separately in your service agreement.",
    contactLabel: "Check availability",
    trustEyebrow: "Verified business and real experiences",
    trustTitle: "Connect With Sertuin Events",
    trustIntro:
      "Use our official profiles to see recent work, read client experiences or share your own after your proposal.",
    mapsTitle: "Google Business Profile",
    mapsText:
      "View our verified business information and client reviews on Google Maps.",
    mapsLink: "View on Google Maps",
    reviewTitle: "Share Your Experience",
    reviewText:
      "Clients can leave an honest review directly through our official Google review link.",
    reviewLink: "Write a Google review",
    instagramTitle: "@sertuinevents",
    instagramText:
      "See proposal setups, photographs and recent experiences on our official Instagram account.",
    instagramLink: "Visit Instagram",
  },
  es: {
    overviewEyebrow: "Una experiencia completa con precios claros",
    overviewTitle: "Una propuesta privada y todo incluido en Punta Cana",
    overviewParagraphs: [
      "Cada paquete de Sertuin Events es una experiencia completa y todo incluido en nuestra propia playa privada de Uvero Alto. El precio publicado ya incluye transporte privado de ida y vuelta desde cualquier hotel o alojamiento de Punta Cana, acceso a la playa privada, la decoración romántica seleccionada, bebida para celebrar, fotografía profesional, tu canción preferida y un coordinador dedicado en el lugar.",
      "Elige el paquete que represente tu visión, reserva la fecha con un depósito de US$200 y permite que nuestro equipo coordine la llegada, el momento y la revelación mientras tú te concentras completamente en tu pareja.",
    ],
    quickFacts: [
      [MapPin, "Playa privada incluida", "Sin cargo separado de alquiler"],
      [
        CarFront,
        "Transporte de ida y vuelta",
        "Sin recargo por zona en Punta Cana",
      ],
      [
        Camera,
        "Más de 70 fotografías",
        "Editadas profesionalmente en alta resolución",
      ],
      [Clock3, "Entrega en 48 horas", "Galería fotográfica completa"],
      [
        Smartphone,
        "Video de la propuesta incluido",
        "Grabación con teléfono sin costo adicional",
      ],
      [
        CalendarCheck2,
        "Reserva con US$200",
        "No requiere pago total anticipado",
      ],
    ],
    packagesFallbackTitle: "Paquetes y precios de propuestas en Punta Cana",
    inclusionsEyebrow: "Incluido en cada paquete",
    inclusionsTitle: "Todo lo esencial ya está incluido",
    inclusionsIntro:
      "El precio publicado cubre los servicios necesarios para coordinar, crear y documentar la propuesta. No existen cargos obligatorios separados por transporte dentro de Punta Cana, acceso a la playa privada o fotografía profesional.",
    inclusions: [
      [
        MapPin,
        "Acceso a playa privada",
        "La experiencia se realiza en nuestra propia playa privada de Uvero Alto, sin cargo separado de alquiler o lugar.",
      ],
      [
        CarFront,
        "Transporte privado",
        "Recogida y regreso desde cualquier hotel o alojamiento de Punta Cana, sin recargo por zona.",
      ],
      [
        Flower2,
        "Decoración seleccionada",
        "La decoración correspondiente al paquete elegido queda completamente preparada antes de tu llegada.",
      ],
      [
        Camera,
        "Fotografía profesional",
        "Recibe más de 70 fotografías editadas profesionalmente y en alta resolución dentro de 48 horas.",
      ],
      [
        Smartphone,
        "Video de la propuesta",
        "Grabamos la propuesta con un teléfono sin costo adicional, aunque no agregues video profesional.",
      ],
      [
        Music2,
        "Música y celebración",
        "Reproducimos tu canción preferida en nuestro sistema de sonido e incluimos una bebida para celebrar.",
      ],
      [
        UserRoundCheck,
        "Coordinador dedicado",
        "El coordinador en el lugar administra la llegada, el tiempo, la música seleccionada y la revelación.",
      ],
    ],
    upgradesTitle: "Opciones para personalizar la experiencia",
    upgradesIntro:
      "El paquete ya incluye todo lo esencial. Estas mejoras opcionales pueden agregarse según tu visión y disponibilidad.",
    upgrades: [
      [Video, "Video cinematográfico y dron"],
      [Music2, "Músicos en vivo"],
      [UtensilsCrossed, "Cena romántica privada"],
      [Sparkles, "Chispas frías"],
      [Flower2, "Flores personalizadas"],
    ],
    momentsEyebrow: "Experiencias reales de Sertuin Events",
    momentsTitle: "Momentos reales de propuestas en Punta Cana",
    momentsIntro:
      "Descubre decoraciones y celebraciones reales creadas por nuestro equipo en la playa privada de Uvero Alto.",
    bookingEyebrow: "Sencillo y seguro",
    bookingTitle: "Cómo reservar tu propuesta en Punta Cana",
    bookingIntro:
      "No tienes que pagar el precio completo por adelantado. Un depósito de US$200 reserva la fecha y se descuenta del total.",
    bookingSteps: [
      [
        CalendarCheck2,
        "Elige el paquete y la fecha",
        "Envíanos el paquete, la fecha, el hotel o alojamiento y cualquier solicitud inicial de personalización.",
      ],
      [
        ShieldCheck,
        "Confirma disponibilidad",
        "Nuestro equipo confirma la playa privada, el transporte y los servicios correspondientes al paquete seleccionado.",
      ],
      [
        FileText,
        "Recibe el acuerdo de servicio",
        "Te enviamos un acuerdo escrito con los servicios, condiciones de pago y un enlace seguro de PayPal.",
      ],
      [
        BadgeDollarSign,
        "Reserva con un depósito de US$200",
        "El depósito se descuenta del total. No tienes que pagar el precio completo por adelantado.",
      ],
      [
        PartyPopper,
        "Coordinamos cada detalle",
        "Después de confirmar, coordinamos la recogida, música, personalización, llegada y revelación. El saldo se paga después de la experiencia según el acuerdo.",
      ],
    ],
    pricingTitle: "Precios claros y transparentes",
    pricingText:
      "No existen cargos obligatorios separados por la playa privada, el fotógrafo profesional o el transporte dentro de Punta Cana. Los servicios opcionales solo se agregan cuando los solicitas y aparecen por separado en el acuerdo.",
    contactLabel: "Consultar disponibilidad",
    trustEyebrow: "Negocio verificado y experiencias reales",
    trustTitle: "Conecta con Sertuin Events",
    trustIntro:
      "Utiliza nuestros perfiles oficiales para ver trabajos recientes, leer experiencias de clientes o compartir la tuya después de la propuesta.",
    mapsTitle: "Perfil de Empresa en Google",
    mapsText:
      "Consulta la información verificada del negocio y las opiniones de clientes en Google Maps.",
    mapsLink: "Ver en Google Maps",
    reviewTitle: "Comparte tu experiencia",
    reviewText:
      "Los clientes pueden dejar una reseña honesta mediante nuestro enlace oficial de Google.",
    reviewLink: "Escribir una reseña",
    instagramTitle: "@sertuinevents",
    instagramText:
      "Mira decoraciones, fotografías y experiencias recientes en nuestra cuenta oficial de Instagram.",
    instagramLink: "Visitar Instagram",
  },
};

const getCopy = (language) => copy[language === "es" ? "es" : "en-US"];

const Eyebrow = ({ children }) => (
  <p className="font-crimson uppercase tracking-[0.22em] text-xs md:text-sm text-gray-500">
    {children}
  </p>
);

const SectionHeading = ({ eyebrow, title, intro, id }) => (
  <div className="max-w-3xl mx-auto text-center px-5">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2
      id={id}
      className="font-crimson font-normal tracking-wide text-3xl md:text-4xl text-gray-900 mt-3"
    >
      {title}
    </h2>
    {intro && (
      <p className="font-crimson text-lg text-gray-700 leading-relaxed mt-5">
        {intro}
      </p>
    )}
  </div>
);

const Icon = ({ component: IconComponent, className = "" }) => (
  <IconComponent
    aria-hidden="true"
    strokeWidth={1.35}
    className={`w-7 h-7 text-primary-color ${className}`}
  />
);

export const ProposalIntroduction = ({ language }) => {
  const content = getCopy(language);

  return (
    <section
      aria-labelledby="proposal-overview-heading"
      className="bg-secondary-bg-color py-14 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white px-6 py-10 md:px-14 md:py-14">
          <SectionHeading
            id="proposal-overview-heading"
            eyebrow={content.overviewEyebrow}
            title={content.overviewTitle}
          />
          <div className="max-w-4xl mx-auto mt-7 space-y-5 text-center">
            {content.overviewParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-crimson text-lg text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 mt-px">
          {content.quickFacts.map(([icon, title, description]) => (
            <article
              key={title}
              className="bg-white flex items-start gap-4 px-6 py-6"
            >
              <Icon component={icon} className="shrink-0 mt-1" />
              <div>
                <h3 className="font-crimson text-xl text-gray-900">{title}</h3>
                <p className="font-crimson text-gray-600 mt-1">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProposalInclusions = ({ language }) => {
  const content = getCopy(language);

  return (
    <section
      aria-labelledby="proposal-inclusions-heading"
      className="py-16 md:py-24 bg-secondary-bg-color"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-inclusions-heading"
          eyebrow={content.inclusionsEyebrow}
          title={content.inclusionsTitle}
          intro={content.inclusionsIntro}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 mt-12">
          {content.inclusions.map(([icon, title, description]) => (
            <article key={title} className="bg-white p-7 md:p-8">
              <Icon component={icon} />
              <h3 className="font-crimson text-2xl text-gray-900 mt-5">
                {title}
              </h3>
              <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="bg-white px-6 py-10 md:px-12 md:py-12 mt-12">
          <h3 className="font-crimson font-normal tracking-wide text-2xl md:text-3xl text-gray-900 text-center">
            {content.upgradesTitle}
          </h3>
          <p className="font-crimson text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            {content.upgradesIntro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-9">
            {content.upgrades.map(([icon, title]) => (
              <li
                key={title}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon component={icon} />
                <span className="font-crimson text-lg text-gray-800">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const ProposalMomentsHeading = ({ language }) => {
  const content = getCopy(language);

  return (
    <div className="pt-16 md:pt-24 pb-10 bg-white">
      <SectionHeading
        id="proposal-moments-heading"
        eyebrow={content.momentsEyebrow}
        title={content.momentsTitle}
        intro={content.momentsIntro}
      />
    </div>
  );
};

export const ProposalBookingProcess = ({ language }) => {
  const content = getCopy(language);
  const contactPath = language === "es" ? "/es/contact/" : "/contact/";

  return (
    <section
      aria-labelledby="proposal-booking-heading"
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-booking-heading"
          eyebrow={content.bookingEyebrow}
          title={content.bookingTitle}
          intro={content.bookingIntro}
        />

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200 mt-12">
          {content.bookingSteps.map(([icon, title, description], index) => (
            <li key={title} className="bg-secondary-bg-color p-6 md:p-7">
              <div className="flex items-center justify-between">
                <Icon component={icon} />
                <span className="font-crimson text-3xl text-gray-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-crimson text-xl text-gray-900 mt-6">
                {title}
              </h3>
              <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                {description}
              </p>
            </li>
          ))}
        </ol>

        <div className="border border-primary-color px-6 py-9 md:px-12 md:py-10 mt-12 text-center">
          <Wine
            aria-hidden="true"
            strokeWidth={1.35}
            className="w-8 h-8 text-primary-color mx-auto"
          />
          <h3 className="font-crimson text-2xl md:text-3xl text-gray-900 mt-4">
            {content.pricingTitle}
          </h3>
          <p className="font-crimson text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mt-4">
            {content.pricingText}
          </p>
          <Link
            to={contactPath}
            className="inline-flex no-underline border border-gray-700 rounded-3xl px-7 py-3 mt-7 font-crimson text-gray-700 hover:bg-black hover:text-white transition-colors duration-300"
          >
            {content.contactLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export const ProposalTrust = ({ language, instagramUrl }) => {
  const content = getCopy(language);
  const officialInstagram = /^https?:\/\//i.test(instagramUrl || "")
    ? instagramUrl
    : "https://www.instagram.com/sertuinevents/";
  const cards = [
    [
      MapPinned,
      content.mapsTitle,
      content.mapsText,
      content.mapsLink,
      GOOGLE_MAPS_URL,
    ],
    [
      ShieldCheck,
      content.reviewTitle,
      content.reviewText,
      content.reviewLink,
      GOOGLE_REVIEW_URL,
    ],
    [
      Instagram,
      content.instagramTitle,
      content.instagramText,
      content.instagramLink,
      officialInstagram,
    ],
  ];

  return (
    <section
      aria-labelledby="proposal-trust-heading"
      className="py-16 md:py-24 bg-secondary-bg-color"
    >
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          id="proposal-trust-heading"
          eyebrow={content.trustEyebrow}
          title={content.trustTitle}
          intro={content.trustIntro}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 mt-12">
          {cards.map(([icon, title, description, linkText, url]) => (
            <article key={title} className="bg-white p-8 text-center">
              <Icon component={icon} className="mx-auto" />
              <h3 className="font-crimson text-2xl text-gray-900 mt-5">
                {title}
              </h3>
              <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                {description}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-block font-crimson text-gray-700 underline underline-offset-4 mt-6"
              >
                {linkText}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const getProposalCopy = getCopy;
export { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL };
