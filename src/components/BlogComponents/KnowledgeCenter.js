import React from "react";
import { localizedPath } from "../../utils/siteLocales";
import { getKnowledgeArticle } from "../../data/knowledgeContent";
const {
  nodes,
  clusters,
  topics,
  label,
  languageIndex,
} = require("../../data/knowledgeGraph");

export const centerCopy = {
  title: [
    "Plan the moment. Understand every detail.",
    "Planifica el momento. Entiende cada detalle.",
    "Planeje o momento. Entenda cada detalhe.",
    "Préparez le moment. Comprenez chaque détail.",
  ],
  intro: [
    "Local knowledge for your event in Punta Cana: choose a setting, understand the logistics and prepare the next decision with Sertuin Events.",
    "Conocimiento local para tu evento en Punta Cana: elige el lugar, comprende la logística y prepara tu siguiente decisión con Sertuin Events.",
    "Conhecimento local para seu evento em Punta Cana: escolha o espaço, entenda a logística e prepare a próxima decisão com a Sertuin Events.",
    "L’expertise locale pour votre événement à Punta Cana : choisissez le cadre, comprenez la logistique et préparez la prochaine décision avec Sertuin Events.",
  ],
  eyebrow: [
    "Sertuin Events · Planning library",
    "Sertuin Events · Biblioteca de planificación",
    "Sertuin Events · Biblioteca de planejamento",
    "Sertuin Events · Bibliothèque de préparation",
  ],
  topics: [
    "Explore the decisions behind every event",
    "Explora las decisiones de cada evento",
    "Explore as decisões de cada evento",
    "Explorez les décisions de chaque événement",
  ],
  read: ["Read the guide", "Leer la guía", "Ler o guia", "Lire le guide"],
  service: [
    "Explore the service",
    "Consultar el servicio",
    "Conhecer o serviço",
    "Découvrir le service",
  ],
  intimate: [
    "An intimate ceremony or vow renewal?",
    "¿Ceremonia íntima o renovación de votos?",
    "Cerimônia íntima ou renovação de votos?",
    "Une cérémonie intime ou un renouvellement de vœux ?",
  ],
  intimateText: [
    "Start with the elopement options, then use the guest and weather guides to plan the setting and group. An expanded beach group needs its own transport and covered-space quotation.",
    "Empieza por las opciones de elopement y consulta las guías de invitados y clima para planificar lugar y grupo. Un grupo ampliado en playa necesita cotización propia de transporte y alternativa cubierta.",
    "Comece pelas opções de elopement e consulte os guias de convidados e clima para planejar espaço e grupo. Um grupo ampliado na praia precisa de orçamento próprio de transporte e alternativa coberta.",
    "Commencez par les options d’elopement, puis consultez les guides invités et météo. Un groupe élargi sur la plage nécessite son propre devis de transport et de solution couverte.",
  ],
  intimateLink: [
    "Elopements & vow renewals",
    "Elopements y renovación de votos",
    "Elopements e renovação de votos",
    "Elopements et renouvellement de vœux",
  ],
};
const KnowledgeCenter = ({ language, availableSlugs }) => {
  const i = languageIndex(language);
  const available = new Set(availableSlugs);
  const active = nodes.filter((n) => available.has(n.slug));
  return (
    <main className="knowledge-center">
      <header className="knowledge-center__hero">
        <p className="knowledge-eyebrow">{centerCopy.eyebrow[i]}</p>
        <h1>{centerCopy.title[i]}</h1>
        <p className="knowledge-center__intro">{centerCopy.intro[i]}</p>
        <nav className="knowledge-jumps" aria-label={centerCopy.topics[i]}>
          {clusters
            .filter((c) => active.some((n) => n.cluster === c.id))
            .map((c) => (
              <a href={`#${c.id}`} key={c.id}>
                {label(c, language)}
              </a>
            ))}
          <a href="#intimate">{centerCopy.intimateLink[i]}</a>
        </nav>
      </header>
      <div className="knowledge-center__body">
        {clusters.map((c, ci) => {
          const collection = active.filter((n) => n.cluster === c.id);
          if (!collection.length) return null;
          return (
            <section className="knowledge-cluster" id={c.id} key={c.id}>
              <header>
                <p className="knowledge-eyebrow">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2>{label(c, language)}</h2>
                <a href={localizedPath(c.service, language)}>
                  {centerCopy.service[i]} <span aria-hidden="true">↗</span>
                </a>
              </header>
              <div className="knowledge-cards">
                {collection.map((n, ni) => {
                  const article = getKnowledgeArticle(n.slug, language);
                  return (
                    <article key={n.id}>
                      <p className="knowledge-card-number" aria-hidden="true">
                        {String(ni + 1).padStart(2, "0")}
                      </p>
                      <h3>
                        <a href={localizedPath(`/blog/${n.slug}/`, language)}>
                          {article.title}
                        </a>
                      </h3>
                      <p>{article.description}</p>
                      <a
                        className="knowledge-read"
                        href={localizedPath(`/blog/${n.slug}/`, language)}
                      >
                        {centerCopy.read[i]} <span aria-hidden="true">→</span>
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
        <section id="intimate" className="knowledge-intimate">
          <div>
            <p className="knowledge-eyebrow">Sertuin Events</p>
            <h2>{centerCopy.intimate[i]}</h2>
            <p>{centerCopy.intimateText[i]}</p>
          </div>
          <a href={localizedPath("/punta-cana-elopement-packages/", language)}>
            {centerCopy.intimateLink[i]} <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="knowledge-topics" id="planning-topics">
          <h2>{centerCopy.topics[i]}</h2>
          <div>
            {topics.map((t) => (
              <section id={`topic-${t.id}`} key={t.id}>
                <h3>{label(t, language)}</h3>
                <ul>
                  {active
                    .filter((n) => n.topics.includes(t.id))
                    .map((n) => (
                      <li key={n.id}>
                        <a href={localizedPath(`/blog/${n.slug}/`, language)}>
                          {getKnowledgeArticle(n.slug, language).title}
                        </a>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
export default KnowledgeCenter;
