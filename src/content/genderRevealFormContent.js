// Copy for the gender reveal quote form fields, which stay in the repo. The
// form section's eyebrow, title, intro and send button are edited in Sanity
// (one Gender Reveal Page document per language).
//
// Location type values stay in English (LOCATION_VALUES) so the notification
// emails read the same whatever language the client used.
export const LOCATION_VALUES = [
  "Hotel or resort",
  "Private villa",
  "Beach or independent venue",
  "Other or not decided",
];

export const genderRevealFormContent = {
  "en-US": {
    name: "Full name",
    email: "Email address",
    phone: "Phone / WhatsApp",
    country: "Country of residence",
    date: "Date or approximate month",
    datePlaceholder: "e.g. November 2027",
    guests: "Approximate guest count",
    location: "Location type",
    locationName: "Hotel, villa or venue name, if known",
    vision: "Tell us what you want for the reveal",
    choose: "Select an option",
    locationOptions: [
      "Hotel or resort",
      "Private villa",
      "Beach or independent venue",
      "Another location / not decided",
    ],
    privacy:
      "By submitting, you authorize Sertuin Events to contact you about this gender reveal inquiry.",
    honeypot: "Do not fill this out:",
  },
  es: {
    name: "Nombre y apellido",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    country: "País de residencia",
    date: "Fecha o mes aproximado",
    datePlaceholder: "Ej. noviembre de 2027",
    guests: "Cantidad aproximada de invitados",
    location: "Tipo de locación",
    locationName: "Nombre del hotel, villa o locación, si lo sabes",
    vision: "Cuéntanos qué quieres para la revelación",
    choose: "Selecciona una opción",
    locationOptions: [
      "Hotel o resort",
      "Villa privada",
      "Playa o espacio independiente",
      "Otra locación / por definir",
    ],
    privacy:
      "Al enviar, autorizas a Sertuin Events a contactarte sobre esta solicitud de revelación de género.",
    honeypot: "No completes este campo:",
  },
  pt: {
    name: "Nome e sobrenome",
    email: "E-mail",
    phone: "Telefone / WhatsApp",
    country: "País de residência",
    date: "Data ou mês aproximado",
    datePlaceholder: "Ex.: novembro de 2027",
    guests: "Número aproximado de convidados",
    location: "Tipo de local",
    locationName: "Nome do hotel, villa ou local, se souber",
    vision: "Conte-nos o que deseja para a revelação",
    choose: "Selecione uma opção",
    locationOptions: [
      "Hotel ou resort",
      "Villa privativa",
      "Praia ou venue independente",
      "Outro local / ainda não decidido",
    ],
    privacy:
      "Ao enviar, você autoriza a Sertuin Events a entrar em contato sobre esta solicitação.",
    honeypot: "Não preencha este campo:",
  },
  fr: {
    name: "Nom complet",
    email: "Adresse e-mail",
    phone: "Téléphone / WhatsApp",
    country: "Pays de résidence",
    date: "Date ou mois approximatif",
    datePlaceholder: "Ex. : novembre 2027",
    guests: "Nombre approximatif d’invités",
    location: "Type de lieu",
    locationName: "Nom de l’hôtel, de la villa ou du lieu, si connu",
    vision: "Décrivez-nous la révélation imaginée",
    choose: "Sélectionnez une option",
    locationOptions: [
      "Hôtel ou resort",
      "Villa privée",
      "Plage ou lieu indépendant",
      "Autre lieu / à définir",
    ],
    privacy:
      "En envoyant ce formulaire, vous autorisez Sertuin Events à vous contacter au sujet de cette demande.",
    honeypot: "Ne remplissez pas ce champ :",
  },
};
