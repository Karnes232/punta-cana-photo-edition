const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const packages = [
  {
    id: "infinity-love",
    name: "Infinity Love",
    aliases: ["infinity love", "infinity love proposal", "amor infinito"],
    price: 999,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "A warm bronze circular installation with a soft white aisle and a balanced seasonal floral composition.",
        setup: [
          "Large wooden circular structure with a bronze-style finish.",
          "Six matching wooden pedestals: two tall, two medium and two small.",
          "Real-touch flowers in the standard white, green, yellow and peach palette.",
          "Fixed illuminated “Will You Marry Me?” sign and one-piece soft white rug.",
          "Approximately 12 white lanterns with LED candles and transparent floral vessels.",
          "Wooden table with white linen, two wooden chairs, two glasses and a chilled champagne bucket.",
        ],
        exclusions: [
          "Dinner, snacks, plates, cutlery and napkins are not included.",
          "A different floral palette, a different sign and flower petals require a separate quotation.",
        ],
      },
      es: {
        summary:
          "Un montaje circular en tono bronce, con pasillo blanco y una composición floral de temporada equilibrada.",
        setup: [
          "Gran estructura circular de madera con acabado tipo bronce.",
          "Seis pedestales de madera a juego: dos altos, dos medianos y dos pequeños.",
          "Flores Real Touch en la paleta estándar blanca, verde, amarilla y melocotón.",
          "Letrero fijo iluminado “Will You Marry Me?” y alfombra blanca suave de una sola pieza.",
          "Aproximadamente 12 faroles blancos con velas LED y recipientes florales transparentes.",
          "Mesa de madera con mantel blanco, dos sillas de madera, dos copas y champañera fría.",
        ],
        exclusions: [
          "No incluye cena, snacks, platos, cubertería ni servilletas.",
          "Otra paleta floral, un letrero diferente y los pétalos se cotizan por separado.",
        ],
      },
    },
  },
  {
    id: "golden-whisper",
    name: "Golden Whisper",
    aliases: ["golden whisper", "golden wings"],
    price: 1089,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "An elegant gold-ring installation framed by natural pampas and soft pink floral accents.",
        setup: [
          "Thin circular metal structure with a gold finish.",
          "Natural pampas and real-touch roses; the two compositions are decorative and are not intended to represent wings.",
          "Standard beige, gold and pink palette, with two warm uplights.",
          "Fixed “Will You Marry Me?” sign and two individual jute rugs; no white rug is used.",
          "Six black lanterns and approximately 24 LED candles.",
          "Wooden table with white linen, two wooden chairs, two glasses and a chilled champagne bucket.",
        ],
        exclusions: [
          "Dinner, snacks, plates, cutlery and napkins are not included.",
          "Color changes, a different sign and petals require a separate quotation.",
        ],
      },
      es: {
        summary:
          "Un aro dorado elegante enmarcado por pampas naturales y delicados acentos florales rosados.",
        setup: [
          "Estructura circular delgada de metal con acabado dorado.",
          "Pampas naturales y rosas Real Touch; las dos composiciones son decorativas y no representan alas.",
          "Paleta estándar beige, dorada y rosada, con dos luces cálidas ascendentes.",
          "Letrero fijo “Will You Marry Me?” y dos alfombras individuales de yute; no utiliza alfombra blanca.",
          "Seis faroles negros y aproximadamente 24 velas LED.",
          "Mesa de madera con mantel blanco, dos sillas de madera, dos copas y champañera fría.",
        ],
        exclusions: [
          "No incluye cena, snacks, platos, cubertería ni servilletas.",
          "Los cambios de color, otro letrero y los pétalos se cotizan por separado.",
        ],
      },
    },
  },
  {
    id: "amour-essence",
    name: "Amour Essence",
    aliases: ["amour essence", "amorisense", "amor essence"],
    price: 1099,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "Two sculptural wooden frames create a dramatic red-and-green setting for the reveal.",
        setup: [
          "Two independent polished-brown wooden structures positioned opposite one another.",
          "Real-touch red roses with artificial foliage in the standard red-and-green palette.",
          "Fixed “Will You Marry Me?” sign, two jute rugs and two warm uplights.",
          "Six black lanterns with LED candles.",
          "Wooden table with white linen, two wooden chairs, two glasses and a chilled champagne bucket.",
          "The floral distribution may vary slightly while preserving the same visual volume.",
        ],
        exclusions: [
          "Dinner, snacks, plates, cutlery and napkins are not included.",
          "Color changes, a different sign and petals require a separate quotation.",
        ],
      },
      es: {
        summary:
          "Dos estructuras escultóricas de madera crean un escenario rojo y verde de gran impacto para la revelación.",
        setup: [
          "Dos estructuras independientes de madera pulida color marrón, colocadas una frente a la otra.",
          "Rosas rojas Real Touch y follaje artificial en la paleta estándar roja y verde.",
          "Letrero fijo “Will You Marry Me?”, dos alfombras de yute y dos luces cálidas ascendentes.",
          "Seis faroles negros con velas LED.",
          "Mesa de madera con mantel blanco, dos sillas de madera, dos copas y champañera fría.",
          "La distribución floral puede variar ligeramente manteniendo el mismo volumen visual.",
        ],
        exclusions: [
          "No incluye cena, snacks, platos, cubertería ni servilletas.",
          "Los cambios de color, otro letrero y los pétalos se cotizan por separado.",
        ],
      },
    },
  },
  {
    id: "sign-of-love",
    name: "Sign of Love",
    aliases: ["sign of love", "sign of love proposal", "signo de amor"],
    price: 1169,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "Oversized illuminated MARRY ME letters and a deep-red velvet aisle create a bold, cinematic reveal.",
        setup: [
          "White wooden MARRY ME letters approximately one metre tall, with warm bulbs illuminated throughout the experience.",
          "One-piece red velvet rug bordered by approximately 200 real-touch red roses.",
          "Approximately 24 white lanterns with LED candles.",
          "Standard red-and-white palette; the rose distribution may vary slightly while preserving the visual standard.",
          "Bare wooden table, two wooden chairs, two glasses, champagne bucket and a small floral centrepiece.",
        ],
        exclusions: [
          "Loose petals and the petal toss shown in some photographs are optional additions.",
          "Dinner, snacks, plates, cutlery and napkins are not included.",
        ],
      },
      es: {
        summary:
          "Letras MARRY ME de gran formato y un pasillo rojo aterciopelado crean una revelación intensa y cinematográfica.",
        setup: [
          "Letras MARRY ME de madera blanca de aproximadamente un metro de altura, con bombillas cálidas encendidas durante la experiencia.",
          "Alfombra roja aterciopelada de una sola pieza, bordeada por aproximadamente 200 rosas rojas Real Touch.",
          "Aproximadamente 24 faroles blancos con velas LED.",
          "Paleta estándar roja y blanca; la distribución de las rosas puede variar ligeramente conservando el estándar visual.",
          "Mesa de madera sin mantel, dos sillas de madera, dos copas, champañera y pequeño centro floral.",
        ],
        exclusions: [
          "Los pétalos sueltos y el lanzamiento de pétalos que aparece en algunas fotografías son adicionales.",
          "No incluye cena, snacks, platos, cubertería ni servilletas.",
        ],
      },
    },
  },
  {
    id: "amour-by-the-sea",
    name: "Amour by the Sea",
    aliases: ["amour by the sea", "a moment by the sea"],
    price: 1189,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "A floral heart, crystal-detailed gold pedestals and a soft white aisle create a refined coastal setting.",
        setup: [
          "Metal heart structure covered in real-touch flowers, including the floral arrangements at its base.",
          "Standard white, pale-pink and green palette; floral placement may vary while preserving the volume.",
          "Fixed “Will You Marry Me?” sign and one-piece soft white rug.",
          "Gold metal pedestals with hanging crystal strands and real-touch floral arrangements.",
          "Approximately 24 white lanterns with LED candles.",
          "Table with white linen, two upholstered chairs, two glasses, champagne bucket and floral centrepiece.",
        ],
        exclusions: [
          "Petals and small personal items visible in some photographs are not included.",
          "Dinner, snacks, plates, cutlery and napkins are not included.",
        ],
      },
      es: {
        summary:
          "Un corazón floral, pedestales dorados con cristales y un pasillo blanco suave crean un escenario costero refinado.",
        setup: [
          "Estructura de corazón en metal cubierta de flores Real Touch, incluidos los arreglos de su base.",
          "Paleta estándar blanca, rosa pálido y verde; la colocación floral puede variar conservando el volumen.",
          "Letrero fijo “Will You Marry Me?” y alfombra blanca suave de una sola pieza.",
          "Pedestales metálicos dorados con cadenas de cristales y arreglos florales Real Touch.",
          "Aproximadamente 24 faroles blancos con velas LED.",
          "Mesa con mantel blanco, dos sillas tapizadas, dos copas, champañera y centro floral.",
        ],
        exclusions: [
          "Los pétalos y pequeños objetos personales visibles en algunas fotografías no están incluidos.",
          "No incluye cena, snacks, platos, cubertería ni servilletas.",
        ],
      },
    },
  },
  {
    id: "coral-passion",
    name: "Coral Passion",
    aliases: ["coral passion"],
    price: 1199,
    coldSparks: true,
    charcuterieIncluded: true,
    copy: {
      en: {
        summary:
          "A red-lit circular platform and four gold frames create a modern, immersive proposal setting.",
        setup: [
          "Single-level circular metal platform with integrated red LED underlighting.",
          "Approximately four rectangular gold metal structures with real-touch red flowers and artificial foliage.",
          "Fixed “Will You Marry Me?” sign, approximately 36 LED candles and two woven rattan-style lamps.",
          "Wooden table with metal base and linen, plus two beige metal chairs with beige cushions.",
          "Two glasses, chilled champagne bucket and floral centrepiece.",
          "A shared charcuterie board for two with cold cuts, seasonal cheeses and fruits, nuts and olives; ingredients may vary by season in an equivalent quantity.",
        ],
        exclusions: [
          "Petals are not included; the red glow around the platform is its integrated lighting.",
          "The charcuterie service uses toothpicks and napkins and does not include plates or cutlery.",
        ],
      },
      es: {
        summary:
          "Una plataforma circular iluminada en rojo y cuatro marcos dorados crean un escenario moderno y envolvente.",
        setup: [
          "Plataforma circular de metal, de un solo nivel, con iluminación LED roja integrada en su base.",
          "Aproximadamente cuatro estructuras rectangulares metálicas doradas con flores rojas Real Touch y follaje artificial.",
          "Letrero fijo “Will You Marry Me?”, aproximadamente 36 velas LED y dos lámparas de tejido tipo ratán.",
          "Mesa de madera con base metálica y mantelería, más dos sillas metálicas beige con cojines beige.",
          "Dos copas, champañera fría y centro floral.",
          "Tabla de charcutería compartida para dos con embutidos, quesos y frutas de temporada, frutos secos y olivas; los ingredientes pueden variar manteniendo una cantidad equivalente.",
        ],
        exclusions: [
          "No incluye pétalos; el borde rojo alrededor de la plataforma es su iluminación integrada.",
          "La charcutería se sirve con palillos y servilletas, sin platos ni cubertería.",
        ],
      },
    },
  },
  {
    id: "romantic-hoopa",
    name: "Romantic Hoopa",
    aliases: [
      "romantic hoopa",
      "romantic huppa",
      "romantic huppa proposal",
      "juppa romantica",
      "huppa romantica",
    ],
    price: 1239,
    coldSparks: true,
    charcuterieIncluded: true,
    copy: {
      en: {
        summary:
          "A natural wooden canopy with voile curtains and warm micro-lights creates an intimate beach room.",
        setup: [
          "Four-post wooden structure with a natural finish, white translucent voile curtains and integrated warm micro-lights.",
          "Fixed “Will You Marry Me?” sign and one-piece soft white rug.",
          "Approximately six entrance floral groups using real-touch white flowers and artificial green foliage.",
          "Tall transparent glass cylinders, approximately 12 white lanterns with LED candles and tall slim LED candles.",
          "Small crossed-leg wooden table without linen, two folding wooden chairs, two glasses, champagne bucket and small floral centrepiece.",
          "Shared charcuterie board for two under the same seasonal and dietary rules as Coral Passion.",
        ],
        exclusions: [
          "The red bouquet shown in some photographs belonged to that client and is not a fixed décor element.",
          "The charcuterie includes toothpicks and napkins, not plates or cutlery.",
        ],
      },
      es: {
        summary:
          "Una estructura natural de madera con visillos y microluces cálidas crea una habitación íntima sobre la playa.",
        setup: [
          "Estructura de madera de cuatro postes con acabado natural, visillos blancos translúcidos y microluces cálidas integradas.",
          "Letrero fijo “Will You Marry Me?” y alfombra blanca suave de una sola pieza.",
          "Aproximadamente seis grupos florales de entrada con flores blancas Real Touch y follaje verde artificial.",
          "Cilindros altos de cristal transparente, aproximadamente 12 faroles blancos con velas LED y velas LED altas y delgadas.",
          "Mesa pequeña de madera con patas cruzadas y sin mantel, dos sillas plegables de madera, dos copas, champañera y pequeño centro floral.",
          "Tabla de charcutería compartida para dos bajo las mismas reglas estacionales y alimentarias de Coral Passion.",
        ],
        exclusions: [
          "El ramo rojo visible en algunas fotografías pertenecía a esa cliente y no forma parte fija de la decoración.",
          "La charcutería incluye palillos y servilletas, no platos ni cubertería.",
        ],
      },
    },
  },
  {
    id: "white-serenity",
    name: "White Serenity",
    aliases: ["white serenity", "white serenity proposal", "esencia de calma"],
    price: 1389,
    coldSparks: true,
    charcuterieIncluded: true,
    copy: {
      en: {
        summary:
          "A low white floral crescent set directly into the sand creates a serene, organic ceremony space.",
        setup: [
          "U-shaped floral composition supported by hidden metal rods or a wooden base beneath the sand.",
          "Approximately six large real-touch white floral bunches joined by individual flowers and subtle green accents.",
          "One-piece soft white rug and approximately six glass cylinders filled with sand and flowers.",
          "Approximately 12 tall slim LED candles in transparent holders and 36 cylindrical LED candles placed directly in the sand.",
          "White wooden-top table with metal structure, two beige upholstered chairs and cushions, two glasses, champagne bucket and floral centrepiece.",
          "Shared charcuterie board for two under the same seasonal and dietary rules as Coral Passion.",
        ],
        exclusions: [
          "This setup does not include a sign or lanterns.",
          "Petals, plates and cutlery are not included.",
        ],
      },
      es: {
        summary:
          "Una composición floral blanca y baja, colocada directamente en la arena, crea un espacio sereno y orgánico.",
        setup: [
          "Composición floral en forma de U sostenida por varillas metálicas o una base de madera oculta bajo la arena.",
          "Aproximadamente seis grandes grupos de flores blancas Real Touch, unidos con flores individuales y pequeños acentos verdes.",
          "Alfombra blanca suave de una sola pieza y aproximadamente seis cilindros de cristal rellenos de arena y flores.",
          "Aproximadamente 12 velas LED altas y delgadas en portavelas transparentes y 36 velas LED cilíndricas colocadas directamente en la arena.",
          "Mesa blanca con tope de madera y estructura metálica, dos sillas tapizadas beige con cojines, dos copas, champañera y centro floral.",
          "Tabla de charcutería compartida para dos bajo las mismas reglas estacionales y alimentarias de Coral Passion.",
        ],
        exclusions: [
          "Este montaje no incluye letrero ni faroles.",
          "No incluye pétalos, platos ni cubertería.",
        ],
      },
    },
  },
  {
    id: "romantic-dinner-marriage-proposal",
    name: "Romantic Dinner Marriage Proposal",
    aliases: ["romantic dinner marriage proposal"],
    price: 1399,
    dinnerIncluded: true,
    coldSparks: false,
    copy: {
      en: {
        summary:
          "A private palm-roof gazebo combines an elegant floral proposal with a fully served three-course dinner.",
        setup: [
          "Permanent white-painted wooden gazebo with a natural palm-leaf roof, reserved exclusively for the couple.",
          "Large wooden floral circle with real-touch white and cream flowers and subtle green accents.",
          "Fixed “Will You Marry Me?” sign, approximately 50 cylindrical LED candles and 12 white lanterns with LED candles.",
          "Six large glass cylinders filled with water; they do not contain floating candles.",
          "Wooden tabletop with black metal base and two brown upholstered chairs.",
          "Complete table setting with plates, full cutlery, napkins, champagne and wine glasses, water glasses and floral centrepiece.",
          "Three-course dinner for two, prepared in the on-property kitchen by a professional chef and served by a dedicated waiter.",
        ],
        exclusions: [
          "Cold sparks are unavailable because the natural palm roof makes them unsafe.",
          "No appetizer, bread or charcuterie is served before the selected starter.",
        ],
      },
      es: {
        summary:
          "Un gazebo privado con techo de palma combina una propuesta floral elegante con una cena completa de tres tiempos.",
        setup: [
          "Gazebo permanente de madera pintada de blanco y techo de hojas de palma natural, reservado exclusivamente para la pareja.",
          "Gran círculo floral de madera con flores Real Touch blancas y crema y pequeños acentos verdes.",
          "Letrero fijo “Will You Marry Me?”, aproximadamente 50 velas LED cilíndricas y 12 faroles blancos con velas LED.",
          "Seis cilindros grandes de cristal llenos de agua; no contienen velas flotantes.",
          "Mesa con tope de madera y base metálica negra, más dos sillas tapizadas marrones.",
          "Mesa completa con platos, cubertería, servilletas, copas de champaña y vino, vasos de agua y centro floral.",
          "Cena de tres tiempos para dos, preparada en la cocina de la propiedad por un chef profesional y servida por un camarero dedicado.",
        ],
        exclusions: [
          "Las chispas frías no están disponibles porque el techo natural de palma hace inseguro su uso.",
          "No se sirve aperitivo, pan ni charcutería antes de la entrada seleccionada.",
        ],
      },
    },
  },
  {
    id: "cozy-love",
    name: "Cozy Love",
    aliases: ["cozy love"],
    price: 1489,
    dinnerIncluded: true,
    violinIncluded: true,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "A gold open gazebo, warm woven details, dinner and live violin create a complete intimate celebration.",
        setup: [
          "Gold metal open-gazebo structure with three posts—two at the sides and one at the rear—and oval upper rings.",
          "Natural pampas, real-touch pink and white flowers and artificial foliage in a beige, pale-pink, white and green palette.",
          "Standard illuminated “It Was Always You” sign with heart; “Will You Marry Me?” may be substituted at no charge.",
          "Central woven rattan-style lamp and one-piece rectangular jute rug.",
          "Round wooden-top table with a woven rope base that may vary, plus two beige upholstered chairs.",
          "Complete dinner table setting, 8 black lanterns and approximately 12–18 glass cylinders with LED candles.",
          "Three-course dinner for two and an amplified 45-minute live violin set.",
        ],
        exclusions: [
          "A sign other than the two included choices and changes to the standard floral palette require a quotation.",
          "The violinist is already included and is therefore not offered as an add-on.",
        ],
      },
      es: {
        summary:
          "Un gazebo abierto dorado, detalles tejidos, cena y violín en vivo crean una celebración íntima completa.",
        setup: [
          "Estructura abierta tipo gazebo en metal dorado con tres postes —dos laterales y uno trasero— y aros superiores ovalados.",
          "Pampas naturales, flores rosadas y blancas Real Touch y follaje artificial en una paleta beige, rosa pálido, blanca y verde.",
          "Letrero iluminado estándar “It Was Always You” con corazón; puede sustituirse por “Will You Marry Me?” sin costo.",
          "Lámpara central de tejido tipo ratán y alfombra rectangular de yute de una sola pieza.",
          "Mesa redonda con tope de madera y base tejida en soga que puede variar, más dos sillas tapizadas beige.",
          "Mesa completa para la cena, ocho faroles negros y aproximadamente 12–18 cilindros de cristal con velas LED.",
          "Cena de tres tiempos para dos y presentación amplificada de violín en vivo durante 45 minutos.",
        ],
        exclusions: [
          "Otro letrero diferente a las dos opciones incluidas y los cambios de paleta floral requieren cotización.",
          "El violinista ya está incluido y por eso no aparece como adicional.",
        ],
      },
    },
  },
  {
    id: "eternal-passion",
    name: "Eternal Passion",
    aliases: ["eternal passion", "pasion eterna"],
    price: 1799,
    violinIncluded: true,
    coldSparks: true,
    copy: {
      en: {
        summary:
          "A dramatic asymmetrical harp-shaped installation in red and white, accompanied by live violin.",
        setup: [
          "Asymmetrical harp-shaped metal structure with translucent voile and warm LED lighting inside.",
          "Real-touch red flowers and artificial foliage in the standard red-and-white palette.",
          "Fixed “Will You Marry Me?” sign and one-piece red velvet rug.",
          "Six white ceramic vases with floral arrangements and approximately 24 transparent cylinders with LED candles.",
          "Round white-top table with a gold metal base and two upholstered chairs with gold frames.",
          "Two glasses, chilled champagne bucket and floral centrepiece.",
          "Amplified 45-minute live violin set during the arrival, reveal and proposal.",
        ],
        exclusions: [
          "Lanterns and a path of roses or petals are not included; petals are quoted separately.",
          "Without the dinner add-on, food, plates, cutlery and napkins are not included.",
        ],
      },
      es: {
        summary:
          "Una impactante instalación asimétrica con forma de arpa, en rojo y blanco, acompañada por violín en vivo.",
        setup: [
          "Estructura metálica asimétrica con forma de arpa, visillo translúcido e iluminación LED cálida en su interior.",
          "Flores rojas Real Touch y follaje artificial en la paleta estándar roja y blanca.",
          "Letrero fijo “Will You Marry Me?” y alfombra roja aterciopelada de una sola pieza.",
          "Seis jarrones blancos de cerámica con arreglos florales y aproximadamente 24 cilindros transparentes con velas LED.",
          "Mesa redonda con tope blanco y base metálica dorada, más dos sillas tapizadas con estructura dorada.",
          "Dos copas, champañera fría y centro floral.",
          "Presentación amplificada de violín en vivo durante 45 minutos, durante la llegada, revelación y propuesta.",
        ],
        exclusions: [
          "No incluye faroles ni camino de rosas o pétalos; los pétalos se cotizan por separado.",
          "Sin agregar la cena, no incluye alimentos, platos, cubertería ni servilletas.",
        ],
      },
    },
  },
];

const packageById = new Map(packages.map((item) => [item.id, item]));

const findPackage = (values) => {
  const candidates = values.map(normalize).filter(Boolean);

  return packages.find((item) => {
    const aliases = [item.id, ...item.aliases].map(normalize);
    return candidates.some((candidate) => aliases.includes(candidate));
  });
};

export const getProposalPackageDetails = (
  packageInformation,
  language = "en-US",
) => {
  const packageData = packageInformation?.packages?.[0] || {};
  const item = findPackage([
    packageInformation?.urlSlug,
    packageInformation?.heroHeading,
    packageData?.title,
  ]);

  if (!item) return null;

  return {
    ...item,
    content: item.copy[language === "es" ? "es" : "en"],
  };
};

export const getProposalPackageDetailsFromCard = (card) =>
  findPackage([card?.title, card?.link, card?.packagePage?.urlSlug]);

export const getProposalPackageById = (id) => packageById.get(id) || null;

export const proposalPackageDetails = packages;
