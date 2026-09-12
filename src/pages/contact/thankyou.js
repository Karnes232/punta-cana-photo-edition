import { graphql, Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Layout/seo';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getLanguageConfig, localizedPath, localizedUrl, normalizeLanguage } from '../../utils/siteLocales';
import { thankYouContent } from '../../content/thankYouContent';
import * as styles from './thankyou.module.css';

const ThankYou = ({ data, pageContext }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext?.language || hookLanguage);
  const copy = thankYouContent[language];
  const [name, setName] = useState('');
  useEffect(() => {
    try {
      setName((sessionStorage.getItem('sertuin-thankyou-name') || '').trim().slice(0, 100));
      sessionStorage.removeItem('sertuin-thankyou-name');
    } catch { /* The optional greeting never blocks the confirmation. */ }
  }, []);
  return (
    <Layout generalInfo={data.allContentfulGeneralLayout.nodes[0]} overlayHeader>
      <main className={styles.page}>
        <section className={styles.card} aria-labelledby="thankyou-heading">
          <div className={styles.check} aria-hidden="true"><Check size={30} strokeWidth={1.4} /></div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="thankyou-heading">{name ? `${copy.greeting} ${name}.` : copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.next}>
            <h2>{copy.next}</h2>
            <div className={styles.steps}>
              {copy.steps.map(([title, text], index) => <div key={title}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{title}</h3><p>{text}</p>
              </div>)}
            </div>
          </div>
          <div className={styles.actions}>
            <Link to={localizedPath('/blog/', language)} className={styles.primary}>{copy.guides}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to={localizedPath('/', language)} className={styles.secondary}>{copy.home}</Link>
          </div>
        </section>
        <aside className={styles.more}>
          <p>{copy.extra}</p>
          <a href="https://wa.me/18295222900"><MessageCircle size={18} aria-hidden="true" />{copy.whatsapp}</a>
          <a className={styles.email} href="mailto:info@sertuinevents.com">{copy.email}</a>
        </aside>
      </main>
    </Layout>
  );
};
export default ThankYou;

export const Head = ({ data, pageContext }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext?.language || hookLanguage);
  const copy = thankYouContent[language];
  const contactUrl = localizedUrl(data.site.siteMetadata.siteUrl, '/contact/', language);
  return <>
    <Seo title={copy.metaTitle} description={copy.metaDescription} url={contactUrl}
      language={getLanguageConfig(language).htmlLang} robots="noindex, follow" />
    <link rel="canonical" href={contactUrl} />
  </>;
};

export const query = graphql`
  query ThankYouPage($contentLanguage: String = "en-US") {
    locales: allLocale { edges { node { ns data language } } }
    site { siteMetadata { siteUrl } }
    allContentfulGeneralLayout(filter: { node_locale: { eq: $contentLanguage } }) {
      nodes { companyName facebook email instagram messengerLink x telephone }
    }
  }
`;
