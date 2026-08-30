import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout/Layout";

const NotFoundPage = ({ data, location }) => {
  const isSpanish = location?.pathname?.startsWith("/es/");
  const isPortuguese = location?.pathname?.startsWith("/pt/");
  const isFrench = location?.pathname?.startsWith("/fr/");

  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]}>
      <main className="flex min-h-[72vh] items-center bg-secondary-bg-color px-6 py-24 md:px-10">
        <div className="mx-auto w-full max-w-4xl border-l-4 border-primary-color bg-white p-8 shadow-xl md:p-14">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-primary-color">
            404
          </p>
          <h1 className="mt-4 font-crimson text-5xl font-medium leading-tight text-black md:text-7xl">
            {isPortuguese
              ? "Página não encontrada"
              : isFrench
                ? "Page introuvable"
                : isSpanish
                  ? "Página no encontrada"
                  : "Page not found"}
          </h1>
          <p className="mt-6 max-w-2xl font-montserrat text-base leading-8 text-gray-700 md:text-lg">
            {isPortuguese
              ? "A página que você procura não está mais disponível ou foi movida. Volte ao início para conhecer nossos serviços atuais."
              : isFrench
                ? "La page recherchée n’est plus disponible ou a été déplacée. Revenez à l’accueil pour découvrir nos services actuels."
                : isSpanish
                  ? "La página que buscas ya no está disponible o fue trasladada. Puedes regresar al inicio para explorar nuestros servicios actuales."
                  : "The page you are looking for is no longer available or has moved. Return home to explore our current services."}
          </p>
          <Link
            to={
              isPortuguese
                ? "/pt/"
                : isFrench
                  ? "/fr/"
                  : isSpanish
                    ? "/es/"
                    : "/"
            }
            className="mt-8 inline-flex bg-black px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-white no-underline transition hover:bg-primary-color hover:text-black"
          >
            {isPortuguese
              ? "Voltar ao início"
              : isFrench
                ? "Retour à l’accueil"
                : isSpanish
                  ? "Volver al inicio"
                  : "Return home"}
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = ({ location }) => {
  const isSpanish = location?.pathname?.startsWith("/es/");
  const isPortuguese = location?.pathname?.startsWith("/pt/");
  const isFrench = location?.pathname?.startsWith("/fr/");

  return (
    <>
      <html
        lang={
          isPortuguese ? "pt-BR" : isFrench ? "fr-FR" : isSpanish ? "es" : "en"
        }
      />
      <title>
        {isPortuguese
          ? "Página não encontrada | Sertuin Events"
          : isFrench
            ? "Page introuvable | Sertuin Events"
            : isSpanish
              ? "Página no encontrada | Sertuin Events"
              : "Page Not Found | Sertuin Events"}
      </title>
      <meta
        name="description"
        content={
          isPortuguese
            ? "A página solicitada não está disponível. Conheça os serviços atuais da Sertuin Events em Punta Cana."
            : isFrench
              ? "La page demandée n’est pas disponible. Découvrez les services actuels de Sertuin Events à Punta Cana."
              : isSpanish
                ? "La página solicitada no está disponible. Consulta los servicios actuales de Sertuin Events en Punta Cana."
                : "The requested page is unavailable. Explore current Sertuin Events services in Punta Cana."
        }
      />
      <meta name="robots" content="noindex,follow" />
    </>
  );
};

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulGeneralLayout {
      nodes {
        companyName
        facebook
        email
        instagram
        messengerLink
        x
        telephone
      }
    }
  }
`;
