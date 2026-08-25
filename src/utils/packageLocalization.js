const spanishFaqOverrides = {
  "what happens if it rains on the day of an outdoor shoot?": {
    title: "¿Qué pasa si llueve el día de la propuesta?",
    answer:
      "Nuestro equipo monitorea el pronóstico y se comunica contigo si el clima puede afectar el montaje. Según la locación y las condiciones, coordinamos un horario alternativo, una opción cubierta o una nueva fecha de acuerdo con el contrato.",
  },
  "how and when will i receive my photos?": {
    title: "¿Cómo y cuándo recibiré mis fotografías?",
    answer:
      "Recibirás más de 70 fotografías profesionales editadas y en alta resolución dentro de las 48 horas posteriores a la propuesta mediante un enlace permanente de Google Drive.",
  },
  "do you provide hair and makeup services?": {
    title: "¿Ofrecen servicios de peinado y maquillaje?",
    answer:
      "El peinado y el maquillaje no están incluidos en el paquete, pero podemos recomendar o coordinar profesionales externos según disponibilidad. Este servicio se cotiza por separado.",
  },
  "what should i wear to my photo shoot?": {
    title: "¿Qué ropa recomiendan para la propuesta y las fotografías?",
    answer:
      "Recomendamos elegir ropa cómoda y coordinada con el estilo del montaje, la hora y la locación. Antes de la experiencia podemos compartir recomendaciones personalizadas para que el vestuario se vea bien en las fotografías.",
  },
};

export const localizePackageFaqs = (faqs = [], language) => {
  if (language !== "es") return faqs;

  return faqs.map((faq) => {
    const override = spanishFaqOverrides[faq?.title?.trim().toLowerCase()];
    if (!override) return faq;

    return {
      ...faq,
      title: override.title,
      content: {
        ...(faq.content || {}),
        content: override.answer,
      },
    };
  });
};
