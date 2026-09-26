// Copy for the Share Your Experience form fields, which stay in the repo. The
// page's title, intro, hero and SEO are edited in Sanity (one Share Your
// Experience document per language).
//
// Service option values stay in English (SERVICE_VALUES) so the testimonial
// notification emails read the same whatever language the client used.
export const SERVICE_VALUES = [
  "Marriage Proposal Experience",
  "Elopement or Vow Renewal",
  "Wedding Planning",
  "Gender Reveal",
  "Corporate Event",
];

export const shareExperienceContent = {
  "en-US": {
    names: "Names",
    email: "Email",
    phone: "Phone / WhatsApp",
    service: "Service",
    selectService: "Select a service",
    services: [
      "Marriage Proposal Experience",
      "Elopement or Vow Renewal",
      "Wedding Planning",
      "Gender Reveal",
      "Corporate Event",
    ],
    experience: "Your experience",
    photo: "Optional photo",
    submit: "Submit testimonial",
    honeypotLabel: "Do not fill this out:",
  },
  es: {
    names: "Nombres",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    service: "Servicio",
    selectService: "Selecciona un servicio",
    services: [
      "Propuesta de matrimonio",
      "Boda íntima o renovación de votos",
      "Planificación de bodas",
      "Revelación de género",
      "Evento corporativo",
    ],
    experience: "Tu experiencia",
    photo: "Foto (opcional)",
    submit: "Enviar testimonio",
    honeypotLabel: "No completes este campo:",
  },
  pt: {
    names: "Nomes",
    email: "E-mail",
    phone: "Telefone / WhatsApp",
    service: "Serviço",
    selectService: "Selecione um serviço",
    services: [
      "Pedido de casamento",
      "Elopement ou renovação de votos",
      "Planejamento de casamento",
      "Chá revelação",
      "Evento corporativo",
    ],
    experience: "Sua experiência",
    photo: "Foto (opcional)",
    submit: "Enviar depoimento",
    honeypotLabel: "Não preencha este campo:",
  },
  fr: {
    names: "Noms",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    service: "Service",
    selectService: "Sélectionnez un service",
    services: [
      "Demande en mariage",
      "Elopement ou renouvellement des vœux",
      "Organisation de mariage",
      "Gender reveal",
      "Événement d’entreprise",
    ],
    experience: "Votre expérience",
    photo: "Photo (facultative)",
    submit: "Envoyer le témoignage",
    honeypotLabel: "Ne remplissez pas ce champ :",
  },
};
