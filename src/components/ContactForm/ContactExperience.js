import React from 'react';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactContent } from '../../content/contactContent';
import { localizedPath, normalizeLanguage } from '../../utils/siteLocales';
import { passVisitorName } from '../../utils/thankYouName';
import * as styles from './contactExperience.module.css';

const purposes = ['QUESTION', 'EVENT', 'COLLABORATION', 'OTHER'];

// "18295222900" -> "+1 829 522 2900" (North American numbers); other lengths
// are shown as +digits.
const displayPhone = (digits) =>
  digits.length === 11 && digits.startsWith('1')
    ? `+1 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
    : `+${digits}`;

// Page text comes from this language's Contact Page document in Sanity; the
// form's fields from the repo (contactContent.js); phone and email from
// General Layout.
export default function ContactExperience({ page, generalInfo, language }) {
  const locale = normalizeLanguage(language);
  const copy = contactContent[locale];
  if (!page) return null;
  const phone = (generalInfo?.telephone || '18295222900').replace(/\D/g, '');
  const email = generalInfo?.email || 'info@sertuinevents.com';
  const methods = [
    { href: `https://wa.me/${phone}`, label: page.whatsappLabel, detail: displayPhone(phone), Icon: MessageCircle },
    { href: `mailto:${email}`, label: page.emailLabel, detail: email, Icon: Mail },
    { href: `tel:+${phone}`, label: page.phoneLabel, detail: displayPhone(phone), Icon: Phone },
  ];
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-heading">
        <div className={styles.heroGrid}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{page.heroEyebrow}</p>
            <h1 id="contact-heading">{page.heroTitle}</h1>
            <p className={styles.intro}>{page.heroIntro}</p>
            <p className={styles.welcome}>{page.welcome}</p>
            <div className={styles.direct}>
              <p className={styles.directLabel}>{page.directLabel}</p>
              {methods.map(({ href, label, detail, Icon }) => (
                <a href={href} className={styles.method} key={href}>
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{label}</strong><small>{detail}</small></span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.formCard}>
            <p className={styles.formEyebrow}>{page.formEyebrow}</p>
            <h2 id="contact-form-heading">{page.formTitle}</h2>
            <p className={styles.formIntro}>{page.formIntro}</p>
            <form name="contact" id="contact" method="POST"
              action={localizedPath('/contact/thankyou/', locale)}
              onSubmit={passVisitorName('name')} data-netlify="true"
              data-netlify-honeypot="bot-field" aria-labelledby="contact-form-heading">
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="source" value="Contact page" />
              <input type="hidden" name="language" value={locale} />
              <p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <fieldset className={styles.purposes}>
                <legend>{copy.purpose}</legend>
                <div className={styles.purposeGrid}>
                  {copy.purposes.map((label, index) => (
                    <label key={purposes[index]} className={styles.purpose}>
                      <input type="radio" name="event-type" value={purposes[index]} defaultChecked={index === 0} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className={styles.fieldGrid}>
                <div className={styles.field}><label htmlFor="contact-name">{copy.name} <span aria-hidden="true">*</span></label>
                  <input id="contact-name" name="name" autoComplete="name" placeholder={copy.namePlaceholder} required maxLength={150} />
                </div>
                <div className={styles.field}><label htmlFor="contact-email">{copy.email} <span aria-hidden="true">*</span></label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required maxLength={254} />
                </div>
              </div>
              <div className={styles.field}><label htmlFor="contact-phone">{copy.phone} <small>({copy.optional})</small></label>
                <input id="contact-phone" name="telephone" type="tel" autoComplete="tel" placeholder="+1 829 000 0000" aria-describedby="contact-phone-hint" maxLength={40} />
                <p id="contact-phone-hint" className={styles.hint}>{copy.phoneHint}</p>
              </div>
              <div className={styles.field}><label htmlFor="contact-message">{copy.message} <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="additional" rows={4} placeholder={copy.messagePlaceholder} required maxLength={6000} />
              </div>
              <button className={styles.submit} type="submit">{copy.submit}<ArrowRight size={20} aria-hidden="true" /></button>
              <p className={styles.formNote}>{copy.note}</p>
            </form>
          </div>
        </div>
      </section>
      <section className={styles.next} aria-labelledby="contact-next-heading">
        <p className={styles.formEyebrow}>{page.nextEyebrow}</p>
        <h2 id="contact-next-heading">{page.nextTitle}</h2>
        <div className={styles.steps}>{(page.nextSteps || []).map(({ _key, title, body }, index) => <div key={_key}>
          <span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
        </div>)}</div>
        <p className={styles.location}>{page.location}</p>
      </section>
    </main>
  );
}
