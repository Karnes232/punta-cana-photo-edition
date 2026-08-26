import React from "react";
import { Link } from "gatsby";
import {
  Camera,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Flower2,
  GlassWater,
  MapPin,
  Music2,
  Smartphone,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";

const copy = {
  en: {
    breadcrumbLabel: "Package navigation",
    breadcrumbHome: "Home",
    breadcrumbProposals: "Marriage proposal packages",
    eyebrow: "Exactly what you are booking",
    basePrice: "Base price",
    priceNote:
      "US$200 deposit and remaining balance in cash after the experience",
    quickTitle: "Essentials included",
    setupDetailsLabel: "See the setup and specific inclusions",
    completeInfoLabel: "See logistics, payments and policies",
    specialTitle: "Included especially with this package",
    setupTitle: "The setup",
    setupIntro:
      "The photographed design and every element listed below are part of the standard package. Minor placement variations may occur without reducing the promised visual volume.",
    commonTitle: "Included in the published price",
    commonIntro:
      "These services are included with every beach proposal package unless a package explicitly states otherwise.",
    exclusionsTitle: "Not included in the base package",
    charcuterieTitle: "Charcuterie for two included",
    charcuterieText:
      "One shared board with cold cuts, seasonal cheeses and fruit, nuts and olives. Ingredients may vary by season while preserving an equivalent quantity. Vegetarian, allergy and dietary adaptations are available without an extra charge when requested in advance. Toothpicks and napkins are included; plates and cutlery are not.",
    charcuterieShort: "A seasonal shared charcuterie board for two.",
    dinnerTitle: "Private three-course dinner for two included",
    dinnerText:
      "Each guest independently chooses one starter, one main course and one dessert. The dinner includes water, one 750 ml sparkling wine and one additional 750 ml bottle of red or white wine. It is prepared by a professional chef in the property kitchen and served by a dedicated waiter after the proposal and the first photographs. Menu choices may be made later and modified up to 48 hours before the experience.",
    dinnerShort: "A private, fully served three-course dinner for two.",
    violinTitle: "Live violin included",
    violinText:
      "An amplified 45-minute violin set accompanies the arrival, reveal and proposal. Special songs must be requested at least two weeks in advance so the artist can prepare them.",
    violinShort: "An amplified 45-minute live violin performance.",
    importantTitle: "Important booking conditions",
    importantIntro:
      "Clear operating and payment rules protect the timing, privacy and quality of your experience.",
    bookLabel: "Select add-ons and request the date",
    common: [
      [
        CarFront,
        "Private transportation for the couple",
        "Round-trip pickup for two from any hotel, Airbnb or villa in Cap Cana, Punta Cana Resort, El Cortecito, Bávaro, Verón, Macao or Uvero Alto. Miches is quoted separately.",
      ],
      [
        Clock3,
        "90–120 minutes on the beach",
        "The experience lasts a maximum of two hours at the beach; transportation time is not deducted from that duration.",
      ],
      [
        MapPin,
        "Low-traffic private beach",
        "The setup is reserved for the couple at our beach in Uvero Alto, close to Excellence Punta Cana. A nearby bathroom has running water, a sink, toilet and mirror.",
      ],
      [
        Camera,
        "More than 70 professional photographs",
        "Professionally corrected high-resolution JPG files are delivered within 48 hours through a permanent Google Drive link. RAW files are free on request.",
      ],
      [
        Smartphone,
        "Immediate vertical phone video",
        "A 3–5 minute vertical recording of the reveal, ring and celebration is included unless you ask us not to record it. Phone photos and video are normally shared before departure.",
      ],
      [
        Flower2,
        "Natural seasonal bouquet",
        "The included bouquet uses fresh seasonal flowers available on the date. A florist-made bouquet with specific flowers or inspiration design is quoted separately.",
      ],
      [
        GlassWater,
        "Sparkling wine and service",
        "One chilled 750 ml bottle, two glasses and service are included. A non-alcoholic substitute is available on request.",
      ],
      [
        Music2,
        "Your preferred music",
        "Your song or playlist can play through the sound system throughout the experience. Send it with the agreement or one to two days before the date.",
      ],
      [
        UsersRound,
        "Dedicated on-site team",
        "A coordinator guides the cover story, blindfolded arrival, positioning and reveal while the operations team monitors every detail.",
      ],
    ],
    conditions: [
      "A US$200 deposit and signed agreement reserve the date. The deposit is fully deducted from the package price and carries no tax or electronic-processing fee.",
      "The remaining balance is paid after the experience, before the return trip. The published price assumes cash payment in USD, DOP or GBP.",
      "An electronic balance payment adds 18% ITBIS and a 10% electronic-processing charge, calculated only on the outstanding balance.",
      "The couple must be ready 10 minutes before pickup. Every minute of client-caused delay is deducted from beach time; the driver waits a maximum of 30 minutes.",
      "The van holds 10 people. The couple is included and each additional passenger costs US$20 for transportation only, up to eight companions.",
      "Weather is monitored before setup. The included covered Plan B preserves the same décor and services; an alternative date may also be arranged. If the company must cancel, all money paid is returned within one week.",
      "The deposit is non-refundable for a client cancellation. A date change preserves it when an alternative date is available; at least two weeks’ notice is recommended.",
      "The setup area is reserved for the couple, but the first 60 metres of shoreline remain public under Dominican law. The beach is normally very quiet and the team actively protects the couple’s privacy.",
      "The sandy access is not recommended for reduced mobility, although the team will assist throughout the experience. Staying at the shoreline is permitted; swimming during the event is not recommended.",
    ],
  },
  es: {
    breadcrumbLabel: "Navegación del paquete",
    breadcrumbHome: "Inicio",
    breadcrumbProposals: "Paquetes de propuestas de matrimonio",
    eyebrow: "Exactamente lo que estás reservando",
    basePrice: "Precio base",
    priceNote:
      "Depósito de US$200 y saldo restante en efectivo después de la experiencia",
    quickTitle: "Lo esencial incluido",
    setupDetailsLabel: "Ver montaje e inclusiones específicas",
    completeInfoLabel: "Ver logística, pagos y políticas",
    specialTitle: "Incluido especialmente en este paquete",
    setupTitle: "El montaje",
    setupIntro:
      "El diseño fotografiado y cada elemento descrito a continuación forman parte del paquete estándar. Puede haber pequeños cambios de ubicación sin reducir el volumen visual prometido.",
    commonTitle: "Incluido en el precio publicado",
    commonIntro:
      "Estos servicios están incluidos en todos los paquetes de propuesta en la playa, salvo que un paquete indique expresamente lo contrario.",
    exclusionsTitle: "No incluido en el paquete base",
    charcuterieTitle: "Charcutería para dos incluida",
    charcuterieText:
      "Una tabla compartida con embutidos, quesos y frutas de temporada, frutos secos y olivas. Los ingredientes pueden variar según la temporada manteniendo una cantidad equivalente. Puede adaptarse gratuitamente para vegetarianos, alergias o restricciones alimentarias si se solicita con anticipación. Incluye palillos y servilletas; no incluye platos ni cubertería.",
    charcuterieShort:
      "Tabla de charcutería de temporada para compartir entre dos.",
    dinnerTitle: "Cena privada de tres tiempos para dos incluida",
    dinnerText:
      "Cada integrante elige independientemente una entrada, un plato fuerte y un postre. La cena incluye agua, una botella de vino espumante de 750 ml y una botella adicional de vino tinto o blanco de 750 ml. Un chef profesional la prepara en la cocina de la propiedad y un camarero dedicado la sirve después de la propuesta y las primeras fotografías. El menú puede elegirse posteriormente y modificarse hasta 48 horas antes.",
    dinnerShort: "Cena privada de tres tiempos con servicio completo para dos.",
    violinTitle: "Violín en vivo incluido",
    violinText:
      "Una presentación amplificada de violín de 45 minutos acompaña la llegada, la revelación y la propuesta. Las canciones especiales deben solicitarse con al menos dos semanas de anticipación para que el artista pueda prepararlas.",
    violinShort:
      "Presentación amplificada de violín en vivo durante 45 minutos.",
    importantTitle: "Condiciones importantes de la reserva",
    importantIntro:
      "Reglas operativas y de pago claras protegen el tiempo, la privacidad y la calidad de la experiencia.",
    bookLabel: "Elegir adicionales y solicitar la fecha",
    common: [
      [
        CarFront,
        "Transporte privado para la pareja",
        "Recogida y regreso para dos desde cualquier hotel, Airbnb o villa de Cap Cana, Punta Cana Resort, El Cortecito, Bávaro, Verón, Macao o Uvero Alto. Miches se cotiza aparte.",
      ],
      [
        Clock3,
        "De 90 a 120 minutos en la playa",
        "La experiencia dura un máximo de dos horas en la playa; el tiempo de transporte no se descuenta de esa duración.",
      ],
      [
        MapPin,
        "Playa privada de poca concurrencia",
        "El montaje se reserva para la pareja en nuestra playa de Uvero Alto, próxima al Excellence Punta Cana. Hay un baño cercano con agua, lavabo, inodoro y espejo.",
      ],
      [
        Camera,
        "Más de 70 fotografías profesionales",
        "Los JPG en alta resolución, corregidos profesionalmente, se entregan dentro de 48 horas mediante un enlace permanente de Google Drive. Los RAW son gratuitos si se solicitan.",
      ],
      [
        Smartphone,
        "Video vertical inmediato con teléfono",
        "Se incluye una grabación vertical de 3 a 5 minutos de la revelación, el anillo y la celebración, salvo que solicites no grabarla. Las fotos y el video del teléfono normalmente se comparten antes de salir.",
      ],
      [
        Flower2,
        "Bouquet natural de temporada",
        "El bouquet incluido utiliza flores naturales frescas disponibles en la fecha. Un ramo elaborado por florista con flores específicas o diseño de inspiración se cotiza aparte.",
      ],
      [
        GlassWater,
        "Vino espumante y servicio",
        "Incluye una botella fría de 750 ml, dos copas y servicio. Puede sustituirse por una bebida sin alcohol.",
      ],
      [
        Music2,
        "Tu música preferida",
        "La canción o playlist puede reproducirse en la bocina durante toda la experiencia. Envíala con el contrato o uno o dos días antes.",
      ],
      [
        UsersRound,
        "Equipo dedicado en el lugar",
        "Una coordinadora guía la historia de cobertura, la llegada con venda, la posición y la revelación mientras el equipo operativo vigila cada detalle.",
      ],
    ],
    conditions: [
      "Un depósito de US$200 y el contrato firmado reservan la fecha. El depósito se descuenta por completo del paquete y no paga impuestos ni comisión electrónica.",
      "El saldo se paga después de la experiencia y antes del regreso. El precio publicado supone pago en efectivo en USD, DOP o GBP.",
      "El pago electrónico del saldo añade 18% de ITBIS y 10% de procesamiento electrónico, calculados únicamente sobre el saldo pendiente.",
      "La pareja debe estar lista 10 minutos antes. Cada minuto de retraso causado por el cliente se descuenta del tiempo en la playa; el chofer espera un máximo de 30 minutos.",
      "La van admite 10 personas. La pareja está incluida y cada pasajero adicional paga US$20 únicamente por transporte, hasta ocho acompañantes.",
      "El clima se vigila antes del montaje. El Plan B techado mantiene la misma decoración y servicios sin costo; también puede coordinarse otra fecha. Si la empresa debe cancelar, devuelve todo lo pagado dentro de una semana.",
      "El depósito no es reembolsable si el cliente cancela. Un cambio de fecha lo conserva cuando existe otra fecha disponible; se recomienda avisar con al menos dos semanas.",
      "La zona del montaje se reserva para la pareja, pero los primeros 60 metros de costa son públicos por ley dominicana. La playa normalmente tiene muy poca concurrencia y el equipo protege activamente la privacidad.",
      "El acceso sobre arena no se recomienda para movilidad reducida, aunque el equipo brindará asistencia durante toda la experiencia. Se puede permanecer en la orilla; no se recomienda bañarse durante el evento.",
    ],
  },
};

const DetailIcon = ({ icon: Icon }) => (
  <Icon
    aria-hidden="true"
    strokeWidth={1.4}
    className="h-6 w-6 shrink-0 text-primary-color"
  />
);

const ProposalPackageDetails = ({ details, language }) => {
  const isSpanish = language === "es";
  const content = copy[isSpanish ? "es" : "en"];
  const homePath = isSpanish ? "/es/" : "/";
  const proposalPath = isSpanish ? "/es/proposal/" : "/proposal/";

  if (!details) return null;

  const quickInclusions = [0, 1, 3, 4, 5, 6].map(
    (index) => content.common[index],
  );
  const specialInclusions = [
    details.charcuterieIncluded && {
      icon: UtensilsCrossed,
      title: content.charcuterieTitle,
      short: content.charcuterieShort,
      description: content.charcuterieText,
    },
    details.dinnerIncluded && {
      icon: UtensilsCrossed,
      title: content.dinnerTitle,
      short: content.dinnerShort,
      description: content.dinnerText,
    },
    details.violinIncluded && {
      icon: Music2,
      title: content.violinTitle,
      short: content.violinShort,
      description: content.violinText,
    },
  ].filter(Boolean);

  const handleBookingClick = (event) => {
    const bookingSection = document.getElementById("package-booking");
    if (!bookingSection) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    bookingSection.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="bg-secondary-bg-color">
      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <nav aria-label={content.breadcrumbLabel} className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link
                to={homePath}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary-color"
              >
                {content.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li>
              <Link
                to={proposalPath}
                className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-primary-color"
              >
                {content.breadcrumbProposals}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li aria-current="page" className="text-gray-800">
              {details.name}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-8 border-b border-stone-200 pb-9 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="font-crimson text-xs uppercase tracking-[0.24em] text-gray-500 md:text-sm">
              {content.eyebrow}
            </p>
            <p className="mt-3 font-crimson text-xl leading-relaxed text-gray-700 md:text-2xl">
              {details.content.summary}
            </p>
          </div>
          <div className="lg:min-w-72 lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {content.basePrice}
            </p>
            <p className="mt-1 font-crimson text-4xl text-gray-950 md:text-5xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(details.price)}
            </p>
            <p className="mt-2 text-sm text-gray-600">{content.priceNote}</p>
            <a
              href="#package-booking"
              aria-controls="packageForm"
              onClick={handleBookingClick}
              className="mt-5 inline-flex rounded-full bg-black px-6 py-3 font-crimson text-white no-underline transition-colors hover:bg-primary-color"
            >
              {content.bookLabel}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-crimson text-2xl font-normal text-gray-900 md:text-3xl">
            {content.quickTitle}
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickInclusions.map(([icon, title]) => (
              <li
                key={title}
                className="flex items-center gap-3 font-crimson text-lg text-gray-800"
              >
                <DetailIcon icon={icon} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        {specialInclusions.length > 0 && (
          <div className="mt-7 border-l-2 border-primary-color bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
              {content.specialTitle}
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {specialInclusions.map(({ icon, title, short }) => (
                <div key={title} className="flex items-start gap-3">
                  <DetailIcon icon={icon} />
                  <div>
                    <h3 className="font-crimson text-xl text-gray-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {short}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <details className="group border border-stone-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-crimson text-xl text-gray-900 md:px-6">
              <span>{content.setupDetailsLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="border-t border-stone-200 px-5 py-6 md:px-6">
              <h2 className="font-crimson text-2xl text-gray-900">
                {content.setupTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {content.setupIntro}
              </p>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {details.content.setup.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-crimson text-base leading-relaxed text-gray-700"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-primary-color"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {specialInclusions.length > 0 && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {specialInclusions.map(({ title, description }) => (
                    <div key={title} className="bg-stone-50 p-4">
                      <h3 className="font-crimson text-lg text-gray-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {details.content.exclusions?.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <h3 className="font-crimson text-xl text-gray-900">
                    {content.exclusionsTitle}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600">
                    {details.content.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>

          <details className="group border border-stone-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-crimson text-xl text-gray-900 md:px-6">
              <span>{content.completeInfoLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="grid gap-8 border-t border-stone-200 px-5 py-6 lg:grid-cols-2 md:px-6">
              <div>
                <h2 className="font-crimson text-2xl text-gray-900">
                  {content.commonTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {content.commonIntro}
                </p>
                <div className="mt-5 space-y-4">
                  {content.common.map(([icon, title, description]) => (
                    <div key={title} className="flex items-start gap-3">
                      <DetailIcon icon={icon} />
                      <div>
                        <h3 className="font-crimson text-lg text-gray-900">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-crimson text-2xl text-gray-900">
                  {content.importantTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {content.importantIntro}
                </p>
                <ul className="mt-5 space-y-3">
                  {content.conditions.map((condition) => (
                    <li
                      key={condition}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-primary-color"
                      />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default ProposalPackageDetails;
