import React from 'react';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactContent } from '../../content/contactContent';
import { localizedPath, normalizeLanguage } from '../../utils/siteLocales';
import { passVisitorName } from '../../utils/thankYouName';
import * as styles from './contactExperience.module.css';

const purposes = ['QUESTION', 'EVENT', 'COLLABORATION', 'OTHER'];

export default function ContactExperience({ language }) {
  const locale = normalizeLanguage(language);
  const copy = contactContent[locale];
  const methods = [
    { href: 'https://wa.me/18295222900', label: copy.whatsapp, detail: '+1 829 522 2900', Icon: MessageCircle },
    { href: 'mailto:info@sertuinevents.com', label: copy.emailLink, detail: 'info@sertuinevents.com', Icon: Mail },
    { href: 'tel:+18295222900', label: copy.phoneLink, detail: '+1 829 522 2900', Icon: Phone },
  ];
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-heading">
        <div className={styles.heroGrid}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{copy.eyebrow}</p>
            <h1 id="contact-heading">{copy.title}</h1>
            <p className={styles.intro}>{copy.intro}</p>
            <p className={styles.welcome}>{copy.welcome}</p>
            <div className={styles.direct}>
              <p className={styles.directLabel}>{copy.direct}</p>
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
            <p className={styles.formEyebrow}>{copy.formEyebrow}</p>
            <h2 id="contact-form-heading">{copy.formTitle}</h2>
            <p className={styles.formIntro}>{copy.formIntro}</p>
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
        <p className={styles.formEyebrow}>{copy.nextEyebrow}</p>
        <h2 id="contact-next-heading">{copy.nextTitle}</h2>
        <div className={styles.steps}>{copy.steps.map(([title, text], index) => <div key={title}>
          <span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
        </div>)}</div>
        <p className={styles.location}>{copy.location}</p>
      </section>
    </main>
  );
}
