const asFaqs = (items) =>
  items.map(([title, content]) => ({ title, content: { content } }));

export const buildProposalPackageFaqs = ({ language, details }) => {
  const isSpanish = language === "es";
  const dinnerAnswer = details?.dinnerIncluded
    ? isSpanish
      ? "La cena de tres tiempos para dos ya está incluida. Cada persona puede elegir una entrada, un plato fuerte y un postre. La selección es opcional al reservar y puede modificarse hasta 48 horas antes."
      : "The three-course dinner for two is already included. Each guest may choose one starter, one main course and one dessert. Selection is optional while booking and may be modified up to 48 hours before the experience."
    : isSpanish
      ? "La cena de tres tiempos para dos puede agregarse por US$299. Cada persona elige una entrada, un plato fuerte y un postre; la selección puede modificarse hasta 48 horas antes. La experiencia completa continúa limitada a un máximo de dos horas."
      : "A three-course dinner for two may be added for US$299. Each guest chooses one starter, one main course and one dessert, and selections may be modified up to 48 hours before the experience. The complete experience remains limited to a maximum of two hours.";

  const items = isSpanish
    ? [
        [
          "¿Cuánto tiempo dura la experiencia?",
          "La pareja permanece entre 90 minutos y un máximo de dos horas en la playa. El tiempo de transporte no se cuenta dentro de ese período. Si la pareja se retrasa, cada minuto de espera se descuenta del tiempo en la playa. El chofer espera un máximo de 30 minutos; después se considera ausencia y se pierde la experiencia y el depósito.",
        ],
        [
          "¿Desde cuáles zonas está incluido el transporte?",
          "El transporte privado para la pareja está incluido desde cualquier hotel, Airbnb o villa de Cap Cana, Punta Cana Resort, El Cortecito, Bávaro, Verón, Macao y Uvero Alto. Miches puede generar un cargo adicional. La van admite hasta 10 personas y cada acompañante adicional paga US$20 únicamente por transporte.",
        ],
        [
          "¿Cuántas fotografías recibiremos?",
          "Se garantizan más de 70 fotografías JPG en alta resolución con corrección profesional de iluminación, color, encuadre y exposición. Se entregan dentro de 48 horas mediante un enlace permanente de Google Drive. No se retoca la piel y los archivos RAW se entregan gratuitamente si se solicitan.",
        ],
        [
          "¿Está incluido el video de la propuesta?",
          "Sí. Se graba con teléfono un video vertical de aproximadamente 3 a 5 minutos de la revelación, entrega del anillo y celebración, salvo que el cliente solicite no grabarlo. Normalmente se comparte antes de salir de la playa. El video profesional con dron es un adicional de US$399.",
        ],
        [
          "¿Cómo se reserva y cuándo se paga el saldo?",
          "La fecha queda reservada después de firmar el contrato y pagar un depósito de US$200, que se descuenta completamente del precio. El saldo se paga al terminar la experiencia, antes del regreso. El precio publicado supone pago del saldo en efectivo.",
        ],
        [
          "¿Qué cargos tiene un pago electrónico del saldo?",
          "Si el saldo se paga electrónicamente, se aplican 18% de ITBIS y 10% de procesamiento, calculados exclusivamente sobre el saldo pendiente. El depósito de US$200 no paga esos cargos. En efectivo se aceptan USD, DOP y GBP; la conversión USD–DOP utiliza la tasa del Banco Central y USD–GBP la tasa consultada en Google, dejándose el importe en el contrato.",
        ],
        [
          "¿El depósito es reembolsable y puedo cambiar la fecha?",
          "El depósito no es reembolsable cuando el cliente cancela. Puede conservarse para otra fecha sujeta a disponibilidad; se recomienda solicitar el cambio con al menos dos semanas de anticipación. Si la empresa cancela, devuelve todo lo pagado dentro de una semana.",
        ],
        [
          "¿Qué sucede si llueve?",
          "El clima se vigila antes del montaje. Puede utilizarse un gazebo techado sin costo, manteniendo la misma decoración e inclusiones, o coordinarse otra fecha. Si la lluvia comienza durante la experiencia, la pareja puede resguardarse y continuar cuando calme. Si no es seguro continuar, se ofrece una sesión romántica de una hora al día siguiente con fotógrafo y transporte.",
        ],
        [
          "¿La playa es completamente privada y tiene baño?",
          "El montaje queda reservado para la pareja en una playa virgen y de muy poca concurrencia en Uvero Alto. Los primeros 60 metros de costa son públicos por ley dominicana y no puede impedirse el paso ocasional. Hay un baño cercano con agua, lavabo, inodoro, espejo y espacio para cambiarse.",
        ],
        [
          "¿Pueden adaptarse las flores y los colores?",
          "El paquete conserva la paleta y el volumen visual descritos. Los cambios de color se cotizan. El bouquet incluido utiliza flores naturales frescas de temporada; un ramo elaborado por florista con flores específicas se cotiza por separado.",
        ],
        ["¿Cómo funciona la cena?", dinnerAnswer],
      ]
    : [
        [
          "How long does the experience last?",
          "The couple spends 90 minutes to a maximum of two hours at the beach. Transportation time is not part of that period. If the couple is late, every minute of driver wait time is deducted from the beach experience. The driver waits a maximum of 30 minutes; after that it is treated as a no-show and the experience and deposit are forfeited.",
        ],
        [
          "Which areas include transportation?",
          "Private transportation for the couple is included from any hotel, Airbnb or villa in Cap Cana, Punta Cana Resort, El Cortecito, Bávaro, Verón, Macao and Uvero Alto. Miches may carry an additional charge. The van holds up to 10 people and each additional companion costs US$20 for transportation only.",
        ],
        [
          "How many photographs will we receive?",
          "More than 70 high-resolution JPG photographs are guaranteed, with professional lighting, color, crop and exposure correction. They are delivered within 48 hours through a permanent Google Drive link. Skin is not retouched, and RAW files are provided free on request.",
        ],
        [
          "Is a proposal video included?",
          "Yes. A vertical 3–5 minute phone video records the reveal, ring and celebration unless the client asks not to be recorded. It is normally shared before leaving the beach. Professional video with drone coverage is a US$399 add-on.",
        ],
        [
          "How is the date reserved and when is the balance paid?",
          "The date is reserved after signing the agreement and paying a US$200 deposit, which is fully deducted from the price. The balance is paid at the end of the experience, before the return trip. The published price assumes a cash balance payment.",
        ],
        [
          "What charges apply to an electronic balance payment?",
          "An electronic balance payment adds 18% ITBIS and a 10% processing charge, each calculated only on the outstanding balance. The US$200 deposit carries neither charge. Cash is accepted in USD, DOP and GBP; USD–DOP uses the Dominican Central Bank rate and USD–GBP uses the Google-listed rate, with the amount recorded in the agreement.",
        ],
        [
          "Is the deposit refundable and may I change the date?",
          "The deposit is non-refundable when the client cancels. It can be preserved for another available date, and at least two weeks’ notice is recommended. If the company cancels, all money paid is returned within one week.",
        ],
        [
          "What happens if it rains?",
          "Weather is monitored before setup. A covered gazebo may be used at no charge with the same décor and inclusions, or another date may be arranged. If rain begins during the experience, the couple can shelter and continue when it eases. If continuing is unsafe, a complimentary one-hour romantic session with photographer and transportation is offered the next day.",
        ],
        [
          "Is the beach completely private and is there a bathroom?",
          "The setup is reserved for the couple on a pristine, very low-traffic beach in Uvero Alto. The first 60 metres of shoreline are public under Dominican law, so occasional passage cannot be prohibited. A nearby bathroom has running water, a sink, toilet, mirror and space to change.",
        ],
        [
          "Can the flowers and colors be customized?",
          "The package preserves the palette and visual volume described on this page. Color changes are quoted separately. The included bouquet uses fresh seasonal flowers; a florist-made bouquet with specific flowers is available by quotation.",
        ],
        ["How does the dinner work?", dinnerAnswer],
      ];

  return asFaqs(items);
};

export default buildProposalPackageFaqs;
