import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { Link } from "gatsby";
import {
  CalendarCheck2,
  Camera,
  CarFront,
  FileText,
  Flower2,
  Instagram,
  Landmark,
  MapPin,
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

const googleReviewExcerpts = [
  {
    author: "Leonardo Leal",
    excerpt: "Grecia made sure to understand my vision.",
  },
  {
    author: "Joey DeVera",
    excerpt: "She got every detail right!",
  },
  {
    author: "Cindy Maria Danetra Pedroza",
    excerpt: "Entendió perfectamente lo que quería.",
  },
  {
    author: "Drew Langdon",
    excerpt: "Everything was absolutely perfect.",
  },
];

const copy = {
  "en-US": {
    overviewEyebrow: "A complete experience, clearly priced",
    overviewTitle: "Complete Marriage Proposal Packages in Punta Cana",
    overviewParagraphs: [
      "Our standard packages are designed for Sertuin Events’ private beach in Uvero Alto. We can also coordinate a proposal at a villa, resort, yacht or another approved location when the client obtains the required access and the venue permits the setup. Every published package includes round-trip transportation for the couple from anywhere in Punta Cana, the selected setup, bouquet, celebratory beverage, professional photography, a 3–5 minute vertical phone video and your preferred song.",
      "Choose the package that reflects your vision, reserve your date with a US$200 deposit and let our team coordinate the arrival, timing and reveal while you focus entirely on your partner and the question you came to ask.",
    ],
    packagesFallbackTitle: "Punta Cana Proposal Packages and Prices",
    inclusionsEyebrow: "Included with every package",
    inclusionsTitle: "Everything Essential Is Already Included",
    inclusionsIntro:
      "The published package price covers the services needed to coordinate, create and document your standard private-beach proposal. Other venues may charge their own access, location or outside-provider fees.",
    inclusions: [
      [
        MapPin,
        "Recommended Private Beach",
        "Standard packages use our private beach in Uvero Alto. Villas, resorts, yachts and other approved locations are available by quotation and permission.",
      ],
      [
        CarFront,
        "Private Transportation",
        "Private pickup and return transportation for the couple from any hotel or accommodation throughout Punta Cana. Each additional companion costs US$20 for transportation, up to eight guests.",
      ],
      [
        Flower2,
        "Selected Romantic Setup",
        "The decoration associated with your chosen package is completely prepared before your arrival.",
      ],
      [
        Camera,
        "Professional Photography",
        "Receive more than 70 professionally edited, high-resolution photographs within 48 hours through a permanent Google Drive link.",
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
      [Video, "Professional video and drone — US$399"],
      [Music2, "Live violinist — US$399"],
      [Music2, "Live saxophonist — US$399"],
      [UtensilsCrossed, "Private dinner for two — US$299"],
      [Sparkles, "Cold sparks — US$150 per pair"],
      [Flower2, "Custom flowers — quoted to design"],
    ],
    momentsEyebrow: "Real Sertuin Events experiences",
    momentsTitle: "Real Punta Cana Proposal Moments",
    momentsIntro:
      "Explore real setups and celebrations created by our team in Punta Cana.",
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
        "Our team confirms the location, transportation and services associated with your selected package.",
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
    trustEyebrow: "Local leadership and proven experience",
    trustTitle: "A Dominican Company Led by Wedding Planner Grecia Mejía",
    trustIntro:
      "Sertuin SRL is a registered Dominican company based in Punta Cana. Grecia Mejía leads the company and its proposal experiences, supported by a team that coordinates each arrival, setup and reveal.",
    companyTitle: "Sertuin Events at a Glance",
    experienceFacts: [
      "More than 10 years of experience",
      "More than 1,800 marriage proposals created",
      "Based in Punta Cana, Dominican Republic",
      "Planning in English and Spanish",
    ],
    appointmentNote:
      "Start through WhatsApp, phone or the inquiry form. We then coordinate the next planning steps with you.",
    portfolioText:
      "Explore recent and historical proposal work through our official Instagram portfolio.",
    reviewsTitle: "What Clients Say on Google",
    reviewsIntro:
      "Short excerpts from reviews published on our current Google Business Profile. Follow the source to read every review in full.",
    fiveStarsLabel: "5 out of 5 stars",
    reviewSource: "Review on Google Maps",
    mapsLink: "View on Google Maps",
    reviewLink: "Write a Google review",
    instagramLink: "View @sertuinevents",
  },
  es: {
    overviewEyebrow: "Una experiencia completa con precios claros",
    overviewTitle:
      "Paquetes completos de propuestas de matrimonio en Punta Cana",
    overviewParagraphs: [
      "Nuestros paquetes estándar están diseñados para la playa privada de Sertuin Events en Uvero Alto. También podemos coordinar una propuesta en una villa, resort, yate u otra locación aprobada cuando el cliente obtiene los accesos necesarios y el lugar permite el montaje. Cada paquete publicado incluye transporte ida y vuelta para la pareja desde cualquier zona de Punta Cana, el montaje elegido, bouquet, bebida para celebrar, fotografía profesional, video vertical de 3 a 5 minutos con teléfono y la canción preferida.",
      "Elige el paquete que represente tu visión, reserva la fecha con un depósito de US$200 y permite que nuestro equipo coordine la llegada, el momento y la revelación mientras tú te concentras completamente en tu pareja.",
    ],
    packagesFallbackTitle: "Paquetes y precios de propuestas en Punta Cana",
    inclusionsEyebrow: "Incluido en cada paquete",
    inclusionsTitle: "Todo lo esencial ya está incluido",
    inclusionsIntro:
      "El precio publicado cubre los servicios necesarios para coordinar, crear y documentar la propuesta estándar en nuestra playa privada. Otras locaciones pueden aplicar sus propios cargos de acceso, uso del lugar o proveedores externos.",
    inclusions: [
      [
        MapPin,
        "Playa privada recomendada",
        "Los paquetes estándar utilizan nuestra playa privada en Uvero Alto. Villas, resorts, yates y otras locaciones aprobadas se cotizan según permisos.",
      ],
      [
        CarFront,
        "Transporte privado",
        "Recogida y regreso para la pareja desde cualquier hotel o alojamiento de Punta Cana. Cada acompañante adicional paga US$20 por transporte, hasta ocho invitados.",
      ],
      [
        Flower2,
        "Decoración seleccionada",
        "La decoración correspondiente al paquete elegido queda completamente preparada antes de tu llegada.",
      ],
      [
        Camera,
        "Fotografía profesional",
        "Recibe más de 70 fotografías editadas profesionalmente y en alta resolución dentro de 48 horas mediante un enlace permanente de Google Drive.",
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
      [Video, "Video profesional y dron — US$399"],
      [Music2, "Violinista en vivo — US$399"],
      [Music2, "Saxofonista en vivo — US$399"],
      [UtensilsCrossed, "Cena privada para dos — US$299"],
      [Sparkles, "Chispas frías — US$150 el par"],
      [Flower2, "Flores personalizadas — precio según diseño"],
    ],
    momentsEyebrow: "Experiencias reales de Sertuin Events",
    momentsTitle: "Momentos reales de propuestas en Punta Cana",
    momentsIntro:
      "Descubre decoraciones y celebraciones reales creadas por nuestro equipo en Punta Cana.",
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
        "Nuestro equipo confirma la locación, el transporte y los servicios correspondientes al paquete seleccionado.",
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
    trustEyebrow: "Liderazgo local y experiencia comprobable",
    trustTitle:
      "Una empresa dominicana dirigida por la wedding planner Grecia Mejía",
    trustIntro:
      "Sertuin SRL es una empresa dominicana registrada y ubicada en Punta Cana. Grecia Mejía dirige la empresa y sus experiencias de propuesta, junto con el equipo que coordina cada llegada, montaje y revelación.",
    companyTitle: "Sertuin Events en datos",
    experienceFacts: [
      "Más de 10 años de experiencia",
      "Más de 1,800 propuestas de matrimonio realizadas",
      "Ubicados en Punta Cana, República Dominicana",
      "Planificación en inglés y español",
    ],
    appointmentNote:
      "Comienza por WhatsApp, teléfono o el formulario. Luego coordinamos contigo los próximos pasos de la planificación.",
    portfolioText:
      "Explora trabajos recientes e históricos de propuestas en nuestro portafolio oficial de Instagram.",
    reviewsTitle: "Lo que dicen nuestros clientes en Google",
    reviewsIntro:
      "Fragmentos breves de opiniones publicadas en nuestro Perfil de Empresa actual en Google. Accede a la fuente para leer cada reseña completa.",
    fiveStarsLabel: "5 de 5 estrellas",
    reviewSource: "Reseña en Google Maps",
    mapsLink: "Ver en Google Maps",
    reviewLink: "Escribir una reseña",
    instagramLink: "Ver @sertuinevents",
  },
  pt: {
    overviewEyebrow: "Uma experiência completa com preços claros",
    overviewTitle: "Pacotes Completos de Pedido de Casamento em Punta Cana",
    overviewParagraphs: [
      "Nossos pacotes padrão são criados para a praia privativa da Sertuin Events em Uvero Alto. Também coordenamos pedidos em villa, resort, iate ou outro local aprovado quando o cliente obtém o acesso e o venue autoriza a montagem. Todo pacote inclui transporte de ida e volta para o casal em Punta Cana, decoração escolhida, buquê, bebida para celebrar, fotografia profissional, vídeo vertical de 3 a 5 minutos pelo celular e sua música preferida.",
      "Escolha o pacote que representa sua visão, reserve a data com um depósito de US$ 200 e deixe nossa equipe coordenar chegada, horário e revelação enquanto você se concentra na pessoa amada.",
    ],
    packagesFallbackTitle:
      "Pacotes e Preços de Pedido de Casamento em Punta Cana",
    inclusionsEyebrow: "Incluído em todos os pacotes",
    inclusionsTitle: "Tudo o que É Essencial Já Está Incluído",
    inclusionsIntro:
      "O preço publicado cobre os serviços necessários para coordenar, criar e documentar o pedido padrão em nossa praia privativa. Outros locais podem cobrar acesso ou fornecedores externos.",
    inclusions: [
      [
        MapPin,
        "Praia Privativa Recomendada",
        "Os pacotes padrão utilizam nossa praia privativa em Uvero Alto. Villas, resorts, iates e outros locais aprovados recebem cotação conforme permissões.",
      ],
      [
        CarFront,
        "Transporte Privativo",
        "Transporte de ida e volta para o casal desde qualquer hotel ou hospedagem em Punta Cana. Cada acompanhante adicional custa US$ 20, até oito convidados.",
      ],
      [
        Flower2,
        "Decoração Romântica Escolhida",
        "A decoração correspondente ao pacote é preparada completamente antes da chegada.",
      ],
      [
        Camera,
        "Fotografia Profissional",
        "Receba mais de 70 fotografias editadas em alta resolução em até 48 horas por um link permanente do Google Drive.",
      ],
      [
        Smartphone,
        "Vídeo do Pedido",
        "Gravamos o momento do pedido pelo celular sem custo adicional, mesmo sem vídeo profissional.",
      ],
      [
        Music2,
        "Música e Celebração",
        "Sua música preferida toca em nosso sistema de som e uma bebida para celebrar está incluída.",
      ],
      [
        UserRoundCheck,
        "Coordenador Dedicado",
        "O coordenador no local gerencia chegada, horário, música e revelação.",
      ],
    ],
    upgradesTitle: "Formas Opcionais de Personalizar a Experiência",
    upgradesIntro:
      "O pacote já inclui tudo o que é essencial. Estes adicionais podem ser contratados conforme sua visão e disponibilidade.",
    upgrades: [
      [Video, "Vídeo profissional e drone — US$ 399"],
      [Music2, "Violinista ao vivo — US$ 399"],
      [Music2, "Saxofonista ao vivo — US$ 399"],
      [UtensilsCrossed, "Jantar privativo para dois — US$ 299"],
      [Sparkles, "Faíscas frias — US$ 150 por par"],
      [Flower2, "Flores personalizadas — preço conforme o design"],
    ],
    momentsEyebrow: "Experiências reais da Sertuin Events",
    momentsTitle: "Pedidos de Casamento Reais em Punta Cana",
    momentsIntro:
      "Conheça decorações e celebrações reais criadas por nossa equipe em Punta Cana.",
    bookingEyebrow: "Simples e seguro",
    bookingTitle: "Como Reservar seu Pedido de Casamento em Punta Cana",
    bookingIntro:
      "A reserva é simples e segura, e você não precisa pagar o valor total antecipadamente.",
    bookingSteps: [
      [
        CalendarCheck2,
        "Escolha o pacote e a data",
        "Envie o pacote, a data, o hotel ou hospedagem e solicitações iniciais de personalização.",
      ],
      [
        ShieldCheck,
        "Confirme a disponibilidade",
        "Nossa equipe confirma o local, o transporte e os serviços do pacote escolhido.",
      ],
      [
        FileText,
        "Assine o contrato e reserve a data",
        "Enviamos um contrato escrito e um link seguro do PayPal. O depósito de US$ 200 reserva a data e é descontado do total.",
      ],
      [
        PartyPopper,
        "Coordenamos cada detalhe",
        "Depois da confirmação, coordenamos transporte, música, personalização, chegada e revelação. O saldo é pago conforme o contrato.",
      ],
    ],
    contactLabel: "Consultar disponibilidade",
    trustEyebrow: "Liderança local e experiência comprovada",
    trustTitle:
      "Uma Empresa Dominicana Liderada pela Wedding Planner Grecia Mejía",
    trustIntro:
      "A Sertuin SRL é uma empresa dominicana registrada e baseada em Punta Cana. Grecia Mejía lidera a empresa e as experiências de pedido, com uma equipe que coordena cada chegada, montagem e revelação.",
    companyTitle: "Sertuin Events em Números",
    experienceFacts: [
      "Mais de 10 anos de experiência",
      "Mais de 1.800 pedidos de casamento realizados",
      "Baseada em Punta Cana, República Dominicana",
      "Planejamento em inglês e espanhol",
    ],
    appointmentNote:
      "Comece pelo WhatsApp, telefone ou formulário. Depois coordenamos diretamente os próximos passos.",
    portfolioText:
      "Veja trabalhos recentes e históricos em nosso portfólio oficial no Instagram.",
    reviewsTitle: "O que os Clientes Dizem no Google",
    reviewsIntro:
      "Trechos curtos de avaliações publicadas no Perfil da Empresa no Google. Acesse a fonte para ler cada avaliação completa.",
    fiveStarsLabel: "5 de 5 estrelas",
    reviewSource: "Avaliação no Google Maps",
    mapsLink: "Ver no Google Maps",
    reviewLink: "Escrever uma avaliação",
    instagramLink: "Ver @sertuinevents",
  },
  fr: {
    overviewEyebrow: "Une expérience complète aux tarifs clairs",
    overviewTitle: "Forfaits Complets de Demande en Mariage à Punta Cana",
    overviewParagraphs: [
      "Nos forfaits standard sont conçus pour la plage privée de Sertuin Events à Uvero Alto. Nous pouvons aussi coordonner une demande dans une villa, un resort, sur un yacht ou dans un autre lieu autorisé lorsque le client obtient l’accès requis et que le lieu accepte l’installation. Chaque forfait publié comprend le transport aller-retour du couple depuis Punta Cana, le décor choisi, un bouquet, une boisson pour célébrer, la photographie professionnelle, une vidéo verticale de 3 à 5 minutes au téléphone et votre musique préférée.",
      "Choisissez le forfait qui reflète votre vision, réservez la date avec un acompte de 200 USD et laissez notre équipe coordonner l’arrivée, le timing et la révélation pendant que vous vous concentrez sur votre partenaire.",
    ],
    packagesFallbackTitle:
      "Forfaits et Tarifs de Demande en Mariage à Punta Cana",
    inclusionsEyebrow: "Inclus dans chaque forfait",
    inclusionsTitle: "Tout l’Essentiel Est Déjà Inclus",
    inclusionsIntro:
      "Le tarif publié couvre les services nécessaires pour coordonner, créer et documenter votre demande standard sur notre plage privée. D’autres lieux peuvent facturer accès, emplacement ou prestataires externes.",
    inclusions: [
      [
        MapPin,
        "Plage Privée Recommandée",
        "Les forfaits standard utilisent notre plage privée d’Uvero Alto. Villas, resorts, yachts et autres lieux autorisés sont disponibles sur devis et sous réserve d’autorisation.",
      ],
      [
        CarFront,
        "Transport Privé",
        "Prise en charge et retour privés du couple depuis tout hôtel ou hébergement de Punta Cana. Chaque accompagnant supplémentaire coûte 20 USD pour le transport, jusqu’à huit invités.",
      ],
      [
        Flower2,
        "Décor Romantique Choisi",
        "La décoration correspondant au forfait choisi est entièrement installée avant votre arrivée.",
      ],
      [
        Camera,
        "Photographie Professionnelle",
        "Recevez plus de 70 photos professionnelles retouchées en haute résolution sous 48 heures par lien Google Drive permanent.",
      ],
      [
        Smartphone,
        "Vidéo de la Demande",
        "Nous enregistrons la demande au téléphone sans supplément, même si la vidéo professionnelle n’est pas ajoutée.",
      ],
      [
        Music2,
        "Musique et Célébration",
        "Votre chanson préférée est diffusée sur notre système audio et une boisson pour célébrer est incluse.",
      ],
      [
        UserRoundCheck,
        "Coordinatrice Dédiée",
        "Votre coordinatrice sur place gère l’arrivée, le timing, la musique choisie et la révélation.",
      ],
    ],
    upgradesTitle: "Des Options pour Personnaliser Votre Expérience",
    upgradesIntro:
      "Votre forfait comprend déjà tout l’essentiel. Ces options peuvent être ajoutées selon votre vision et les disponibilités.",
    upgrades: [
      [Video, "Vidéo professionnelle et drone — 399 USD"],
      [Music2, "Violoniste en direct — 399 USD"],
      [Music2, "Saxophoniste en direct — 399 USD"],
      [UtensilsCrossed, "Dîner privé pour deux — 299 USD"],
      [Sparkles, "Étincelles froides — 150 USD la paire"],
      [Flower2, "Fleurs personnalisées — devis selon le design"],
    ],
    momentsEyebrow: "De vraies expériences Sertuin Events",
    momentsTitle: "De Vraies Demandes en Mariage à Punta Cana",
    momentsIntro:
      "Découvrez des décors et célébrations réels créés par notre équipe à Punta Cana.",
    bookingEyebrow: "Simple et sécurisé",
    bookingTitle: "Comment Réserver Votre Demande en Mariage à Punta Cana",
    bookingIntro:
      "La réservation est simple et sécurisée, sans paiement intégral à l’avance.",
    bookingSteps: [
      [
        CalendarCheck2,
        "Choisissez le forfait et la date",
        "Envoyez le forfait souhaité, la date, l’hôtel ou l’hébergement et vos premières demandes de personnalisation.",
      ],
      [
        ShieldCheck,
        "Confirmez la disponibilité",
        "Notre équipe confirme le lieu, le transport et les services associés au forfait choisi.",
      ],
      [
        FileText,
        "Signez le contrat et réservez la date",
        "Nous envoyons un contrat écrit et un lien PayPal sécurisé. L’acompte de 200 USD réserve la date et est déduit du total.",
      ],
      [
        PartyPopper,
        "Nous coordonnons chaque détail",
        "Après confirmation, nous coordonnons transport, musique, personnalisation, arrivée, timing et révélation. Le solde est réglé après l’expérience conformément au contrat.",
      ],
    ],
    contactLabel: "Vérifier la disponibilité",
    trustEyebrow: "Direction locale et expérience reconnue",
    trustTitle:
      "Une Entreprise Dominicaine Dirigée par la Wedding Planner Grecia Mejía",
    trustIntro:
      "Sertuin SRL est une entreprise dominicaine enregistrée et basée à Punta Cana. Grecia Mejía dirige l’entreprise et ses expériences de demande, avec une équipe qui coordonne chaque arrivée, installation et révélation.",
    companyTitle: "Sertuin Events en Bref",
    experienceFacts: [
      "Plus de 10 ans d’expérience",
      "Plus de 1 800 demandes en mariage réalisées",
      "Basée à Punta Cana, République dominicaine",
      "Organisation en français, anglais et espagnol",
    ],
    appointmentNote:
      "Commencez sur WhatsApp, par téléphone ou avec le formulaire. Nous coordonnons ensuite directement les prochaines étapes avec vous.",
    portfolioText:
      "Découvrez nos réalisations récentes et historiques dans notre portfolio officiel Instagram.",
    reviewsTitle: "Ce que Disent nos Clients sur Google",
    reviewsIntro:
      "Courts extraits d’avis publiés sur notre fiche Google Business actuelle. Suivez la source pour lire chaque avis complet.",
    fiveStarsLabel: "5 étoiles sur 5",
    reviewSource: "Avis sur Google Maps",
    mapsLink: "Voir sur Google Maps",
    reviewLink: "Écrire un avis Google",
    instagramLink: "Voir @sertuinevents",
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
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const prices = packages
    .map((proposalPackage) => Number(proposalPackage.price))
    .filter((price) => Number.isFinite(price));
  const minimumPrice = prices.length ? formatPrice(Math.min(...prices)) : null;
  const maximumPrice = prices.length ? formatPrice(Math.max(...prices)) : null;
  const priceRange =
    minimumPrice && maximumPrice
      ? `${minimumPrice}–${maximumPrice} USD`
      : isPortuguese
        ? "os preços publicados nesta página"
        : isFrench
          ? "les tarifs publiés sur cette page"
          : isSpanish
            ? "los precios publicados en esta página"
            : "the prices published on this page";

  const faqItems = isPortuguese
    ? [
        [
          "Quanto custa um pedido de casamento em Punta Cana?",
          `Os pacotes disponíveis variam de ${priceRange}, conforme a experiência. Cada cartão mostra o preço publicado e os serviços opcionais só são adicionados quando solicitados.`,
        ],
        [
          "O que um pacote de pedido de casamento inclui?",
          "Todo pacote inclui transporte privativo para o casal em Punta Cana, decoração escolhida, buquê, bebida para celebrar, fotografia profissional, música preferida, vídeo vertical pelo celular e coordenação no local. Cada acompanhante adicional custa US$ 20 para transporte; locais externos são cotados conforme acesso e permissões.",
        ],
        [
          "Como reservar meu pedido com a Sertuin Events?",
          "Escolha pacote, data e hospedagem. Após confirmar disponibilidade, enviamos contrato e link seguro do PayPal. O depósito de US$ 200 reserva a data e é descontado do total.",
        ],
        [
          "Onde os pedidos são realizados?",
          "A opção padrão é nossa praia privativa em Uvero Alto. Também trabalhamos em villa, resort, iate ou outro local aprovado quando o cliente obtém acesso e o venue autoriza a montagem.",
        ],
        [
          "O transporte está incluído em toda Punta Cana?",
          "Sim. O preço inclui transporte privativo de ida e volta para o casal desde qualquer hotel ou hospedagem em Punta Cana. Cada acompanhante adicional custa US$ 20, até oito pessoas.",
        ],
        [
          "Quantas fotografias receberemos e quando?",
          "Você recebe mais de 70 fotografias profissionais editadas em alta resolução em até 48 horas por um link permanente do Google Drive.",
        ],
        [
          "O momento do pedido é gravado?",
          "Sim. Gravamos o pedido pelo celular sem custo adicional, mesmo quando o vídeo profissional não é contratado.",
        ],
        [
          "Podemos escolher a música e personalizar a decoração?",
          "Sim. Coordenamos a música preferida e as personalizações solicitadas. A decoração incluída corresponde ao pacote, e flores personalizadas e outros adicionais podem ser solicitados.",
        ],
        [
          "Posso adicionar vídeo, drone ou música ao vivo?",
          "Sim. Conforme disponibilidade, há vídeo profissional com drone, violinista, saxofonista, jantar privativo, faíscas frias e flores personalizadas. Um serviço já incluído no pacote não é cobrado novamente.",
        ],
      ]
    : isFrench
      ? [
          [
            "Combien coûte une demande en mariage à Punta Cana ?",
            `Les forfaits actuellement disponibles vont de ${priceRange}, selon l’expérience choisie. Chaque carte indique le prix publié et les services optionnels ne sont ajoutés que sur demande.`,
          ],
          [
            "Que comprend un forfait de demande en mariage à Punta Cana ?",
            "Chaque forfait comprend le transport privé aller-retour du couple depuis tout hôtel ou hébergement de Punta Cana, le décor choisi, un bouquet, une boisson pour célébrer, la photographie professionnelle, votre musique, une vidéo verticale au téléphone et la coordination sur place. Chaque accompagnant supplémentaire paie 20 USD pour le transport.",
          ],
          [
            "Comment réserver ma demande avec Sertuin Events ?",
            "Choisissez le forfait, la date souhaitée et l’hébergement. Après confirmation de la disponibilité, nous envoyons un contrat écrit et un lien PayPal sécurisé. Un acompte de 200 USD réserve la date et est déduit du total.",
          ],
          [
            "Où ont lieu les demandes ?",
            "L’option standard recommandée est notre plage privée d’Uvero Alto. Nous intervenons aussi dans une villa, un resort, sur un yacht ou dans un autre lieu autorisé lorsque le client obtient l’accès et que le lieu approuve l’installation.",
          ],
          [
            "Le transport est-il inclus depuis toute la zone de Punta Cana ?",
            "Oui. Le prix comprend le transport privé aller-retour du couple depuis tout hôtel ou hébergement de Punta Cana. Chaque accompagnant supplémentaire coûte 20 USD, jusqu’à huit personnes.",
          ],
          [
            "Combien de photos recevrons-nous et quand ?",
            "Vous recevez plus de 70 photos professionnelles retouchées en haute résolution sous 48 heures par lien Google Drive permanent.",
          ],
          [
            "Le moment de la demande est-il filmé ?",
            "Oui. Nous enregistrons la demande au téléphone sans supplément, même si vous ne choisissez pas la vidéographie professionnelle.",
          ],
          [
            "Pouvons-nous choisir la musique et personnaliser le décor ?",
            "Oui. Nous coordonnons votre musique préférée et les personnalisations demandées. La décoration incluse correspond au forfait ; des fleurs sur mesure et d’autres options peuvent être ajoutées.",
          ],
          [
            "Puis-je ajouter une vidéo, un drone ou de la musique en direct ?",
            "Oui. Selon les disponibilités, vous pouvez ajouter une vidéo professionnelle avec drone, un violoniste, un saxophoniste, un dîner privé, des étincelles froides et des fleurs personnalisées. Un service déjà inclus n’est pas facturé une seconde fois.",
          ],
        ]
      : isSpanish
        ? [
            [
              "¿Cuánto cuesta una propuesta de matrimonio en Punta Cana?",
              `Los paquetes disponibles actualmente van de ${priceRange}, según la experiencia seleccionada. El precio de cada tarjeta corresponde al paquete publicado y los servicios opcionales solo se agregan cuando los solicitas.`,
            ],
            [
              "¿Qué incluye un paquete de propuesta de matrimonio en Punta Cana?",
              "Cada paquete incluye transporte privado ida y vuelta para la pareja desde cualquier hotel o alojamiento de Punta Cana, la decoración seleccionada, bouquet, bebida para celebrar, fotografía profesional, tu canción preferida, video vertical de la propuesta grabado con un teléfono y coordinación en el lugar. Cada acompañante adicional paga US$20 por transporte y las locaciones externas se cotizan según acceso y permisos.",
            ],
            [
              "¿Cómo reservo mi propuesta con Sertuin Events?",
              "Elige el paquete, la fecha y el alojamiento. Después de confirmar disponibilidad, enviamos un acuerdo de servicio escrito y un enlace seguro de PayPal. Un depósito de US$200 reserva la fecha, se descuenta del total y el saldo se paga después de la experiencia según el acuerdo.",
            ],
            [
              "¿Dónde se realizan las propuestas?",
              "La opción estándar y recomendada es nuestra playa privada de Uvero Alto. También podemos trabajar en una villa, resort, yate u otra locación aprobada cuando el cliente obtiene el acceso y el lugar autoriza el montaje; esos cargos externos se cotizan aparte.",
            ],
            [
              "¿El transporte está incluido desde cualquier zona de Punta Cana?",
              "Sí. El precio publicado incluye transporte privado ida y vuelta para la pareja desde cualquier hotel o alojamiento de Punta Cana. Cada acompañante adicional paga US$20 por transporte, con un máximo de ocho acompañantes en la van.",
            ],
            [
              "¿Cuántas fotografías recibiremos y cuándo se entregan?",
              "Recibirás más de 70 fotografías profesionales, editadas y en alta resolución dentro de las 48 horas posteriores a la experiencia mediante un enlace permanente de Google Drive.",
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
              "Sí. Según disponibilidad, puedes agregar video profesional con dron por US$399, violinista por US$399, saxofonista por US$399, cena privada para dos por US$299 y flores personalizadas. Las chispas frías cuestan US$150 el par. Un servicio que ya esté incluido en el paquete elegido no se ofrece nuevamente como adicional.",
            ],
          ]
        : [
            [
              "How much does a marriage proposal in Punta Cana cost?",
              `The packages currently available range from ${priceRange}, depending on the experience selected. Each card shows the published package price, and optional services are added only when requested.`,
            ],
            [
              "What does a Punta Cana proposal package include?",
              "Every package includes private round-trip transportation for the couple from any hotel or accommodation in Punta Cana, the selected romantic setup, bouquet, a celebratory beverage, professional photography, your preferred song, a vertical phone recording of the proposal and on-site coordination. Each additional companion costs US$20 for transportation, and external locations are quoted according to access and permits.",
            ],
            [
              "How do I reserve my proposal with Sertuin Events?",
              "Choose your package, preferred date and accommodation. After availability is confirmed, we send a written service agreement and a secure PayPal link. A US$200 deposit reserves the date, is deducted from the total and the remaining balance is paid after the experience according to the agreement.",
            ],
            [
              "Where do the proposals take place?",
              "Our standard and recommended option is the Sertuin Events private beach in Uvero Alto. We can also work at a villa, resort, yacht or another approved location when the client obtains access and the venue permits the setup; external venue charges are quoted separately.",
            ],
            [
              "Is transportation included from every area of Punta Cana?",
              "Yes. The published price includes private round-trip transportation for the couple from any hotel or accommodation throughout Punta Cana. Each additional companion costs US$20 for transportation, with a maximum of eight companions in the van.",
            ],
            [
              "How many photographs will we receive and when are they delivered?",
              "You will receive more than 70 professionally edited, high-resolution photographs within 48 hours after the experience through a permanent Google Drive link.",
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
              "Yes. Depending on availability, you can add professional video with drone coverage for US$399, a violinist for US$399, a saxophonist for US$399, a private dinner for two for US$299 and custom flowers. Cold sparks cost US$150 per pair. A service already included in the selected package is not offered again as an add-on.",
            ],
          ];

  return faqItems.map(([title, content]) => ({
    title,
    content: { content },
  }));
};

const getCopy = (language) =>
  copy[
    language === "es"
      ? "es"
      : language === "pt"
        ? "pt"
        : language === "fr"
          ? "fr"
          : "en-US"
  ];

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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
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
  const contactPath = localizedPath("/contact/", language);

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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-gray-200 mt-12">
          <article className="bg-white p-7 md:p-10 lg:col-span-2">
            <Icon component={Landmark} />
            <h3 className="font-crimson text-2xl text-gray-900 mt-5">
              {content.companyTitle}
            </h3>
            <ul className="space-y-4 mt-6">
              {content.experienceFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 font-crimson text-gray-700 leading-relaxed"
                >
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="w-5 h-5 text-primary-color shrink-0 mt-0.5"
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <p className="font-crimson text-sm text-gray-600 leading-relaxed mt-6">
              {content.appointmentNote}
            </p>
            <p className="font-crimson text-gray-700 leading-relaxed mt-6">
              {content.portfolioText}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5">
              <a
                href={officialInstagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-crimson text-gray-700 underline underline-offset-4"
              >
                <Instagram aria-hidden="true" className="w-5 h-5" />
                {content.instagramLink}
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {content.mapsLink}
              </a>
            </div>
          </article>

          <div className="bg-white p-7 md:p-10 lg:col-span-3">
            <h3 className="font-crimson text-2xl text-gray-900">
              {content.reviewsTitle}
            </h3>
            <p className="font-crimson text-gray-700 leading-relaxed mt-3">
              {content.reviewsIntro}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 mt-7">
              {googleReviewExcerpts.map(({ author, excerpt }) => (
                <article key={author} className="bg-secondary-bg-color p-6">
                  {/* role="img" is required for aria-label to be permitted;
                      on a bare div the implicit generic role discards it. */}
                  <div
                    role="img"
                    aria-label={content.fiveStarsLabel}
                    className="text-primary-color tracking-[0.18em]"
                  >
                    <span aria-hidden="true">★★★★★</span>
                  </div>
                  <blockquote className="font-crimson text-lg text-gray-800 leading-relaxed mt-4">
                    “{excerpt}”
                  </blockquote>
                  <p className="font-crimson text-sm text-gray-600 mt-4">
                    {author}
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block font-crimson text-sm text-gray-700 underline underline-offset-4 mt-2"
                  >
                    {content.reviewSource}
                  </a>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {content.mapsLink}
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="font-crimson text-gray-700 underline underline-offset-4"
              >
                {content.reviewLink}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getProposalCopy = getCopy;
export { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL };
