import React, { useMemo, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  ArrowRight,
  Camera,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Flower2,
  HeartHandshake,
  MapPin,
  Palmtree,
  ShieldCheck,
  ShipWheel,
} from "lucide-react";

import blush from "../../images/elopement/blush.webp";
import blush2 from "../../images/elopement/blush2.webp";
import crescent from "../../images/elopement/crescent.webp";
import crescent2 from "../../images/elopement/crescent2.webp";
import garden from "../../images/elopement/garden.webp";
import garden2 from "../../images/elopement/garden2.webp";
import huppa from "../../images/elopement/huppa.webp";
import huppa2 from "../../images/elopement/huppa2.webp";
import pampas from "../../images/elopement/pampas.webp";
import pampas2 from "../../images/elopement/pampas2.webp";
import red from "../../images/elopement/red.webp";
import red2 from "../../images/elopement/red2.webp";
import sunshine from "../../images/elopement/rr.webp";
import sunshine2 from "../../images/elopement/rr2.webp";
import white from "../../images/elopement/white.webp";
import white2 from "../../images/elopement/white2.webp";

export const LEGAL_UPGRADE_PRICE = 1200;
export const CATAMARAN_EXTRA_GUEST_PRICE = 70;

export const ELOPEMENT_EXPERIENCES = [
  { id: "beach", price: 999 },
  { id: "catamaran", price: 1299 },
];

export const ELOPEMENT_DECORATIONS = [
  {
    id: "white-serenity",
    price: 789,
    images: [white, white2],
    catamaran: true,
  },
  {
    id: "classic-blush",
    price: 849,
    images: [blush, blush2],
    catamaran: true,
  },
  {
    id: "red-romance",
    price: 899,
    images: [red, red2],
    catamaran: true,
  },
  {
    id: "golden-pampas-circle",
    price: 949,
    images: [pampas, pampas2],
    catamaran: true,
  },
  {
    id: "caribbean-sunshine",
    price: 999,
    images: [sunshine, sunshine2],
    catamaran: true,
  },
  {
    id: "tropical-crescent",
    price: 1099,
    images: [crescent, crescent2],
    catamaran: true,
  },
  {
    id: "tropical-garden",
    price: 1199,
    images: [garden, garden2],
    catamaran: true,
  },
  {
    id: "full-tropical-huppa",
    price: 1399,
    images: [huppa, huppa2],
    catamaran: false,
  },
];

const COPY = {
  "en-US": {
    heroTitle: "Punta Cana Elopement Wedding Packages",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Punta Cana Elopement Wedding Packages",
    formula: [
      "Ceremony experience",
      "Optional décor",
      "Optional legal wedding",
    ],
    builderEyebrow: "Packages & prices",
    builderTitle: "Punta Cana Elopement Packages & Prices",
    builderIntro:
      "Choose your setting, optional décor and ceremony type. Your estimated total updates with every selection.",
    stepOne: "1. Choose your setting",
    stepTwo: "2. Choose optional décor",
    stepThree: "3. Choose symbolic or legal",
    selected: "Selected",
    select: "Select",
    from: "Base experience",
    beach: {
      title: "Private Beach Elopement",
      eyebrow: "Up to 2 hours",
      summary:
        "An intimate ceremony on Sertuin Events’ private beach, coordinated from arrival through the final photographs.",
      bullets: [
        "Private beach access",
        "Round-trip transportation for up to 10 people from Punta Cana",
        "Professional photographer",
        "Bouquet and boutonnière",
        "Officiant, coordination and symbolic certificate",
        "70–100 edited photos delivered within 48 hours",
      ],
    },
    catamaran: {
      title: "Private Catamaran Elopement",
      eyebrow: "3 hours aboard · 2–10 people",
      summary:
        "A completely private catamaran experience with capacity for up to 60 people. The published base price covers 2–10 people.",
      bullets: [
        "Completely private catamaran",
        "Round-trip transportation for up to 10 people from Punta Cana",
        "Photography, bouquet, boutonnière and ceremony team",
        "Nachos, fruit, sodas and water",
        "Rum, mamajuana and music",
        "Snorkeling during the three-hour experience",
      ],
    },
    decorNames: {
      "white-serenity": "Ivory Tide",
      "classic-blush": "Blush Horizon",
      "red-romance": "Crimson Vows",
      "golden-pampas-circle": "Golden Coast Halo",
      "caribbean-sunshine": "Sunlit Caribbean",
      "tropical-crescent": "Island Bloom Crescent",
      "tropical-garden": "Botanical Shore",
      "full-tropical-huppa": "Tropical Wedding Canopy",
    },
    decorDescriptions: {
      "white-serenity":
        "Crisp white florals, greenery and soft draping for a timeless seaside ceremony.",
      "classic-blush":
        "Blush, ivory and soft greenery arranged on a classic wooden ceremony arch.",
      "red-romance":
        "A dramatic cascade of rich red roses for a bold, romantic statement.",
      "golden-pampas-circle":
        "A light circular design with pampas texture and warm neutral tones.",
      "caribbean-sunshine":
        "Sunflowers and joyful Caribbean color framing a bright beach aisle.",
      "tropical-crescent":
        "An asymmetric tropical circle with vibrant flowers and sculptural greenery.",
      "tropical-garden":
        "A lush floral landscape that creates an immersive garden beside the sea.",
      "full-tropical-huppa":
        "A full-scale tropical huppa with abundant overhead and aisle florals.",
    },
    realTouch: "Premium Real Touch artificial flowers",
    beachAndCatamaran: "Beach or catamaran",
    beachOnly: "Private beach only",
    noDecor: "Ceremony without décor",
    noDecorDescription:
      "Keep the ceremony simple with the included officiant, photographer, personal flowers, eight guest chairs and ceremony table.",
    unavailableCatamaran:
      "This full wedding canopy cannot be installed on the catamaran.",
    symbolic: "Symbolic ceremony",
    symbolicIncluded: "Included in every base experience",
    symbolicText:
      "Exchange vows and rings with an officiant and receive a symbolic wedding certificate. Ideal for elopements, vow renewals or couples already legally married at home.",
    symbolicChoiceText: "Officiant and symbolic wedding certificate included.",
    legal: "Legal wedding upgrade",
    legalPrice: "+US$1,200",
    legalText:
      "We receive and review your documents, schedule the civil registry appointment, collect the marriage certificate, apostille it and ship the completed certificate.",
    legalCaution:
      "Legal service is confirmed only after your documents have been reviewed and accepted.",
    legalChoiceText:
      "Adds the Dominican civil process after document approval.",
    guestsLabel: "People aboard",
    guestsHelp:
      "2–10 people are covered by the published catamaran price; each additional guest is US$70, up to 60 people.",
    customQuote: "Custom quote required",
    customQuoteText:
      "Each person above 10 adds US$70. The boat has capacity for up to 60 people.",
    estimate: "Your estimated elopement total",
    experienceLine: "Experience",
    decorLine: "Décor",
    legalLine: "Legal wedding",
    additionalGuestsLine: "Additional catamaran guests",
    included: "Included",
    totalNote:
      "Estimate for the selections shown. Availability is verified before any reservation is confirmed.",
    reserveSelection: "Request this combination",
    includedEyebrow: "No guessing",
    includedTitle: "What every Punta Cana elopement includes",
    includedIntro:
      "These essentials are part of the experience price before you add your décor.",
    inclusions: [
      [
        "Transportation for up to 10 people",
        "Private round trip for the couple and up to eight guests from one hotel or accommodation in the Punta Cana area. Additional pickup points are quoted separately.",
      ],
      [
        "Professional photography",
        "70–100 edited, high-resolution images in a digital gallery within 48 hours.",
      ],
      [
        "Dedicated wedding coordination",
        "A coordinator assists you from reservation through planning and is onsite on the wedding day. Your officiant leads the ceremony.",
      ],
      [
        "Personal flowers",
        "A bouquet and boutonnière are included even when you choose a ceremony without décor.",
      ],
      [
        "Symbolic certificate",
        "A keepsake certificate is included with symbolic ceremonies; it is not a civil record.",
      ],
      [
        "Selected setting",
        "Private beach access or three hours aboard your completely private catamaran.",
      ],
    ],
    legalEyebrow: "Choose with confidence",
    legalTitle: "Symbolic vs. legal wedding in Punta Cana",
    legalIntro:
      "The celebration can look the same. The difference is whether the ceremony creates a Dominican civil marriage record.",
    reserveEyebrow: "Reserve your date",
    reserveTitle: "Send your elopement request",
    reserveIntro:
      "Send your preferred date and selections. After availability is confirmed, your dedicated coordinator assists you through the wedding day.",
    form: {
      names: "Couple’s names",
      email: "Email",
      whatsapp: "Phone number or WhatsApp",
      date: "Preferred wedding date",
      guests: "Number of people",
      hotel: "Hotel or accommodation",
      message: "Anything else we should know?",
      send: "Check date availability",
      sending: "Sending request…",
      error:
        "We could not send the request. Please try again or contact us through WhatsApp.",
      successTitle: "Request received",
      success:
        "Your request was emailed to Sertuin Events. A coordinator will contact you after reviewing availability. Your date is reserved only after the agreement and US$200 payment are completed.",
      notice: "Sending this form does not reserve or confirm the date.",
    },
    paymentTitle: "How reservation and payment work",
    paymentSteps: [
      [
        "Send your request",
        "Choose the experience, décor, ceremony type and preferred date.",
      ],
      [
        "We verify availability",
        "Sertuin confirms the date and assigns your coordinator. Legal weddings also require document review.",
      ],
      [
        "Reserve with US$200",
        "Complete the agreement and pay the non-refundable deposit through PayPal. It is credited to your total.",
      ],
      [
        "Pay the balance after the experience",
        "The remaining balance is normally paid in cash when leaving the private beach or catamaran, according to the agreement.",
      ],
    ],
    depositNotice:
      "The US$200 reservation deposit is normally non-refundable. If weather makes the elopement impossible during the stay after every reasonable alternative is exhausted, the deposit is returned. Weather changes may be rescheduled up to twice.",
    realEyebrow: "Created by Sertuin Events",
    realTitle: "Real Punta Cana elopement décor",
    realIntro:
      "Each gallery shows one actual design so you can understand the style you are selecting.",
    faqEyebrow: "Helpful details",
    faqTitle: "Punta Cana elopement FAQ",
    faqIntro: "Open only the questions that matter to your plans.",
  },
  es: {
    heroTitle: "Paquetes de Elopement en Punta Cana",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Paquetes de Elopement en Punta Cana",
    formula: [
      "Experiencia de ceremonia",
      "Decoración opcional",
      "Boda legal opcional",
    ],
    builderEyebrow: "Paquetes y precios",
    builderTitle: "Paquetes y precios de elopement en Punta Cana",
    builderIntro:
      "Elige la locación, la decoración opcional y el tipo de ceremonia. El total estimado se actualiza con cada selección.",
    stepOne: "1. Elige la locación",
    stepTwo: "2. Elige decoración opcional",
    stepThree: "3. Elige ceremonia simbólica o legal",
    selected: "Seleccionado",
    select: "Elegir",
    from: "Experiencia base",
    beach: {
      title: "Elopement en Playa Privada",
      eyebrow: "Hasta 2 horas",
      summary:
        "Una ceremonia íntima en la playa privada de Sertuin Events, coordinada desde la llegada hasta las fotografías finales.",
      bullets: [
        "Acceso a playa privada",
        "Transporte ida y vuelta para hasta 10 personas desde Punta Cana",
        "Fotógrafo profesional",
        "Bouquet y boutonnière",
        "Oficiante, coordinación y certificado simbólico",
        "70–100 fotos editadas entregadas en 48 horas",
      ],
    },
    catamaran: {
      title: "Elopement en Catamarán Privado",
      eyebrow: "3 horas a bordo · 2–10 personas",
      summary:
        "Una experiencia en catamarán completamente privado con capacidad máxima para 60 personas. El precio base publicado cubre de 2 a 10 personas.",
      bullets: [
        "Catamarán completamente privado",
        "Transporte ida y vuelta para hasta 10 personas desde Punta Cana",
        "Fotografía, bouquet, boutonnière y equipo de ceremonia",
        "Nachos, frutas, sodas y agua",
        "Ron, mamajuana y música",
        "Snorkel durante las tres horas de experiencia",
      ],
    },
    decorNames: {
      "white-serenity": "Marea Marfil",
      "classic-blush": "Horizonte Blush",
      "red-romance": "Votos Carmesí",
      "golden-pampas-circle": "Halo de Costa Dorada",
      "caribbean-sunshine": "Caribe Luminoso",
      "tropical-crescent": "Media Luna Isleña",
      "tropical-garden": "Orilla Botánica",
      "full-tropical-huppa": "Dosel Nupcial Tropical",
    },
    decorDescriptions: {
      "white-serenity":
        "Flores blancas, follaje y telas suaves para una ceremonia atemporal frente al mar.",
      "classic-blush":
        "Tonos blush, marfil y follaje suave sobre un arco de madera clásico.",
      "red-romance":
        "Una cascada intensa de rosas rojas para un diseño romántico y llamativo.",
      "golden-pampas-circle":
        "Un diseño circular ligero con textura de pampas y tonos cálidos neutros.",
      "caribbean-sunshine":
        "Girasoles y color caribeño enmarcando un pasillo alegre frente al mar.",
      "tropical-crescent":
        "Un círculo tropical asimétrico con flores vibrantes y follaje escultórico.",
      "tropical-garden":
        "Un paisaje floral abundante que crea un jardín inmersivo junto al mar.",
      "full-tropical-huppa":
        "Una huppa tropical de gran formato con flores abundantes en la parte superior y el pasillo.",
    },
    realTouch: "Flores artificiales premium Real Touch",
    beachAndCatamaran: "Playa o catamarán",
    beachOnly: "Solo playa privada",
    noDecor: "Ceremonia sin decoración",
    noDecorDescription:
      "Mantén una ceremonia sencilla con oficiante, fotógrafo, flores personales, ocho sillas para invitados y mesa de ceremonia incluidos.",
    unavailableCatamaran:
      "Este dosel nupcial completo no puede instalarse en el catamarán.",
    symbolic: "Ceremonia simbólica",
    symbolicIncluded: "Incluida en todas las experiencias base",
    symbolicText:
      "Intercambien votos y anillos con un oficiante y reciban un certificado simbólico. Ideal para elopements, renovaciones de votos o parejas ya casadas legalmente en su país.",
    symbolicChoiceText: "Oficiante y certificado de boda simbólica incluidos.",
    legal: "Upgrade de boda legal",
    legalPrice: "+US$1,200",
    legalText:
      "Recibimos y revisamos sus documentos, agendamos la cita en la oficialía, recogemos el certificado de matrimonio, lo apostillamos y enviamos.",
    legalCaution:
      "El servicio legal se confirma únicamente después de revisar y aceptar la documentación.",
    legalChoiceText:
      "Agrega el proceso civil dominicano después de aprobar los documentos.",
    guestsLabel: "Personas a bordo",
    guestsHelp:
      "De 2 a 10 personas están cubiertas por el precio publicado del catamarán; cada invitado adicional cuesta US$70, hasta 60 personas.",
    customQuote: "Requiere cotización personalizada",
    customQuoteText:
      "Cada persona después de las primeras 10 agrega US$70. La embarcación tiene capacidad máxima para 60 personas.",
    estimate: "Total estimado de tu elopement",
    experienceLine: "Experiencia",
    decorLine: "Decoración",
    legalLine: "Boda legal",
    additionalGuestsLine: "Invitados adicionales en catamarán",
    included: "Incluido",
    totalNote:
      "Estimado para las selecciones mostradas. Verificamos disponibilidad antes de confirmar cualquier reserva.",
    reserveSelection: "Solicitar esta combinación",
    includedEyebrow: "Sin adivinar",
    includedTitle: "Qué incluye cada elopement en Punta Cana",
    includedIntro:
      "Estos elementos forman parte de la experiencia antes de agregar la decoración.",
    inclusions: [
      [
        "Transporte para hasta 10 personas",
        "Traslado privado ida y vuelta para la pareja y hasta ocho invitados desde un hotel o alojamiento de Punta Cana. Los puntos de recogida adicionales se cotizan por separado.",
      ],
      [
        "Fotografía profesional",
        "70–100 imágenes editadas en alta resolución, entregadas en una galería digital en 48 horas.",
      ],
      [
        "Coordinación dedicada de la boda",
        "Una coordinadora te asiste desde la reserva, acompaña la planificación y está onsite el día de la boda. El oficiante dirige la ceremonia.",
      ],
      [
        "Flores personales",
        "Bouquet y boutonnière incluidos aunque elijan una ceremonia sin decoración.",
      ],
      [
        "Certificado simbólico",
        "Un certificado de recuerdo está incluido; no es un documento de registro civil.",
      ],
      [
        "Locación elegida",
        "Acceso a playa privada o tres horas a bordo de un catamarán completamente privado.",
      ],
    ],
    legalEyebrow: "Elige con confianza",
    legalTitle: "Boda simbólica vs. boda legal en Punta Cana",
    legalIntro:
      "La celebración puede verse igual. La diferencia es si la ceremonia genera un registro civil dominicano.",
    reserveEyebrow: "Reserva tu fecha",
    reserveTitle: "Envía tu solicitud de elopement",
    reserveIntro:
      "Envíanos la fecha y tus selecciones. Después de confirmar disponibilidad, tu coordinadora dedicada te asiste hasta el día de la boda.",
    form: {
      names: "Nombres de la pareja",
      email: "Correo electrónico",
      whatsapp: "Número de teléfono o WhatsApp",
      date: "Fecha preferida de la boda",
      guests: "Cantidad de personas",
      hotel: "Hotel o alojamiento",
      message: "¿Hay algo más que debamos saber?",
      send: "Consultar disponibilidad",
      sending: "Enviando solicitud…",
      error:
        "No pudimos enviar la solicitud. Inténtalo nuevamente o contáctanos por WhatsApp.",
      successTitle: "Solicitud recibida",
      success:
        "Tu solicitud fue enviada por correo a Sertuin Events. Una coordinadora te contactará después de revisar disponibilidad. La fecha se reserva al completar el contrato y el pago de US$200.",
      notice: "Enviar este formulario no reserva ni confirma la fecha.",
    },
    paymentTitle: "Cómo funcionan la reserva y el pago",
    paymentSteps: [
      [
        "Envía tu solicitud",
        "Elige experiencia, decoración, tipo de ceremonia y fecha preferida.",
      ],
      [
        "Verificamos disponibilidad",
        "Sertuin confirma la fecha y asigna tu coordinadora. Las bodas legales también requieren revisión de documentos.",
      ],
      [
        "Reserva con US$200",
        "Completa el contrato y paga por PayPal el depósito no reembolsable. Se acredita al total.",
      ],
      [
        "Paga el balance al finalizar",
        "El restante normalmente se paga en efectivo al salir de la playa privada o del catamarán, según el contrato.",
      ],
    ],
    depositNotice:
      "El pago de reserva de US$200 normalmente no es reembolsable. Si el clima impide realizar el elopement durante la estadía después de agotar las alternativas razonables, se devuelve. Los cambios por clima pueden reprogramarse hasta dos veces.",
    realEyebrow: "Creado por Sertuin Events",
    realTitle: "Decoraciones reales de elopement en Punta Cana",
    realIntro:
      "Cada galería muestra un montaje real para que puedas entender el estilo que estás eligiendo.",
    faqEyebrow: "Detalles útiles",
    faqTitle: "Preguntas frecuentes sobre elopements en Punta Cana",
    faqIntro: "Abre únicamente las preguntas que importan para tus planes.",
  },
};

export const getElopementCopy = (language = "en-US") =>
  COPY[language === "es" ? "es" : "en-US"];

const mergeManagedCopy = (base, override) => {
  if (!override || typeof override !== "object" || Array.isArray(override)) {
    return base;
  }

  return Object.entries(override).reduce(
    (result, [key, value]) => {
      result[key] =
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        base?.[key] &&
        typeof base[key] === "object" &&
        !Array.isArray(base[key])
          ? mergeManagedCopy(base[key], value)
          : value;
      return result;
    },
    { ...base },
  );
};

const parseManagedCopy = (raw) => {
  if (!raw) return null;

  try {
    const document = JSON.parse(raw);
    const readText = (node) => {
      if (typeof node?.value === "string") return node.value;
      return (node?.content || []).map(readText).join(" ");
    };
    const text = readText(document).trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    return start >= 0 && end > start
      ? JSON.parse(text.slice(start, end + 1))
      : null;
  } catch {
    return null;
  }
};

export const getManagedElopementCopy = (
  language = "en-US",
  page,
  packages = [],
) => {
  const base = mergeManagedCopy(
    getElopementCopy(language),
    parseManagedCopy(page?.paragraph3?.raw),
  );
  const isSpanish = language === "es";
  const beachPackage = packages.find((item) =>
    /private beach|beach ceremony|playa privada|ceremonia.*playa/i.test(
      item?.title || "",
    ),
  );
  const catamaranPackage = packages.find((item) =>
    /catamaran|catamar[aá]n/i.test(item?.title || ""),
  );
  const withPageFields = {
    ...base,
    heroTitle: page?.heroHeading?.trim() || base.heroTitle,
    heroIntro: page?.heroHeading2?.trim() || base.heroIntro,
    builderTitle: page?.sectionTitle?.trim() || base.builderTitle,
    includedTitle: page?.sectionTitle2?.trim() || base.includedTitle,
    reserveEyebrow: page?.contactEyebrow?.trim() || base.reserveEyebrow,
    reserveTitle: page?.contactHeading?.trim() || base.reserveTitle,
    reserveIntro: page?.contactBody?.trim() || base.reserveIntro,
  };

  return {
    ...withPageFields,
    beach: beachPackage
      ? {
          ...withPageFields.beach,
          title: beachPackage.title,
          summary: beachPackage.paragraph || withPageFields.beach.summary,
          includes:
            beachPackage.included?.length > 0
              ? beachPackage.included
              : withPageFields.beach.includes,
        }
      : withPageFields.beach,
    catamaran: catamaranPackage
      ? {
          ...withPageFields.catamaran,
          title: catamaranPackage.title,
          summary:
            catamaranPackage.paragraph || withPageFields.catamaran.summary,
          includes:
            catamaranPackage.included?.length > 0
              ? catamaranPackage.included
              : withPageFields.catamaran.includes,
        }
      : withPageFields.catamaran,
    managedLabel: isSpanish ? "Contenido administrado" : "Managed content",
  };
};

export const buildElopementFaqs = (language = "en-US") => {
  const es = language === "es";

  return es
    ? [
        [
          "¿Cuánto cuesta un elopement en Punta Cana?",
          "La experiencia base en playa privada cuesta US$999 y el catamarán privado US$1,299. La decoración es opcional; los diseños publicados cuestan entre US$789 y US$1,399. La boda legal es opcional por US$1,200 adicionales.",
        ],
        [
          "¿Qué incluye el precio base?",
          "Incluye transporte ida y vuelta para hasta 10 personas desde un mismo alojamiento en Punta Cana, fotógrafo profesional, bouquet, boutonnière, oficiante, coordinadora, ocho sillas para invitados y mesa de ceremonia. Sin decoración no incluye pasillo, estructuras ni sonido. El catamarán incluye tres horas, snacks, bebidas, música y snorkel.",
        ],
        [
          "¿Tendremos coordinadora para nuestra boda?",
          "Sí. Todas las bodas incluyen una coordinadora dedicada que les asiste desde la reserva, acompaña la planificación y está onsite el día de la boda.",
        ],
        [
          "¿Cuántas fotos recibiremos y cuándo?",
          "Recibirán entre 70 y 100 fotografías editadas en alta resolución dentro de una galería digital, entregada en 48 horas.",
        ],
        [
          "¿El catamarán es privado?",
          "Sí. El catamarán es completamente privado y tiene capacidad máxima para 60 personas. El precio publicado cubre una experiencia de 2 a 10 personas.",
        ],
        [
          "¿Qué sucede si somos más de 10 personas en el catamarán?",
          "Cada persona adicional después de las primeras 10 cuesta US$70. La embarcación admite hasta 60 personas.",
        ],
        [
          "¿Qué snacks y bebidas incluye el catamarán?",
          "Incluye nachos, frutas, sodas, agua, ron y mamajuana, además de música y snorkel durante las tres horas a bordo.",
        ],
        [
          "¿Todas las decoraciones sirven para el catamarán?",
          "Todas las decoraciones mostradas pueden adaptarse al catamarán excepto el Dosel Nupcial Tropical, que se ofrece únicamente en la playa privada.",
        ],
        [
          "¿Las flores son naturales?",
          "Las decoraciones se crean con flores artificiales premium Real Touch. Esto permite mantener el estilo, el color y la presentación del montaje frente al viento y al clima tropical.",
        ],
        [
          "¿Qué diferencia hay entre boda simbólica y legal?",
          "La ceremonia simbólica incluye votos, anillos, oficiante y un certificado de recuerdo, pero no crea un registro civil. La boda legal sí completa el proceso civil dominicano y requiere revisión previa de documentos.",
        ],
        [
          "¿Qué cubre el upgrade legal de US$1,200?",
          "Incluye recepción y revisión de documentos, programación de la cita en la oficialía, recogida del certificado de matrimonio, apostilla y envío del certificado. El servicio se confirma después de aprobar la documentación.",
        ],
        [
          "¿Podemos usar el paquete para renovar votos?",
          "Sí. Una pareja ya casada puede celebrar la experiencia como renovación de votos con ceremonia simbólica, decoración, fotografías y todos los elementos incluidos.",
        ],
        [
          "¿Qué sucede si llueve?",
          "Podemos cambiar la hora, mover la ceremonia a una locación techada o reprogramar hasta dos veces. Si el clima impide realizarla durante toda la estadía después de agotar las alternativas razonables, devolvemos el depósito. En el catamarán, el capitán toma la decisión final de navegación y seguridad.",
        ],
        [
          "¿Cómo se reserva y enviar el formulario confirma la fecha?",
          "El formulario solamente envía una solicitud. Cuando Sertuin confirme disponibilidad y se complete el contrato, se pagan US$200 por PayPal para reservar. El depósito se acredita al total y normalmente no es reembolsable, excepto cuando el clima imposibilita realizar el servicio durante la estadía. El balance se paga normalmente al finalizar la experiencia.",
        ],
      ]
    : [
        [
          "How much does a Punta Cana elopement cost?",
          "The private beach base experience is US$999 and the private catamaran is US$1,299. Décor is optional; the published designs cost US$789–US$1,399. A legal wedding is optional for an additional US$1,200.",
        ],
        [
          "What is included in the base price?",
          "It includes private round-trip transportation for up to 10 people from one Punta Cana accommodation, a professional photographer, bouquet, boutonnière, officiant, coordinator, eight guest chairs and a ceremony table. Without décor, no aisle, structures or sound are included. The catamaran includes three hours, snacks, drinks, music and snorkeling.",
        ],
        [
          "Will we have a wedding coordinator?",
          "Yes. Every wedding includes a dedicated coordinator who assists you from reservation through planning and is onsite on the wedding day.",
        ],
        [
          "How many photos will we receive, and when?",
          "You will receive 70–100 edited, high-resolution photographs in a digital gallery within 48 hours.",
        ],
        [
          "Is the catamaran private?",
          "Yes. The catamaran is completely private and holds up to 60 people. The published price covers an experience for 2–10 people.",
        ],
        [
          "What if more than 10 people join the catamaran?",
          "Each person after the first 10 costs US$70. The boat holds up to 60 people.",
        ],
        [
          "Which catamaran snacks and drinks are included?",
          "Nachos, fruit, sodas, water, rum and mamajuana are included, together with music and snorkeling during the three hours aboard.",
        ],
        [
          "Can every décor be installed on the catamaran?",
          "Every design shown can be adapted to the catamaran except the Tropical Wedding Canopy, which is available only on the private beach.",
        ],
        [
          "Are the flowers fresh?",
          "The décor is created with premium artificial Real Touch flowers. This helps preserve the intended style, color and presentation in wind and tropical weather.",
        ],
        [
          "What is the difference between a symbolic and legal wedding?",
          "A symbolic ceremony includes vows, rings, an officiant and a keepsake certificate, but it does not create a civil record. A legal wedding completes the Dominican civil process and requires prior document review.",
        ],
        [
          "What does the US$1,200 legal upgrade cover?",
          "It covers receiving and reviewing documents, scheduling the civil registry appointment, collecting the marriage certificate, apostilling it and shipping the certificate. The service is confirmed after the documentation is accepted.",
        ],
        [
          "Can we use the package for a vow renewal?",
          "Yes. A couple already legally married can use the experience as a vow renewal with a symbolic ceremony, décor, photography and all included elements.",
        ],
        [
          "What happens if it rains?",
          "We can change the time, move the ceremony to a covered location or reschedule up to twice. If weather prevents the service throughout the stay after reasonable alternatives are exhausted, we return the deposit. For the catamaran, the captain makes the final navigation and safety decision.",
        ],
        [
          "How do we reserve, and does submitting the form confirm the date?",
          "The form only sends a request. Once Sertuin confirms availability and the agreement is completed, pay US$200 through PayPal to reserve. The deposit is credited to the total and is normally non-refundable, except when weather makes the service impossible during the stay. The balance is normally paid at the end of the experience.",
        ],
      ];
};

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const scrollToSection = (event, id) => {
  event.preventDefault();

  if (typeof document === "undefined") return;

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${id}`);
  }
};

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "center",
  dark = false,
}) => (
  <div
    className={`mx-auto max-w-3xl ${align === "left" ? "text-left" : "text-center"}`}
  >
    <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
      {eyebrow}
    </p>
    <h2
      className={`mt-3 font-crimson text-4xl font-normal leading-tight md:text-5xl ${
        dark ? "text-white" : "text-stone-900"
      }`}
    >
      {title}
    </h2>
    {intro && (
      <p
        className={`mt-5 font-montserrat text-base leading-7 md:text-lg ${
          dark ? "text-stone-300" : "text-stone-600"
        }`}
      >
        {intro}
      </p>
    )}
  </div>
);

const ExperienceCard = ({ experience, copy, active, onSelect }) => {
  const Icon = experience.id === "beach" ? Palmtree : ShipWheel;
  const details = copy[experience.id];

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group w-full rounded-3xl border p-6 text-left transition md:p-8 ${
        active
          ? "border-amber-500 bg-amber-50 shadow-[0_18px_45px_rgba(120,89,20,0.12)]"
          : "border-stone-200 bg-white hover:border-amber-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-white p-3 text-amber-700 shadow-sm">
          <Icon size={24} strokeWidth={1.6} />
        </span>
        <span
          className={`rounded-full px-3 py-1 font-montserrat text-xs font-semibold uppercase tracking-wider ${
            active ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-600"
          }`}
        >
          {active ? copy.selected : copy.select}
        </span>
      </div>
      <p className="mt-5 font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        {details.eyebrow}
      </p>
      <h3 className="mt-2 font-crimson text-3xl text-stone-900">
        {details.title}
      </h3>
      <p className="mt-2 font-montserrat text-sm leading-6 text-stone-600">
        {details.summary}
      </p>
      <div className="mt-5 flex items-end justify-between border-t border-stone-200 pt-5">
        <span className="font-montserrat text-xs uppercase tracking-wider text-stone-500">
          {copy.from}
        </span>
        <span className="font-crimson text-3xl text-stone-900">
          {money(experience.price)}
        </span>
      </div>
    </button>
  );
};

const DecorCard = ({ decoration, copy, active, disabled, onSelect }) => {
  const [photo, setPhoto] = useState(0);
  const name = copy.decorNames[decoration.id];

  const changePhoto = (direction) => {
    setPhoto(
      (current) =>
        (current + direction + decoration.images.length) %
        decoration.images.length,
    );
  };

  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-white transition ${
        active
          ? "border-amber-500 shadow-[0_18px_45px_rgba(120,89,20,0.13)]"
          : "border-stone-200"
      } ${disabled ? "opacity-55" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={decoration.images[photo]}
          alt={`${name} Punta Cana elopement décor by Sertuin Events`}
          loading="lazy"
          width="1600"
          height="1200"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <button
            type="button"
            onClick={() => changePhoto(-1)}
            aria-label={`Previous ${name} photo`}
            className="pointer-events-auto rounded-full bg-white/90 p-2 text-stone-800 shadow backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="rounded-full bg-stone-950/70 px-3 py-1 font-montserrat text-xs text-white backdrop-blur">
            {photo + 1} / {decoration.images.length}
          </span>
          <button
            type="button"
            onClick={() => changePhoto(1)}
            aria-label={`Next ${name} photo`}
            className="pointer-events-auto rounded-full bg-white/90 p-2 text-stone-800 shadow backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-crimson text-2xl leading-tight text-stone-900">
            {name}
          </h3>
          <span className="whitespace-nowrap font-crimson text-2xl text-amber-700">
            +{money(decoration.price)}
          </span>
        </div>
        <p className="mt-3 min-h-[4.5rem] font-montserrat text-sm leading-6 text-stone-600">
          {copy.decorDescriptions[decoration.id]}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 font-montserrat text-xs text-stone-600">
          <span className="rounded-full bg-stone-100 px-3 py-1.5">
            {copy.realTouch}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1.5">
            {decoration.catamaran ? copy.beachAndCatamaran : copy.beachOnly}
          </span>
        </div>
        {disabled && (
          <p className="mt-3 font-montserrat text-xs font-semibold text-rose-700">
            {copy.unavailableCatamaran}
          </p>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onSelect}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-montserrat text-sm font-semibold transition ${
            active
              ? "bg-amber-500 text-white"
              : "border border-stone-300 text-stone-800 hover:border-amber-500"
          } disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400`}
        >
          {active ? <Check size={17} /> : null}
          {active ? copy.selected : copy.select}
        </button>
      </div>
    </article>
  );
};

const Summary = ({ copy, experience, decoration, legal, guestCount }) => {
  const additionalGuestTotal =
    experience.id === "catamaran"
      ? Math.max(0, guestCount - 10) * CATAMARAN_EXTRA_GUEST_PRICE
      : 0;
  const total =
    experience.price +
    (decoration?.price || 0) +
    (legal ? LEGAL_UPGRADE_PRICE : 0) +
    additionalGuestTotal;

  return (
    <aside className="rounded-3xl bg-stone-950 p-6 text-white shadow-2xl md:p-8 lg:sticky lg:top-6">
      <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
        {copy.estimate}
      </p>
      <div className="mt-6 space-y-4 font-montserrat text-sm">
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{copy.experienceLine}</span>
          <span className="text-right">
            {copy[experience.id].title}
            <strong className="block text-base">
              {money(experience.price)}
            </strong>
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{copy.decorLine}</span>
          <span className="text-right">
            {decoration ? copy.decorNames[decoration.id] : copy.noDecor}
            <strong className="block text-base">
              {decoration ? money(decoration.price) : copy.included}
            </strong>
          </span>
        </div>
        {additionalGuestTotal > 0 && (
          <div className="flex items-start justify-between gap-4">
            <span className="text-stone-300">{copy.additionalGuestsLine}</span>
            <strong>{money(additionalGuestTotal)}</strong>
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{copy.legalLine}</span>
          <strong>{legal ? money(LEGAL_UPGRADE_PRICE) : copy.included}</strong>
        </div>
      </div>
      <div className="mt-6 border-t border-white/20 pt-6">
        <p className="font-crimson text-5xl text-amber-300">{money(total)}</p>
        <p className="mt-3 font-montserrat text-xs leading-5 text-stone-400">
          {copy.totalNote}
        </p>
      </div>
      <a
        href="#reserve"
        onClick={(event) => scrollToSection(event, "reserve")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3.5 font-montserrat text-sm font-bold text-white transition hover:bg-amber-600"
      >
        {copy.reserveSelection}
        <ArrowRight size={17} />
      </a>
    </aside>
  );
};

const ElopementForm = ({
  copy,
  experience,
  decoration,
  legal,
  guestCount,
  setGuestCount,
  language,
}) => {
  const additionalGuestTotal =
    experience.id === "catamaran"
      ? Math.max(0, guestCount - 10) * CATAMARAN_EXTRA_GUEST_PRICE
      : 0;
  const total =
    experience.price +
    (decoration?.price || 0) +
    (legal ? LEGAL_UPGRADE_PRICE : 0) +
    additionalGuestTotal;

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-montserrat text-sm text-stone-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      name="contact"
      method="POST"
      action={
        language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/"
      }
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(74,56,18,0.09)] md:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input
        type="hidden"
        name="source"
        value="Punta Cana Elopement Packages page"
      />
      <input
        type="hidden"
        name="subject"
        value="New Punta Cana elopement request"
      />
      <input type="hidden" name="language" value={language} />
      <input
        type="hidden"
        name="experience"
        value={copy[experience.id].title}
      />
      <input
        type="hidden"
        name="decoration"
        value={decoration ? copy.decorNames[decoration.id] : copy.noDecor}
      />
      <input
        type="hidden"
        name="ceremony"
        value={legal ? copy.legal : copy.symbolic}
      />
      <input type="hidden" name="estimated-total" value={money(total)} />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="mb-7 rounded-2xl bg-amber-50 p-5">
        <p className="font-montserrat text-xs font-semibold uppercase tracking-wider text-amber-800">
          {copy.selected}
        </p>
        <p className="mt-2 font-crimson text-2xl text-stone-900">
          {copy[experience.id].title} +{" "}
          {decoration ? copy.decorNames[decoration.id] : copy.noDecor}
        </p>
        <p className="mt-1 font-montserrat text-sm text-stone-600">
          {money(total)} · {legal ? copy.legal : copy.symbolic}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {copy.form.names}
          <input
            className={inputClass}
            type="text"
            name="couple-names"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {copy.form.email}
          <input className={inputClass} type="email" name="email" required />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {copy.form.whatsapp}
          <input className={inputClass} type="tel" name="whatsapp" required />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {copy.form.date}
          <input className={inputClass} type="date" name="date" required />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {copy.form.guests}
          <input
            className={inputClass}
            type="number"
            name="guests"
            min="2"
            max={experience.id === "catamaran" ? "60" : undefined}
            value={guestCount}
            onChange={(event) =>
              setGuestCount(
                Math.max(
                  2,
                  Math.min(
                    experience.id === "catamaran" ? 60 : 999,
                    Number(event.target.value) || 2,
                  ),
                ),
              )
            }
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {copy.form.hotel}
          <input className={inputClass} type="text" name="hotel" required />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {copy.form.message}
          <textarea className={inputClass} name="message" rows="4" />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-4 font-montserrat text-sm font-bold text-white transition hover:bg-amber-600"
      >
        {copy.form.send}
        <ArrowRight size={18} />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-stone-500">
        {copy.form.notice}
      </p>
    </form>
  );
};

const ICONS = [CarFront, Camera, HeartHandshake, Flower2, FileCheck2, MapPin];

const ElopementExperience = ({
  language = "en-US",
  page,
  packages = [],
  galleries = [],
  faqs: managedFaqs = [],
}) => {
  const copy = getManagedElopementCopy(language, page, packages);
  const [experienceId, setExperienceId] = useState("beach");
  const [decorationId, setDecorationId] = useState(null);
  const [legal, setLegal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const fallbackFaqs = buildElopementFaqs(language);
  const faqs = useMemo(() => {
    const normalized = managedFaqs
      .map((item) => [item?.title?.trim(), item?.content?.content?.trim()])
      .filter(([question, answer]) => question && answer);
    const managedFaqsAreCurrent =
      normalized.length >= 3 &&
      normalized.every(
        ([question, answer]) =>
          !/transport(?:ation)? for two|transporte (?:ida y vuelta )?para dos|non-refundable under all|no se reembolsa bajo ninguna|before boarding|antes de abordar|on arrival|al llegar/i.test(
            `${question} ${answer}`,
          ),
      );
    return managedFaqsAreCurrent ? normalized : fallbackFaqs;
  }, [fallbackFaqs, managedFaqs]);
  const experiences = useMemo(
    () =>
      ELOPEMENT_EXPERIENCES.map((experience) => {
        const matcher =
          experience.id === "beach"
            ? /private beach|beach ceremony|playa privada|ceremonia.*playa/i
            : /catamaran|catamar[aá]n/i;
        const managed = packages.find((item) =>
          matcher.test(item?.title || ""),
        );
        return managed && Number.isFinite(Number(managed.price))
          ? { ...experience, price: Number(managed.price) }
          : experience;
      }),
    [packages],
  );
  const heroImage = getImage(page?.heroImageList?.[0]?.gatsbyImage);
  const galleryImages = useMemo(
    () => galleries.flatMap((gallery) => gallery?.images || []).slice(0, 8),
    [galleries],
  );

  const experience = useMemo(
    () => experiences.find((item) => item.id === experienceId),
    [experienceId, experiences],
  );
  const decoration = useMemo(
    () =>
      decorationId
        ? ELOPEMENT_DECORATIONS.find((item) => item.id === decorationId)
        : null,
    [decorationId],
  );

  const selectExperience = (id) => {
    setExperienceId(id);
    if (id === "catamaran") {
      setGuestCount((current) => Math.min(current, 60));
    }
    if (id === "catamaran" && decoration && !decoration.catamaran) {
      setDecorationId("white-serenity");
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="absolute left-0 top-0 h-screen w-full bg-stone-900">
        {heroImage ? (
          <GatsbyImage
            image={heroImage}
            alt="Tropical wedding canopy for a private beach elopement in Punta Cana"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full"
            imgStyle={{ objectFit: "cover", objectPosition: "center" }}
          />
        ) : (
          <img
            src={huppa}
            alt="Tropical wedding canopy for a private beach elopement in Punta Cana"
            loading="eager"
            fetchPriority="high"
            width="1600"
            height="1067"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end justify-center px-5 pb-[14vh] text-center md:px-10 md:pb-[16vh]">
          <div>
            <h1 className="max-w-5xl font-crimson text-5xl font-normal leading-[1.02] text-white md:text-7xl lg:text-8xl">
              {copy.heroTitle}
            </h1>
            {copy.heroIntro && (
              <p className="mx-auto mt-5 max-w-3xl font-montserrat text-base leading-7 text-stone-100 md:text-xl">
                {copy.heroIntro}
              </p>
            )}
          </div>
        </div>
      </section>
      <div className="h-[90vh]" aria-hidden="true" />

      <section
        id="builder"
        className="scroll-mt-6 bg-stone-50 px-5 py-20 md:px-10 md:py-24"
      >
        <SectionHeading
          eyebrow={copy.builderEyebrow}
          title={copy.builderTitle}
          intro={copy.builderIntro}
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {copy.formula.map((item, index) => (
            <React.Fragment key={item}>
              <div className="rounded-2xl border border-stone-200 bg-white px-5 py-5 text-center font-montserrat text-sm font-semibold text-stone-800">
                {item}
              </div>
              {index < copy.formula.length - 1 && (
                <span className="text-center font-crimson text-3xl text-amber-600">
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <h2 className="font-crimson text-3xl text-stone-900">
            {copy.stepOne}
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {experiences.map((item) => (
              <ExperienceCard
                key={item.id}
                experience={item}
                copy={copy}
                active={experienceId === item.id}
                onSelect={() => selectExperience(item.id)}
              />
            ))}
          </div>
        </div>

        {experienceId === "catamaran" && (
          <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-sky-200 bg-sky-50 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <label
                htmlFor="catamaran-guests"
                className="font-montserrat text-sm font-bold text-stone-900"
              >
                {copy.guestsLabel}
              </label>
              <p className="mt-1 font-montserrat text-sm text-stone-600">
                {copy.guestsHelp}
              </p>
            </div>
            <input
              id="catamaran-guests"
              type="number"
              min="2"
              max="60"
              value={guestCount}
              onChange={(event) =>
                setGuestCount(
                  Math.max(2, Math.min(60, Number(event.target.value) || 2)),
                )
              }
              className="mt-4 w-28 rounded-xl border border-sky-300 bg-white px-4 py-3 font-montserrat text-lg font-bold outline-none focus:border-amber-500 md:mt-0"
            />
          </div>
        )}

        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="font-crimson text-3xl text-stone-900">
            {copy.stepTwo}
          </h2>
          <button
            type="button"
            onClick={() => setDecorationId(null)}
            className={`mt-6 w-full rounded-3xl border p-6 text-left transition ${
              decorationId === null
                ? "border-amber-500 bg-amber-50"
                : "border-stone-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-crimson text-3xl text-stone-900">
                  {copy.noDecor}
                </h3>
                <p className="mt-3 max-w-3xl font-montserrat text-sm leading-6 text-stone-600">
                  {copy.noDecorDescription}
                </p>
              </div>
              {decorationId === null && (
                <span className="rounded-full bg-amber-500 px-3 py-1 font-montserrat text-xs font-bold text-white">
                  {copy.selected}
                </span>
              )}
            </div>
          </button>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ELOPEMENT_DECORATIONS.map((item) => (
              <DecorCard
                key={item.id}
                decoration={item}
                copy={copy}
                active={decorationId === item.id}
                disabled={experienceId === "catamaran" && !item.catamaran}
                onSelect={() => setDecorationId(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div>
            <h2 className="font-crimson text-3xl text-stone-900">
              {copy.stepThree}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setLegal(false)}
                className={`rounded-3xl border p-6 text-left transition ${
                  !legal
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <HeartHandshake
                    className="text-amber-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                  {!legal && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 font-montserrat text-xs font-bold text-white">
                      {copy.selected}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-crimson text-3xl text-stone-900">
                  {copy.symbolic}
                </h3>
                <p className="mt-1 font-montserrat text-xs font-bold uppercase tracking-wider text-amber-700">
                  {copy.symbolicIncluded}
                </p>
                <p className="mt-4 font-montserrat text-sm leading-6 text-stone-600">
                  {copy.symbolicChoiceText}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setLegal(true)}
                className={`rounded-3xl border p-6 text-left transition ${
                  legal
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <FileCheck2
                    className="text-amber-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                  {legal && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 font-montserrat text-xs font-bold text-white">
                      {copy.selected}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <h3 className="font-crimson text-3xl text-stone-900">
                    {copy.legal}
                  </h3>
                  <span className="font-crimson text-2xl text-amber-700">
                    {copy.legalPrice}
                  </span>
                </div>
                <p className="mt-4 font-montserrat text-sm leading-6 text-stone-600">
                  {copy.legalChoiceText}
                </p>
                <p className="mt-3 font-montserrat text-xs font-semibold leading-5 text-rose-700">
                  {copy.legalCaution}
                </p>
              </button>
            </div>
          </div>
          <Summary
            copy={copy}
            experience={experience}
            decoration={decoration}
            legal={legal}
            guestCount={guestCount}
          />
        </div>
      </section>

      <section
        id="included"
        className="scroll-mt-6 px-5 py-20 md:px-10 md:py-28"
      >
        <SectionHeading
          eyebrow={copy.includedEyebrow}
          title={copy.includedTitle}
          intro={copy.includedIntro}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {copy.inclusions.map(([title, text], index) => {
            const Icon = ICONS[index];
            return (
              <article
                key={title}
                className="rounded-3xl border border-stone-200 p-6"
              >
                <Icon className="text-amber-700" size={27} strokeWidth={1.5} />
                <h3 className="mt-5 font-crimson text-2xl text-stone-900">
                  {title}
                </h3>
                <p className="mt-2 font-montserrat text-sm leading-6 text-stone-600">
                  {text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-stone-950 px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={copy.legalEyebrow}
            title={copy.legalTitle}
            intro={copy.legalIntro}
            dark
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-white/15 bg-white/5 p-7 md:p-9">
              <HeartHandshake
                className="text-amber-300"
                size={32}
                strokeWidth={1.4}
              />
              <h3 className="mt-5 font-crimson text-3xl">{copy.symbolic}</h3>
              <p className="mt-2 font-montserrat text-sm font-bold uppercase tracking-wider text-amber-300">
                {copy.symbolicIncluded}
              </p>
              <p className="mt-5 font-montserrat text-sm leading-7 text-stone-300">
                {copy.symbolicText}
              </p>
            </article>
            <article className="rounded-3xl border border-amber-400/40 bg-amber-400/10 p-7 md:p-9">
              <FileCheck2
                className="text-amber-300"
                size={32}
                strokeWidth={1.4}
              />
              <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <h3 className="font-crimson text-3xl">{copy.legal}</h3>
                <span className="font-crimson text-3xl text-amber-300">
                  {copy.legalPrice}
                </span>
              </div>
              <p className="mt-5 font-montserrat text-sm leading-7 text-stone-200">
                {copy.legalText}
              </p>
              <p className="mt-4 flex gap-2 font-montserrat text-xs font-semibold leading-5 text-amber-200">
                <ShieldCheck className="shrink-0" size={18} />{" "}
                {copy.legalCaution}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={copy.realEyebrow}
          title={copy.realTitle}
          intro={copy.realIntro}
        />
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {(galleryImages.length >= 4
            ? galleryImages
            : [sunshine2, white2, crescent2, huppa2]
          ).map((image, index) => (
            <div
              key={`${image?.id || image?.title || image}-${index}`}
              className={`overflow-hidden rounded-2xl ${index % 2 ? "mt-6 md:mt-10" : ""}`}
            >
              {getImage(image?.gatsbyImage) ? (
                <GatsbyImage
                  image={getImage(image.gatsbyImage)}
                  alt={`Real Punta Cana elopement wedding décor by Sertuin Events ${index + 1}`}
                  className="h-64 w-full md:h-96"
                  imgStyle={{ objectFit: "cover" }}
                />
              ) : (
                <img
                  src={image}
                  alt={`Real Punta Cana elopement wedding décor by Sertuin Events ${index + 1}`}
                  loading="lazy"
                  width="1200"
                  height="900"
                  className="h-64 w-full object-cover md:h-96"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        id="reserve"
        className="scroll-mt-6 bg-stone-50 px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={copy.reserveEyebrow}
              title={copy.reserveTitle}
              intro={copy.reserveIntro}
              align="left"
            />
            <h3 className="mt-10 font-crimson text-3xl text-stone-900">
              {copy.paymentTitle}
            </h3>
            <ol className="mt-6 space-y-5">
              {copy.paymentSteps.map(([title, text], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-montserrat text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-montserrat text-sm font-bold text-stone-900">
                      {title}
                    </h4>
                    <p className="mt-1 font-montserrat text-sm leading-6 text-stone-600">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-montserrat text-sm font-semibold leading-6 text-rose-800">
              <ShieldCheck className="shrink-0" size={21} />{" "}
              {copy.depositNotice}
            </p>
          </div>
          <ElopementForm
            copy={copy}
            experience={experience}
            decoration={decoration}
            legal={legal}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            language={language}
          />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={copy.faqEyebrow}
          title={copy.faqTitle}
          intro={copy.faqIntro}
        />
        <div className="mx-auto mt-12 max-w-4xl divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-crimson text-xl text-stone-900 md:text-2xl">
                {question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 font-montserrat text-lg text-amber-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 font-montserrat text-sm leading-7 text-stone-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ElopementExperience;
