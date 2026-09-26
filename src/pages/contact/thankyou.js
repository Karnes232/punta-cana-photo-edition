import { graphql, Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Layout/seo';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { getLanguageConfig, localizedPath, localizedUrl, normalizeLanguage } from '../../utils/siteLocales';

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const focusRing = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#b79a5d] focus-visible:outline-offset-4';
const label = 'font-montserrat text-[10px] font-semibold leading-[1.6] tracking-[.18em] text-[#80651f]';
const button = `flex min-h-12 items-center justify-center gap-4 rounded-lg px-5 py-[14px] no-underline transition-[background] duration-200 ease-[ease] motion-reduce:transition-none max-[600px]:px-[10px] ${focusRing}`;

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
      <main className="px-6 pb-[60px] pt-[170px] text-[#25231f] [background:radial-gradient(ellipse_at_10%_10%,#302b20_0,transparent_55%),#151411] max-[600px]:px-[18px] max-[600px]:pb-[35px] max-[600px]:pt-[122px]">
        <section className="mx-auto max-w-[820px] rounded-[20px] border border-[#e7dfcf] bg-[#fffefa] px-[58px] py-[44px] text-center [box-shadow:0_24px_80px_#0003] max-[600px]:rounded-[14px] max-[600px]:px-[23px] max-[600px]:py-[30px]" aria-labelledby="thankyou-heading">
          <div className="mx-auto mb-[22px] flex h-16 w-16 items-center justify-center rounded-[50%] border border-[#d5c08c] bg-[#f4eedf] text-[#80651f] max-[600px]:mb-[18px] max-[600px]:h-[54px] max-[600px]:w-[54px]" aria-hidden="true"><Check size={30} strokeWidth={1.4} /></div>
          <p className={`${label} mb-[14px]`}>{copy.eyebrow}</p>
          <h1 id="thankyou-heading" className="mb-[22px] text-[length:clamp(40px,4.5vw,56px)] font-normal leading-[1.06] tracking-[-.02em] [overflow-wrap:anywhere] max-[600px]:text-[40px]">{name ? `${copy.greeting} ${name}.` : copy.title}</h1>
          <p className="mx-auto max-w-[570px] font-montserrat text-[14px] leading-[1.85] text-[#686156] max-[600px]:text-[13px]">{copy.intro}</p>
          <div className="my-[30px] border-y border-y-[#e3dac9] py-6 text-left max-[600px]:my-[25px]">
            <h2 className={`${label} mb-[18px]`}>{copy.nextTitle}</h2>
            <div className="grid grid-cols-2 gap-9 max-[600px]:grid-cols-1 max-[600px]:gap-[23px]">
              {(copy.steps || []).map(({ _key, title, body }, index) => <div key={_key}>
                <span className="font-montserrat text-[11px] text-[#8a7342]">0{index + 1}</span>
                <h3 className="my-2 text-[25px] font-normal leading-[1.2]">{title}</h3>
                <p className="m-0 font-montserrat text-[12px] leading-[1.85] text-[#686156]">{body}</p>
              </div>)}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[14px] font-montserrat text-[12px] font-semibold max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-[10px]">
            <Link to={localizedPath('/blog/', language)} className={`${button} border border-[#25231f] bg-[#25231f] text-white hover:bg-[#51442b]`}>{copy.guidesLabel}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to={localizedPath('/', language)} className={`${button} border border-[#d5c9b0] text-[#51452e] hover:bg-[#f0e8d7]`}>{copy.homeLabel}</Link>
          </div>
        </section>
        <aside className="mx-auto mt-[30px] max-w-[700px] text-center text-[#e4dbc7] max-[600px]:px-2">
          <p className="mb-3 text-[23px] leading-[1.4] max-[600px]:text-[21px]">{copy.extra}</p>
          <a href={`https://wa.me/${phone}`} className={`inline-flex min-h-11 items-center justify-center gap-[9px] font-montserrat text-[12px] text-[#e2c88e] underline-offset-[5px] ${focusRing}`}><MessageCircle size={18} aria-hidden="true" />{copy.whatsappLabel}</a>
          <a href={`mailto:${email}`} className={`m-auto flex w-fit min-h-11 items-center justify-center gap-[9px] font-montserrat text-[11px] text-[#d0c8b8] underline-offset-[5px] ${focusRing}`}>{copy.emailLabel}</a>
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
