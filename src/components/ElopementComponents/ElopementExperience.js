import React, { useMemo, useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { trackFormError, trackFormSuccess } from "../../utils/analytics";
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
  MailCheck,
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

const ELOPEMENT_GALLERY = [
  {
    slug: "beach-elopement-couple-pampas-arch",
    width: 5310,
    height: 3540,
    en: "Newlyweds celebrating beneath a pampas and floral arch on a Punta Cana beach",
    es: "Pareja de recién casados celebrando bajo un arco floral con pampas en una playa de Punta Cana",
  },
  {
    slug: "punta-cana-elopement-vintage-car",
    width: 5499,
    height: 3666,
    en: "Elopement couple beside a classic white car on a palm-lined Punta Cana beach",
    es: "Pareja de elopement junto a un auto clásico blanco en una playa con palmeras de Punta Cana",
  },
  {
    slug: "groom-waiting-beach-elopement",
    width: 3235,
    height: 4853,
    en: "Groom waiting at a pampas-lined beach ceremony aisle in Punta Cana",
    es: "Novio esperando en un pasillo de ceremonia con pampas frente al mar en Punta Cana",
  },
  {
    slug: "elopement-couple-palm-beach-arrival",
    width: 3840,
    height: 5760,
    en: "Bride and groom arriving for their intimate Punta Cana beach ceremony",
    es: "Novia y novio llegando a su ceremonia íntima en una playa de Punta Cana",
  },
  {
    slug: "beach-elopement-champagne-toast",
    width: 3838,
    height: 2559,
    en: "Elopement couple sharing a champagne toast after their Punta Cana beach ceremony",
    es: "Pareja brindando con champaña después de su ceremonia de elopement en Punta Cana",
  },
  {
    slug: "intimate-beach-elopement-couple",
    width: 4046,
    height: 2697,
    en: "Couple holding hands after an intimate beach elopement ceremony in Punta Cana",
    es: "Pareja tomada de las manos después de una ceremonia íntima de elopement en Punta Cana",
  },
  {
    slug: "elopement-ring-exchange-beach",
    width: 4508,
    height: 3005,
    en: "Couple exchanging rings during a private Punta Cana beach elopement",
    es: "Pareja intercambiando anillos durante un elopement privado en una playa de Punta Cana",
  },
  {
    slug: "catamaran-elopement-bride-bouquet",
    width: 4284,
    height: 5712,
    en: "Bride raising her bouquet beside a pampas ceremony arch on a Punta Cana catamaran",
    es: "Novia levantando su bouquet junto a un arco con pampas en un catamarán de Punta Cana",
  },
  {
    slug: "catamaran-elopement-family",
    width: 5712,
    height: 4284,
    en: "Newlyweds celebrating with family after a private Punta Cana catamaran ceremony",
    es: "Recién casados celebrando con su familia después de una ceremonia privada en catamarán en Punta Cana",
  },
  {
    slug: "catamaran-bride-pampas-arch",
    width: 4032,
    height: 3024,
    en: "Bride celebrating beside a pampas floral arch aboard a Punta Cana catamaran",
    es: "Novia celebrando junto a un arco floral con pampas a bordo de un catamarán en Punta Cana",
  },
  {
    slug: "catamaran-elopement-couple",
    width: 1980,
    height: 3520,
    en: "Elopement couple standing beneath a pampas arch on a private Punta Cana catamaran",
    es: "Pareja de elopement bajo un arco con pampas en un catamarán privado de Punta Cana",
  },
  {
    slug: "elopement-bride-vows-punta-cana",
    width: 3433,
    height: 2289,
    en: "Bride listening to her partner's vows during a Punta Cana beach elopement",
    es: "Novia escuchando los votos de su pareja durante un elopement en una playa de Punta Cana",
  },
  {
    slug: "intimate-beach-elopement-ceremony",
    width: 4608,
    height: 3072,
    en: "Family attending an intimate elopement ceremony on a quiet Punta Cana beach",
    es: "Familia acompañando una ceremonia íntima de elopement en una playa tranquila de Punta Cana",
  },
  {
    slug: "beach-wedding-officiant-punta-cana",
    width: 4335,
    height: 2890,
    en: "Officiant leading an intimate elopement ceremony beside the sea in Punta Cana",
    es: "Oficiante guiando una ceremonia íntima de elopement frente al mar en Punta Cana",
  },
  {
    slug: "colorful-beach-elopement-couple",
    width: 4608,
    height: 3072,
    en: "Newlyweds walking through a colorful tropical elopement ceremony on the beach",
    es: "Recién casados caminando por una colorida ceremonia tropical de elopement en la playa",
  },
  {
    slug: "bride-vows-colorful-elopement",
    width: 3902,
    height: 2601,
    en: "Bride exchanging vows at a colorful tropical beach elopement in Punta Cana",
    es: "Novia intercambiando votos en un colorido elopement tropical en una playa de Punta Cana",
  },
  {
    slug: "family-elopement-ceremony-punta-cana",
    width: 4096,
    height: 2731,
    en: "Family gathered around the couple during a Punta Cana beach elopement ceremony",
    es: "Familia reunida junto a la pareja durante una ceremonia de elopement en una playa de Punta Cana",
  },
];

const gallerySource = (slug, size) =>
  `/images/elopement-gallery/${slug}-${size}.webp`;

const COPY = {
  "en-US": {
    heroTitle: "Punta Cana Elopement Wedding Packages",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Punta Cana Elopement Wedding Packages",
    formula: [
      "Ceremony experience",
      "Selected décor",
      "Optional legal wedding",
    ],
    builderEyebrow: "Packages & prices",
    builderTitle: "Punta Cana Elopement Packages & Prices",
    builderIntro:
      "Choose your setting, décor and ceremony type. Your estimated total updates with every selection.",
    stepOne: "1. Choose your setting",
    stepTwo: "2. Choose your décor",
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
        "Elopement photo coverage",
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
        "Elopement photo coverage, bouquet, boutonnière and ceremony team",
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
    guestsHelp: "2–10 people are covered by the published catamaran price.",
    customQuote: "Custom quote required",
    customQuoteText:
      "For more than 10 people, send your request so we can confirm the additional cost. The boat has capacity for up to 60 people.",
    estimate: "Your estimated elopement total",
    experienceLine: "Experience",
    decorLine: "Décor",
    legalLine: "Legal wedding",
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
        "Private round trip from any hotel or accommodation in the Punta Cana area for the couple and up to eight guests.",
      ],
      [
        "Elopement photo coverage",
        "70–100 edited, high-resolution ceremony images delivered in a digital gallery within 48 hours after the elopement.",
      ],
      [
        "Dedicated wedding coordination",
        "A coordinator assists you from reservation through planning and is onsite on the wedding day. Your officiant leads the ceremony.",
      ],
      [
        "Personal flowers",
        "A bouquet and boutonnière complement your selected ceremony design.",
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
      phoneCountry: "Country",
      phoneError: "Select the country and enter a valid phone number.",
      emailError: "Enter a valid email address with an active domain.",
      date: "Preferred wedding date",
      guests: "Number of people",
      hotel: "Hotel or accommodation",
      message: "Anything else we should know?",
      optional: "Optional",
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
        "Pay the balance on arrival",
        "The remaining balance is paid in cash on the wedding day, at the beach or before boarding.",
      ],
    ],
    depositNotice:
      "The US$200 reservation deposit is non-refundable, except when unsafe weather makes the elopement impossible during the couple’s stay.",
    realEyebrow: "Created by Sertuin Events",
    realTitle: "Real Punta Cana elopements",
    realIntro:
      "Beach and catamaran elopements planned and coordinated by Sertuin Events in Punta Cana.",
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
      "Decoración elegida",
      "Boda legal opcional",
    ],
    builderEyebrow: "Paquetes y precios",
    builderTitle: "Paquetes y precios de elopement en Punta Cana",
    builderIntro:
      "Elige la locación, la decoración y el tipo de ceremonia. El total estimado se actualiza con cada selección.",
    stepOne: "1. Elige la locación",
    stepTwo: "2. Elige la decoración",
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
        "Cobertura fotográfica del elopement",
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
        "Cobertura fotográfica, bouquet, boutonnière y equipo de ceremonia",
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
      "De 2 a 10 personas están cubiertas por el precio publicado del catamarán.",
    customQuote: "Requiere cotización personalizada",
    customQuoteText:
      "Para más de 10 personas, envía la solicitud para confirmar el costo adicional. La embarcación tiene capacidad máxima para 60 personas.",
    estimate: "Total estimado de tu elopement",
    experienceLine: "Experiencia",
    decorLine: "Decoración",
    legalLine: "Boda legal",
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
        "Traslado privado ida y vuelta desde cualquier hotel o alojamiento de la zona de Punta Cana para la pareja y hasta ocho invitados.",
      ],
      [
        "Cobertura fotográfica del elopement",
        "70–100 imágenes editadas en alta resolución, entregadas en una galería digital dentro de las 48 horas posteriores al elopement.",
      ],
      [
        "Coordinación dedicada de la boda",
        "Una coordinadora te asiste desde la reserva, acompaña la planificación y está onsite el día de la boda. El oficiante dirige la ceremonia.",
      ],
      [
        "Flores personales",
        "Bouquet y boutonnière coordinados con el diseño de ceremonia elegido.",
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
      phoneCountry: "País",
      phoneError: "Selecciona el país e ingresa un número de teléfono válido.",
      emailError: "Ingresa un correo válido con un dominio activo.",
      date: "Fecha preferida de la boda",
      guests: "Cantidad de personas",
      hotel: "Hotel o alojamiento",
      message: "¿Hay algo más que debamos saber?",
      optional: "Opcional",
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
        "Paga el balance al llegar",
        "El restante se paga en efectivo el día de la boda, al llegar a la playa o antes de abordar.",
      ],
    ],
    depositNotice:
      "El pago de reserva de US$200 no es reembolsable, excepto cuando el clima inseguro impide realizar el elopement durante la estadía de la pareja.",
    realEyebrow: "Creado por Sertuin Events",
    realTitle: "Elopements reales en Punta Cana",
    realIntro:
      "Elopements en playa y catamarán planificados y coordinados por Sertuin Events en Punta Cana.",
    faqEyebrow: "Detalles útiles",
    faqTitle: "Preguntas frecuentes sobre elopements en Punta Cana",
    faqIntro: "Abre únicamente las preguntas que importan para tus planes.",
  },
};

export const getElopementCopy = (language = "en-US") =>
  COPY[language === "es" ? "es" : "en-US"];

export const buildElopementFaqs = (language = "en-US") => {
  const es = language === "es";

  return es
    ? [
        [
          "¿Cuánto cuesta un elopement en Punta Cana?",
          "La experiencia base en playa privada cuesta US$999 y el catamarán privado US$1,299. A ese precio se agrega la decoración elegida, desde US$789 hasta US$1,399. La boda legal es opcional por US$1,200 adicionales.",
        ],
        [
          "¿Qué incluye el precio base?",
          "Incluye transporte ida y vuelta para la pareja y hasta ocho invitados desde la zona de Punta Cana, cobertura fotográfica de la ceremonia, bouquet, boutonnière, oficiante, coordinadora y certificado simbólico. La experiencia de playa dura hasta dos horas; el catamarán incluye tres horas a bordo.",
        ],
        [
          "¿Cuándo recibiremos las fotografías del elopement?",
          "Recibirán entre 70 y 100 fotografías editadas en alta resolución mediante una galería digital dentro de las 48 horas posteriores a la ceremonia.",
        ],
        [
          "¿Tendremos coordinadora y en qué idiomas puede realizarse la ceremonia?",
          "Sí. Una coordinadora les asiste desde la reserva y está presente el día del elopement. La ceremonia puede realizarse en inglés o español.",
        ],
        [
          "¿Cuántas personas pueden participar?",
          "Un elopement incluye a la pareja y hasta ocho invitados. El catamarán es privado, tiene capacidad para 60 personas y el precio publicado cubre hasta 10; las personas adicionales se confirman antes de reservar y normalmente cuestan US$70 por persona.",
        ],
        [
          "¿Qué diferencia hay entre una ceremonia simbólica y una boda legal?",
          "La ceremonia simbólica incluye votos, anillos, oficiante y certificado de recuerdo, pero no crea un registro civil. La boda legal completa el proceso civil dominicano y requiere que revisemos y aprobemos los documentos antes de aceptar el depósito.",
        ],
        [
          "¿Qué sucede si el clima no permite realizar el elopement?",
          "Según las condiciones y la disponibilidad, podemos cambiar la hora, mover la ceremonia a un lugar techado o reprogramarla hasta dos veces. Si el clima hace imposible realizarla durante la estadía de la pareja, se devuelve el depósito. En el catamarán, el capitán toma la decisión final de seguridad y navegación.",
        ],
        [
          "¿Cómo se reserva? ¿Enviar el formulario confirma la fecha?",
          "El formulario solamente envía una solicitud. La fecha queda reservada después de confirmar disponibilidad, completar el contrato y pagar el depósito de US$200 por PayPal. El balance se paga en efectivo el día del elopement, al llegar a la playa o antes de abordar.",
        ],
      ]
    : [
        [
          "How much does a Punta Cana elopement cost?",
          "The private beach base experience is US$999 and the private catamaran is US$1,299. Add your selected décor, priced from US$789 to US$1,399. A legal wedding is optional for an additional US$1,200.",
        ],
        [
          "What is included in the base price?",
          "It includes round-trip transportation for the couple and up to eight guests from the Punta Cana area, ceremony photo coverage, bouquet, boutonnière, officiant, coordinator and symbolic certificate. The beach experience lasts up to two hours; the catamaran includes three hours aboard.",
        ],
        [
          "When will we receive our elopement photographs?",
          "You will receive 70–100 edited, high-resolution photographs in a digital gallery within 48 hours after the ceremony.",
        ],
        [
          "Will we have a coordinator, and which ceremony languages are available?",
          "Yes. A coordinator assists you from reservation and is onsite for the elopement. The ceremony can be held in English or Spanish.",
        ],
        [
          "How many people can participate?",
          "An elopement includes the couple and up to eight guests. The private catamaran holds up to 60 people and the published price covers up to 10; additional guests are confirmed before booking and normally cost US$70 per person.",
        ],
        [
          "What is the difference between a symbolic ceremony and a legal wedding?",
          "A symbolic ceremony includes vows, rings, an officiant and a keepsake certificate, but it does not create a civil record. A legal wedding completes the Dominican civil process and requires us to review and approve the documents before accepting the deposit.",
        ],
        [
          "What happens if weather prevents the elopement?",
          "Depending on conditions and availability, we can change the time, move the ceremony to a covered location or reschedule up to two times. If weather makes the elopement impossible during the couple’s stay, the deposit is refunded. On the catamaran, the captain makes the final navigation and safety decision.",
        ],
        [
          "How do we reserve, and does submitting the form confirm the date?",
          "The form only sends a request. The date is reserved after availability is confirmed, the agreement is completed and the US$200 deposit is paid through PayPal. The balance is paid in cash on the elopement day, upon arrival at the beach or before boarding.",
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

const Summary = ({ copy, experience, decoration, legal, customQuote }) => {
  const total =
    experience.price + decoration.price + (legal ? LEGAL_UPGRADE_PRICE : 0);

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
            {copy.decorNames[decoration.id]}
            <strong className="block text-base">
              {money(decoration.price)}
            </strong>
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-stone-300">{copy.legalLine}</span>
          <strong>{legal ? money(LEGAL_UPGRADE_PRICE) : copy.included}</strong>
        </div>
      </div>
      <div className="mt-6 border-t border-white/20 pt-6">
        {customQuote ? (
          <>
            <p className="font-crimson text-3xl text-amber-300">
              {copy.customQuote}
            </p>
            <p className="mt-3 font-montserrat text-sm leading-6 text-stone-300">
              {copy.customQuoteText}
            </p>
          </>
        ) : (
          <p className="font-crimson text-5xl text-amber-300">{money(total)}</p>
        )}
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
  const [status, setStatus] = useState("idle");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const total =
    experience.price + decoration.price + (legal ? LEGAL_UPGRADE_PRICE : 0);
  const customQuote = experience.id === "catamaran" && guestCount > 10;
  const phoneCountry = parsePhoneNumber(phone || "")?.country || "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!phoneCountry || !phone || !isPossiblePhoneNumber(phone)) {
      setStatus("error");
      setFormError(copy.form.phoneError);
      trackFormError(event.currentTarget, "invalid_phone");
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
      formData.set("whatsapp", phone);
      formData.set("phone-country", phoneCountry);
      const validationPayload = Object.fromEntries(formData.entries());
      validationPayload["validate-only"] = true;
      const validationResponse = await fetch(
        "/.netlify/functions/elopementRequest",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validationPayload),
        },
      );
      const validationResult = await validationResponse
        .json()
        .catch(() => ({}));

      if (!validationResponse.ok) {
        throw new Error(validationResult.error || "Form validation failed");
      }

      const formResponse = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!formResponse.ok) {
        throw new Error("Form submission failed");
      }

      trackFormSuccess(form);
      form.reset();
      setPhone("");
      setStatus("success");
    } catch (error) {
      trackFormError(
        form,
        /email/i.test(error.message)
          ? "invalid_email"
          : /phone/i.test(error.message)
            ? "invalid_phone"
            : "submission_error",
      );
      setStatus("error");
      setFormError(
        /email/i.test(error.message)
          ? copy.form.emailError
          : /phone/i.test(error.message)
            ? copy.form.phoneError
            : copy.form.error,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <MailCheck
          className="mx-auto text-emerald-700"
          size={40}
          strokeWidth={1.5}
        />
        <h3 className="mt-4 font-crimson text-3xl text-stone-900">
          {copy.form.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-xl font-montserrat text-sm leading-6 text-stone-700">
          {copy.form.success}
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-montserrat text-sm text-stone-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <form
      name="elopement-request"
      method="POST"
      action={
        language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/"
      }
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(74,56,18,0.09)] md:p-8"
    >
      <input type="hidden" name="form-name" value="elopement-request" />
      <input type="hidden" name="language" value={language} />
      <input
        type="hidden"
        name="experience"
        value={copy[experience.id].title}
      />
      <input
        type="hidden"
        name="decoration"
        value={copy.decorNames[decoration.id]}
      />
      <input
        type="hidden"
        name="ceremony"
        value={legal ? copy.legal : copy.symbolic}
      />
      <input
        type="hidden"
        name="estimated-total"
        value={customQuote ? copy.customQuote : money(total)}
      />
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
          {copy[experience.id].title} + {copy.decorNames[decoration.id]}
        </p>
        <p className="mt-1 font-montserrat text-sm text-stone-600">
          {customQuote ? copy.customQuote : money(total)} ·{" "}
          {legal ? copy.legal : copy.symbolic}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {copy.form.names}
          <input
            className={inputClass}
            type="text"
            name="couple-names"
            minLength="2"
            maxLength="160"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700">
          {copy.form.email}
          <input
            className={inputClass}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            maxLength="200"
            pattern="^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$"
            required
          />
        </label>
        <div className="font-montserrat text-sm font-semibold text-stone-700">
          <span>{copy.form.whatsapp}</span>
          <PhoneInput
            international
            name="whatsapp"
            value={phone}
            onChange={(value) => {
              setPhone(value || "");
              if (status === "error") {
                setStatus("idle");
                setFormError("");
              }
            }}
            countrySelectProps={{
              "aria-label": copy.form.phoneCountry,
              required: true,
            }}
            numberInputProps={{
              className:
                "w-full bg-transparent px-3 py-3 font-montserrat text-sm text-stone-900 outline-none",
              autoComplete: "tel",
              inputMode: "tel",
            }}
            className="mt-2 rounded-xl border border-stone-300 bg-white px-3 transition focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100"
            required
          />
          <input type="hidden" name="phone-country" value={phoneCountry} />
        </div>
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
          <input
            className={inputClass}
            type="text"
            name="hotel"
            maxLength="200"
            required
          />
        </label>
        <label className="font-montserrat text-sm font-semibold text-stone-700 md:col-span-2">
          {copy.form.message}{" "}
          <span className="font-normal text-stone-500">
            ({copy.form.optional})
          </span>
          <textarea
            className={inputClass}
            name="message"
            rows="4"
            maxLength="2000"
          />
        </label>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 font-montserrat text-sm font-semibold text-rose-700"
        >
          {formError || copy.form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-4 font-montserrat text-sm font-bold text-white transition hover:bg-amber-600 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? copy.form.sending : copy.form.send}
        <ArrowRight size={18} />
      </button>
      <p className="mt-4 text-center font-montserrat text-xs leading-5 text-stone-500">
        {copy.form.notice}
      </p>
    </form>
  );
};

const ICONS = [CarFront, Camera, HeartHandshake, Flower2, FileCheck2, MapPin];

const ElopementExperience = ({ language = "en-US" }) => {
  const copy = getElopementCopy(language);
  const [experienceId, setExperienceId] = useState("beach");
  const [decorationId, setDecorationId] = useState("white-serenity");
  const [legal, setLegal] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const faqs = buildElopementFaqs(language);

  const experience = useMemo(
    () => ELOPEMENT_EXPERIENCES.find((item) => item.id === experienceId),
    [experienceId],
  );
  const decoration = useMemo(
    () => ELOPEMENT_DECORATIONS.find((item) => item.id === decorationId),
    [decorationId],
  );
  const customQuote = experience.id === "catamaran" && guestCount > 10;

  const selectExperience = (id) => {
    setExperienceId(id);
    if (id === "catamaran") {
      setGuestCount((current) => Math.min(current, 60));
    }
    if (id === "catamaran" && !decoration.catamaran) {
      setDecorationId("white-serenity");
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="absolute left-0 top-0 h-screen w-full bg-stone-900">
        <img
          src={gallerySource("beach-elopement-couple-pampas-arch", 1600)}
          srcSet={`${gallerySource("beach-elopement-couple-pampas-arch", 480)} 480w, ${gallerySource("beach-elopement-couple-pampas-arch", 960)} 960w, ${gallerySource("beach-elopement-couple-pampas-arch", 1600)} 1600w, ${gallerySource("beach-elopement-couple-pampas-arch", 2400)} 2400w`}
          sizes="100vw"
          alt={
            language === "es"
              ? ELOPEMENT_GALLERY[0].es
              : ELOPEMENT_GALLERY[0].en
          }
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="5310"
          height="3540"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end justify-center px-5 pb-[14vh] text-center md:px-10 md:pb-[16vh]">
          <h1 className="max-w-5xl font-crimson text-5xl font-normal leading-[1.02] text-white md:text-7xl lg:text-8xl">
            {copy.heroTitle}
          </h1>
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
            {ELOPEMENT_EXPERIENCES.map((item) => (
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
            customQuote={customQuote}
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
        <div className="mx-auto mt-12 max-w-6xl columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
          {ELOPEMENT_GALLERY.map((image) => (
            <figure
              key={image.slug}
              className="mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-stone-100 md:mb-5"
              style={{ contentVisibility: "auto" }}
            >
              <img
                src={gallerySource(image.slug, 960)}
                srcSet={`${gallerySource(image.slug, 480)} 480w, ${gallerySource(image.slug, 960)} 960w, ${gallerySource(image.slug, 1600)} 1600w`}
                sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
                alt={language === "es" ? image.es : image.en}
                loading="lazy"
                decoding="async"
                width={image.width}
                height={image.height}
                className="h-auto w-full"
              />
            </figure>
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
