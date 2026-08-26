import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Layout/seo";

const COPY = {
  es: {
    eyebrow: "Privacidad y medición",
    title: "Política de privacidad",
    intro:
      "Esta página explica qué información recibe Sertuin Events, qué medimos para mejorar el sitio y qué datos nunca enviamos a las plataformas de analítica.",
    updated: "Última actualización: 26 de agosto de 2026",
    sections: [
      {
        title: "Datos de los formularios",
        paragraphs: [
          "Cuando envías un formulario, Sertuin Events recibe los campos que completaste para responder a tu solicitud, preparar una propuesta o administrar tu reserva. Esto puede incluir nombre, correo, teléfono, país del número, detalles del evento y las opciones que seleccionaste.",
          "Los contenidos de esos campos se procesan como datos de contacto de la empresa y no se envían a Google Analytics ni a Ahrefs.",
        ],
      },
      {
        title: "Datos de uso y rendimiento",
        paragraphs: [
          "Con tu permiso podemos medir páginas y secciones vistas, paquete consultado, clics de navegación y contacto, inicio, validación y éxito de formularios, profundidad de desplazamiento, tiempo activo, rendimiento Web Vitals y errores técnicos.",
          "Google Analytics también puede informar el tipo de dispositivo, navegador, sistema operativo y una ubicación aproximada como país, región o ciudad. No solicitamos GPS preciso ni usamos huellas digitales del dispositivo.",
        ],
      },
      {
        title: "Servicios utilizados",
        paragraphs: [
          "Usamos Google Analytics 4 para medición, Google Ads para atribución publicitaria cuando aceptas todo, Ahrefs Analytics cuando permites medición y Netlify Forms para recibir solicitudes. Cada proveedor procesa datos conforme a sus propios términos y medidas de seguridad.",
        ],
      },
      {
        title: "Tus opciones y derechos",
        paragraphs: [
          "Puedes aceptar todo, permitir solo medición o mantener únicamente el almacenamiento necesario. La opción Privacidad que permanece en el sitio permite cambiar tu selección en cualquier momento.",
          "Para solicitar acceso, corrección o eliminación de los datos enviados a Sertuin Events, escribe a info@sertuinevents.com. Conservamos la información solo durante el tiempo necesario para atender la solicitud, cumplir el contrato y las obligaciones legales aplicables.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Privacy and measurement",
    title: "Privacy policy",
    intro:
      "This page explains what information Sertuin Events receives, what we measure to improve the website and which data is never sent to analytics platforms.",
    updated: "Last updated: August 26, 2026",
    sections: [
      {
        title: "Form data",
        paragraphs: [
          "When you submit a form, Sertuin Events receives the fields you completed so we can answer your inquiry, prepare a proposal or manage your booking. This may include your name, email, phone number, phone country, event details and selected options.",
          "Those field contents are processed as company contact data and are not sent to Google Analytics or Ahrefs.",
        ],
      },
      {
        title: "Usage and performance data",
        paragraphs: [
          "With your permission, we can measure pages and sections viewed, packages consulted, navigation and contact clicks, form starts, validation and success, scroll depth, active time, Web Vitals performance and technical errors.",
          "Google Analytics may also report device type, browser, operating system and an approximate location such as country, region or city. We do not request precise GPS or use device fingerprinting.",
        ],
      },
      {
        title: "Services we use",
        paragraphs: [
          "We use Google Analytics 4 for measurement, Google Ads for advertising attribution when you accept all, Ahrefs Analytics when you allow analytics and Netlify Forms to receive inquiries. Each provider processes data under its own terms and security measures.",
        ],
      },
      {
        title: "Your choices and rights",
        paragraphs: [
          "You may accept all, allow analytics only or keep only necessary storage. The Privacy control that remains on the site lets you change your selection at any time.",
          "To request access, correction or deletion of data submitted to Sertuin Events, email info@sertuinevents.com. We retain information only as long as needed to handle the inquiry, fulfill a contract and meet applicable legal obligations.",
        ],
      },
    ],
  },
};

const PrivacyPage = ({ data }) => {
  const { language } = useI18next();
  const isSpanish = language === "es";
  const copy = COPY[isSpanish ? "es" : "en"];
  const generalInfo = data.allContentfulGeneralLayout.nodes[0];

  return (
    <Layout generalInfo={generalInfo}>
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-36 font-montserrat text-stone-800 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
          {copy.eyebrow}
        </p>
        <h1 className="mt-4 font-crimson text-5xl font-semibold text-stone-950 md:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
          {copy.intro}
        </p>
        <p className="mt-3 text-sm text-stone-500">{copy.updated}</p>

        <div className="mt-12 space-y-10">
          {copy.sections.map((section) => (
            <section
              key={section.title}
              className="border-t border-stone-200 pt-8"
            >
              <h2 className="font-crimson text-3xl font-semibold text-stone-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-stone-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default PrivacyPage;

export const Head = ({ pageContext, data }) => {
  const isSpanish = pageContext.language === "es";
  const baseUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const pageUrl = `${baseUrl}${isSpanish ? "/es" : ""}/privacy/`;
  const title = isSpanish
    ? "Política de privacidad | Sertuin Events"
    : "Privacy Policy | Sertuin Events";
  const description = isSpanish
    ? "Conoce cómo Sertuin Events procesa formularios, medición web, consentimiento y datos de privacidad."
    : "Learn how Sertuin Events handles form submissions, website measurement, consent and privacy data.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={pageUrl}
        language={isSpanish ? "es" : "en"}
      />
      <link rel="canonical" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/privacy/`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es/privacy/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/privacy/`} />
    </>
  );
};

export const query = graphql`
  query PrivacyPageQuery($language: String!) {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout(filter: { node_locale: { eq: $language } }) {
      nodes {
        companyName
        legalName
        rnc
        email
        facebook
        instagram
        x
        telephone
        messengerLink
      }
    }
  }
`;
