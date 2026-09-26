// Copy for the home page contact form, which stays in the repo. The rest of the
// home page is edited in Sanity (one Home Page document per language).
export const homeContent = {
  "en-US": {
    formTitle: "Request Event Information",
    name: "Name",
    emailLabel: "Email",
    phone: "Phone or WhatsApp",
    eventType: "Event type",
    selectEvent: "Select an event",
    eventOptions: [
      "Corporate event",
      "Destination wedding",
      "Elopement",
      "Marriage proposal",
      "Private celebration",
      "Gender reveal",
      "Other event",
    ],
    date: "Preferred date",
    details: "Tell us about your event",
    submit: "Send Event Request",
    formMessages: {
      phoneCountry: "Select phone country",
      phoneError: "Enter a valid phone number with its country code.",
      emailError: "Enter a valid email address with an active domain.",
      sending: "Sending...",
      successTitle: "Request received",
      success: "Your request was sent successfully. We will contact you shortly.",
      error: "We could not send your request. Please try again.",
    },
    honeypotLabel: "Do not fill this out:",
  },
  es: {
    formTitle: "Solicitar Información del Evento",
    name: "Nombre",
    emailLabel: "Correo electrónico",
    phone: "Teléfono o WhatsApp",
    eventType: "Tipo de evento",
    selectEvent: "Selecciona un evento",
    eventOptions: [
      "Evento corporativo",
      "Boda de destino",
      "Boda íntima",
      "Propuesta de matrimonio",
      "Celebración privada",
      "Revelación de género",
      "Otro evento",
    ],
    date: "Fecha preferida",
    details: "Cuéntanos sobre tu evento",
    submit: "Enviar Solicitud",
    formMessages: {
      phoneCountry: "Seleccionar país del teléfono",
      phoneError: "Ingresa un número de teléfono válido con su código de país.",
      emailError: "Ingresa un correo electrónico válido con un dominio activo.",
      sending: "Enviando...",
      successTitle: "Solicitud recibida",
      success: "Tu solicitud fue enviada correctamente. Te contactaremos muy pronto.",
      error: "No pudimos enviar tu solicitud. Inténtalo nuevamente.",
    },
    honeypotLabel: "No completes este campo:",
  },
  pt: {
    formTitle: "Solicitar Informações do Evento",
    name: "Nome",
    emailLabel: "E-mail",
    phone: "Telefone ou WhatsApp",
    eventType: "Tipo de evento",
    selectEvent: "Selecione um evento",
    eventOptions: [
      "Evento corporativo",
      "Casamento de destino",
      "Elopement",
      "Pedido de casamento",
      "Celebração privada",
      "Chá revelação",
      "Outro evento",
    ],
    date: "Data preferida",
    details: "Conte-nos sobre seu evento",
    submit: "Enviar Solicitação",
    formMessages: {
      phoneCountry: "Selecionar país do telefone",
      phoneError: "Digite um telefone válido com o código do país.",
      emailError: "Digite um e-mail válido com domínio ativo.",
      sending: "Enviando...",
      successTitle: "Solicitação recebida",
      success: "Sua solicitação foi enviada. Entraremos em contato em breve.",
      error: "Não foi possível enviar. Tente novamente.",
    },
    honeypotLabel: "Não preencha este campo:",
  },
  fr: {
    formTitle: "Demander des Informations",
    name: "Nom",
    emailLabel: "E-mail",
    phone: "Téléphone ou WhatsApp",
    eventType: "Type d’événement",
    selectEvent: "Sélectionnez un événement",
    eventOptions: [
      "Événement d’entreprise",
      "Mariage de destination",
      "Elopement",
      "Demande en mariage",
      "Célébration privée",
      "Gender reveal",
      "Autre événement",
    ],
    date: "Date souhaitée",
    details: "Parlez-nous de votre événement",
    submit: "Envoyer la Demande",
    formMessages: {
      phoneCountry: "Sélectionnez le pays du téléphone",
      phoneError: "Saisissez un numéro de téléphone valide avec l’indicatif du pays.",
      emailError: "Saisissez une adresse e-mail valide avec un domaine actif.",
      sending: "Envoi...",
      successTitle: "Demande reçue",
      success: "Merci. Votre demande a bien été envoyée.",
      error: "Impossible d’envoyer la demande. Veuillez réessayer.",
    },
    honeypotLabel: "Ne remplissez pas ce champ :",
  },
};

export const getHomeContent = (language) =>
  homeContent[
    language === "es"
      ? "es"
      : language === "pt"
        ? "pt"
        : language === "fr"
          ? "fr"
          : "en-US"
  ];
