import React from "react";
import { Link } from "gatsby";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
import { localizedPath } from "../../utils/siteLocales";
const { nodes, languageIndex } = require("../../data/knowledgeGraph");

export default function ServiceGuides({ cluster, language }) {
  const guides = nodes.filter((node) => node.cluster === cluster);
  const i = languageIndex(language);
  return (
    <section className="mx-auto my-16 w-full max-w-6xl px-5" aria-labelledby="service-guides-title">
      <h2 id="service-guides-title" className="font-crimson text-3xl md:text-4xl text-gray-900">
        {["Our guides to planning your event", "Nuestras guías para planificar tu evento", "Nossos guias para planejar seu evento", "Nos guides pour préparer votre événement"][i]}
      </h2>
      <p className="font-montserrat text-sm text-gray-600 my-4">
        {["We explain the decisions, timing and practical details before you book.", "Te explicamos las decisiones, los tiempos y los detalles prácticos antes de reservar.", "Explicamos as decisões, os prazos e os detalhes práticos antes da reserva.", "Nous expliquons les décisions, les délais et les détails pratiques avant de réserver."][i]}
      </p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 list-none">
        {guides.map((node) => <li key={node.id} className="border border-gray-200 border-t-2 border-t-primary-color p-5">
          <Link className="font-crimson text-2xl text-gray-900 underline underline-offset-4" to={localizedPath(`/blog/${node.slug}/`, language)}>
            {getKnowledgeArticle(node.slug, language).title}
          </Link>
        </li>)}
      </ul>
    </section>
  );
}
