import React from "react";
import { Link } from "gatsby";
import {
  CalendarCheck2,
  Camera,
  CarFront,
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
      "Booking is simple and secure, and you do not have to pay the full package price in advance.",
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
        "Sign the agreement and reserve your date",
        "We send a written service agreement and a secure PayPal link. A US$200 deposit reserves the date and is deducted from the total.",
      ],
      [
        PartyPopper,
        "We coordinate every detail",
        "After confirmation, we coordinate pickup, music, personalization, arrival, timing and reveal. The remaining balance is paid after the experience according to your agreement.",
      ],
    ],
    contactLabel: "Check availability",
    trustEyebrow: "Verified business and real experiences",
    trustTitle: "Connect With Sertuin Events",
    trustIntro:
      "Use our official profiles to see recent work, read client experiences or share your own after your proposal.",
    mapsTitle: "Google Business Profile",
    mapsText:
      "View our verified business information and client reviews on Google Maps.",
    mapsLink: "View on Google Maps",
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
      "La reserva es sencilla y segura, y no tienes que pagar el precio completo por adelantado.",
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
        "Firma el acuerdo y reserva la fecha",
        "Te enviamos un acuerdo de servicio escrito y un enlace seguro de PayPal. Un depósito de US$200 reserva la fecha y se descuenta del total.",
      ],
      [
        PartyPopper,
        "Coordinamos cada detalle",
        "Después de confirmar, coordinamos la recogida, música, personalización, llegada y revelación. El saldo se paga después de la experiencia según el acuerdo.",
      ],
    ],
    contactLabel: "Consultar disponibilidad",
    trustEyebrow: "Negocio verificado y experiencias reales",
    trustTitle: "Conecta con Sertuin Events",
    trustIntro:
      "Utiliza nuestros perfiles oficiales para ver trabajos recientes, leer experiencias de clientes o compartir la tuya después de la propuesta.",
    mapsTitle: "Perfil de Empresa en Google",
    mapsText:
      "Consulta la información verificada del negocio y las opiniones de clientes en Google Maps.",
    mapsLink: "Ver en Google Maps",
    reviewLink: "Escribir una reseña",
    instagramTitle: "@sertuinevents",
    instagramText:
      "Mira decoraciones, fotografías y experiencias recientes en nuestra cuenta oficial de Instagram.",
    instagramLink: "Visitar Instagram",
  },
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export const buildProposalFaqs = ({ language, packages = [] }) => {
  const isSpanish = language === "es";
  const prices = packages
    .map((proposalPackage) => Number(proposalPackage.price))
    .filter((price) => Number.isFinite(price));
  const minimumPrice = prices.length ? formatPrice(Math.min(...prices)) : null;
  const maximumPrice = prices.length ? formatPrice(Math.max(...prices)) : null;
  const priceRange =
    minimumPrice && maximumPrice
      ? `${minimumPrice}–${maximumPrice} USD`
      : isSpanish
        ? "los precios publicados en esta página"
        : "the prices published on this page";

  const faqItems = isSpanish
    ? [
        [
          "¿Cuánto cuesta una propuesta de matrimonio en Punta Cana?",
          `Los paquetes disponibles actualmente van de ${priceRange}, según la experiencia seleccionada. El precio de cada tarjeta corresponde al paquete publicado y los servicios opcionales solo se agregan cuando los solicitas.`,
        ],
        [
          "¿Qué incluye un paquete de propuesta de matrimonio en Punta Cana?",
          "Cada paquete incluye transporte privado de ida y vuelta desde cualquier hotel o alojamiento de Punta Cana, acceso a nuestra playa privada de Uvero Alto, la decoración seleccionada, una bebida para celebrar, fotografía profesional, tu canción preferida, video de la propuesta grabado con un teléfono y coordinación en el lugar. No existen cargos obligatorios separados por la playa, el fotógrafo o el transporte dentro de Punta Cana.",
        ],
        [
          "¿Cómo reservo mi propuesta con Sertuin Events?",
          "Elige el paquete, la fecha y el alojamiento. Después de confirmar disponibilidad, enviamos un acuerdo de servicio escrito y un enlace seguro de PayPal. Un depósito de US$200 reserva la fecha, se descuenta del total y el saldo se paga después de la experiencia según el acuerdo.",
        ],
        [
          "¿Dónde se realizan las propuestas?",
          "Las propuestas se realizan en nuestra propia playa privada de Uvero Alto, Punta Cana. El acceso está incluido en el precio del paquete y no se cobra una tarifa separada de alquiler o lugar.",
        ],
        [
          "¿El transporte está incluido desde cualquier zona de Punta Cana?",
          "Sí. El precio publicado incluye transporte privado de ida y vuelta desde cualquier hotel o alojamiento de Punta Cana, sin restricciones de zona ni recargos obligatorios de transporte.",
        ],
        [
          "¿Cuántas fotografías recibiremos y cuándo se entregan?",
          "Recibirás más de 70 fotografías profesionales, editadas y en alta resolución dentro de las 48 horas posteriores a la experiencia.",
        ],
        [
          "¿Se graba el momento de la propuesta?",
          "Sí. Grabamos la propuesta con un teléfono sin costo adicional, aunque no agregues videografía profesional.",
        ],
        [
          "¿Podemos elegir la música y personalizar la decoración?",
          "Sí. Coordinamos tu canción preferida y las personalizaciones solicitadas antes de la experiencia. La decoración incluida corresponde al paquete elegido y también puedes solicitar flores personalizadas u otras mejoras opcionales.",
        ],
        [
          "¿Puedo agregar video profesional, dron u otros servicios?",
          "Sí. Según tu visión y disponibilidad, puedes agregar video cinematográfico y dron, músicos en vivo, cena privada, chispas frías y flores personalizadas. Estos servicios opcionales se cotizan por separado.",
        ],
      ]
    : [
        [
          "How much does a marriage proposal in Punta Cana cost?",
          `The packages currently available range from ${priceRange}, depending on the experience selected. Each card shows the published package price, and optional services are added only when requested.`,
        ],
        [
          "What does a Punta Cana proposal package include?",
          "Every package includes private round-trip transportation from any hotel or accommodation in Punta Cana, access to our private beach in Uvero Alto, the selected romantic setup, a celebratory beverage, professional photography, your preferred song, a phone recording of the proposal and an on-site coordinator. There are no separate mandatory charges for the beach, photographer or transportation within Punta Cana.",
        ],
        [
          "How do I reserve my proposal with Sertuin Events?",
          "Choose your package, preferred date and accommodation. After availability is confirmed, we send a written service agreement and a secure PayPal link. A US$200 deposit reserves the date, is deducted from the total and the remaining balance is paid after the experience according to the agreement.",
        ],
        [
          "Where do the proposals take place?",
          "Proposals take place on our own private beach in Uvero Alto, Punta Cana. Beach access is included in the package price, with no separate rental or venue fee.",
        ],
        [
          "Is transportation included from every area of Punta Cana?",
          "Yes. The published price includes private round-trip transportation from any hotel or accommodation throughout Punta Cana, with no zone restrictions or mandatory transportation surcharge.",
        ],
        [
          "How many photographs will we receive and when are they delivered?",
          "You will receive more than 70 professionally edited, high-resolution photographs within 48 hours after the experience.",
        ],
        [
          "Is the proposal moment recorded?",
          "Yes. We record the actual proposal on a phone at no additional cost, even when professional videography is not added.",
        ],
        [
          "Can we choose the music and personalize the setup?",
          "Yes. We coordinate your preferred song and requested personalization before the experience. The setup included is based on the package selected, and custom flowers or other optional enhancements can also be requested.",
        ],
        [
          "Can I add professional video, drone coverage or other services?",
          "Yes. Depending on your vision and availability, you can add cinematic video and drone coverage, live musicians, a private dinner, cold sparks and custom flowers. Optional services are quoted separately.",
        ],
      ];

  return faqItems.map(([title, content]) => ({
    title,
    content: { content },
  }));
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

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mt-12">
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

        <div className="mt-10 text-center">
          <Link
            to={contactPath}
            className="inline-flex no-underline border border-gray-700 rounded-3xl px-7 py-3 font-crimson text-gray-700 hover:bg-black hover:text-white transition-colors duration-300"
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
    {
      icon: MapPinned,
      title: content.mapsTitle,
      description: content.mapsText,
      links: [
        [content.mapsLink, GOOGLE_MAPS_URL],
        [content.reviewLink, GOOGLE_REVIEW_URL],
      ],
    },
    {
      icon: Instagram,
      title: content.instagramTitle,
      description: content.instagramText,
      links: [[content.instagramLink, officialInstagram]],
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 mt-12">
          {cards.map(({ icon, title, description, links }) => (
            <article key={title} className="bg-white p-8 text-center">
              <Icon component={icon} className="mx-auto" />
              <h3 className="font-crimson text-2xl text-gray-900 mt-5">
                {title}
              </h3>
              <p className="font-crimson text-gray-700 leading-relaxed mt-3">
                {description}
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6">
                {links.map(([linkText, url]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-crimson text-gray-700 underline underline-offset-4"
                  >
                    {linkText}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const getProposalCopy = getCopy;
export { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL };
