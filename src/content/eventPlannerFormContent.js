// Copy for the corporate event proposal form fields, which stay in the repo.
// The form section's eyebrow, title, intro and send button are edited in
// Sanity (one Event Planner Page document per language).
//
// Budget option values stay in English (BUDGET_VALUES) so the notification
// emails read the same whatever language the client used; only the last
// option's label is translated.
export const BUDGET_VALUES = [
  "Under USD 15,000",
  "USD 15,000–30,000",
  "USD 30,000–60,000",
  "USD 60,000–100,000",
  "USD 100,000+",
  "To be defined",
];

export const eventPlannerFormContent = {
  "en-US": {
    name: "Full name",
    company: "Company",
    email: "Work email",
    phone: "Phone / WhatsApp",
    date: "Date or approximate date",
    datePlaceholder: "e.g. October 2027",
    guests: "Estimated guest count",
    venue: "Hotel or venue, if known",
    details: "Tell us about your event",
    budget: "Estimated budget",
    select: "Select a range",
    budgetOptions: [...BUDGET_VALUES],
    privacy:
      "By submitting, you authorize Sertuin Events to contact you about this inquiry.",
    honeypot: "Do not fill this out:",
  },
  es: {
    name: "Nombre y apellido",
    company: "Empresa",
    email: "Correo corporativo",
    phone: "Teléfono / WhatsApp",
    date: "Fecha o fecha aproximada",
    datePlaceholder: "Ej. octubre de 2027",
    guests: "Cantidad estimada de invitados",
    venue: "Hotel o sede, si ya lo sabe",
    details: "Cuéntenos sobre su evento",
    budget: "Presupuesto estimado",
    select: "Seleccione un rango",
    budgetOptions: [...BUDGET_VALUES.slice(0, -1), "Por definir"],
    privacy:
      "Al enviar este formulario, autoriza a Sertuin Events a contactarle sobre esta solicitud.",
    honeypot: "No completes este campo:",
  },
  pt: {
    name: "Nome e sobrenome",
    company: "Empresa",
    email: "E-mail corporativo",
    phone: "Telefone / WhatsApp",
    date: "Data ou data aproximada",
    datePlaceholder: "Ex.: outubro de 2027",
    guests: "Número estimado de convidados",
    venue: "Hotel ou venue, se já souber",
    details: "Conte-nos sobre seu evento",
    budget: "Orçamento estimado",
    select: "Selecione uma faixa",
    budgetOptions: [...BUDGET_VALUES.slice(0, -1), "A definir"],
    privacy:
      "Ao enviar, você autoriza a Sertuin Events a entrar em contato sobre esta solicitação.",
    honeypot: "Não preencha este campo:",
  },
  fr: {
    name: "Nom complet",
    company: "Entreprise",
    email: "E-mail professionnel",
    phone: "Téléphone / WhatsApp",
    date: "Date ou date approximative",
    datePlaceholder: "Ex. : octobre 2027",
    guests: "Nombre estimé d’invités",
    venue: "Hôtel ou lieu, si vous le connaissez",
    details: "Parlez-nous de votre événement",
    budget: "Budget estimé",
    select: "Sélectionnez une fourchette",
    budgetOptions: [...BUDGET_VALUES.slice(0, -1), "À définir"],
    privacy:
      "En envoyant ce formulaire, vous autorisez Sertuin Events à vous contacter au sujet de cette demande.",
    honeypot: "Ne remplissez pas ce champ :",
  },
};
