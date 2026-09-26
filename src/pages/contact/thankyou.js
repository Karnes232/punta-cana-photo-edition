import { graphql, Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Layout/seo';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getLanguageConfig, localizedPath, localizedUrl, normalizeLanguage } from '../../utils/siteLocales';
import * as styles from './thankyou.module.css';

// Copy comes from this language's Thank-You Page document in Sanity; the
// WhatsApp number and email from General Layout.
const ThankYou = ({ data, pageContext }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext?.language || hookLanguage);
  const copy = data.sanityThankYouPage || {};
  const phone = (data.sanityGeneralLayout?.telephone || '18295222900').replace(/\D/g, '');
  const email = data.sanityGeneralLayout?.email || 'info@sertuinevents.com';
  const [name, setName] = useState('');
  useEffect(() => {
    try {
      setName((sessionStorage.getItem('sertuin-thankyou-name') || '').trim().slice(0, 100));
      sessionStorage.removeItem('sertuin-thankyou-name');
    } catch { /* The optional greeting never blocks the confirmation. */ }
  }, []);
  return (
    <Layout generalInfo={data.sanityGeneralLayout} overlayHeader>
      <main className={styles.page}>
        <section className={styles.card} aria-labelledby="thankyou-heading">
          <div className={styles.check} aria-hidden="true"><Check size={30} strokeWidth={1.4} /></div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="thankyou-heading">{name ? `${copy.greeting} ${name}.` : copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.next}>
            <h2>{copy.nextTitle}</h2>
            <div className={styles.steps}>
              {(copy.steps || []).map(({ _key, title, body }, index) => <div key={_key}>
                <span className={styles.number}>0{index + 1}</span>
                <h3>{title}</h3><p>{body}</p>
              </div>)}
            </div>
          </div>
          <div className={styles.actions}>
            <Link to={localizedPath('/blog/', language)} className={styles.primary}>{copy.guidesLabel}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to={localizedPath('/', language)} className={styles.secondary}>{copy.homeLabel}</Link>
          </div>
        </section>
        <aside className={styles.more}>
          <p>{copy.extra}</p>
          <a href={`https://wa.me/${phone}`}><MessageCircle size={18} aria-hidden="true" />{copy.whatsappLabel}</a>
          <a className={styles.email} href={`mailto:${email}`}>{copy.emailLabel}</a>
        </aside>
      </main>
    </Layout>
  );
};
export default ThankYou;

export const Head = ({ data, pageContext }) => {
  const { language: hookLanguage } = useI18next();
  const language = normalizeLanguage(pageContext?.language || hookLanguage);
  const copy = data.sanityThankYouPage || {};
  const contactUrl = localizedUrl(data.site.siteMetadata.siteUrl, '/contact/', language);
  return <>
    <Seo title={copy.seoTitle} description={copy.seoDescription} url={contactUrl}
      language={getLanguageConfig(language).htmlLang} robots="noindex, follow" />
    <link rel="canonical" href={contactUrl} />
  </>;
};

export const query = graphql`
  query ThankYouPage($sanityLanguage: String = "en") {
    locales: allLocale { edges { node { ns data language } } }
    site { siteMetadata { siteUrl } }
    sanityGeneralLayout(_id: { eq: "generalLayout" }) { companyName facebook email instagram messengerLink x telephone }
    sanityThankYouPage(language: { eq: $sanityLanguage }) {
      eyebrow title greeting intro nextTitle
      steps { _key title body }
      guidesLabel homeLabel extra whatsappLabel emailLabel seoTitle seoDescription
    }
  }
`;
