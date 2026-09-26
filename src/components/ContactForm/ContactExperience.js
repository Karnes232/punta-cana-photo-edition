import React from 'react';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactContent } from '../../content/contactContent';
import { localizedPath, normalizeLanguage } from '../../utils/siteLocales';
import { passVisitorName } from '../../utils/thankYouName';

const purposes = ['QUESTION', 'EVENT', 'COLLABORATION', 'OTHER'];

// "18295222900" -> "+1 829 522 2900" (North American numbers); other lengths
// are shown as +digits.
const displayPhone = (digits) =>
  digits.length === 11 && digits.startsWith('1')
    ? `+1 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
    : `+${digits}`;

// Shared class strings. Values match the page's original design exactly, so
// most are arbitrary values rather than the nearest Tailwind scale step.
const focusRing = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#b79a5d] focus-visible:outline-offset-4';
const label = 'font-montserrat text-[10px] font-semibold leading-[1.6] tracking-[.19em]';
const fieldLabel = 'mb-[9px] block text-[12px] font-semibold leading-[1.5]';
const field = 'mb-[19px] min-w-0';
const input = 'box-border w-full rounded-lg border border-[#d5d0c7] bg-white px-[14px] py-[13px] text-[14px] leading-[1.5] text-[#29251e] placeholder:text-[#78736b] placeholder:opacity-100 focus:border-[#95783e] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#95783e] max-[760px]:text-[16px]';
const smallNote = 'text-[10px] leading-[1.7] text-[#726b60]';
const required = <span className="text-[#80651f]" aria-hidden="true">*</span>;

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
    <main className="bg-[#f7f5f0] text-[#25231f]">
      <section className="px-7 pb-20 pt-[170px] [background:radial-gradient(ellipse_at_5%_15%,#302b20_0,transparent_55%),#151411] max-[760px]:px-5 max-[760px]:pb-10 max-[760px]:pt-[120px]" aria-labelledby="contact-heading">
        <div className="m-auto grid max-w-[1200px] grid-cols-[1fr_1.12fr] gap-20 [align-items:start] max-[1050px]:gap-[35px] max-[760px]:max-w-[550px] max-[760px]:grid-cols-1 max-[760px]:gap-[34px]">
          <div className="pt-[30px] text-[#f9f7f1] max-[760px]:px-[2px] max-[760px]:pb-0 max-[760px]:pt-[5px]">
            <p className={`${label} mb-6 flex items-center gap-3 text-[#dcc48c]`}><span className="h-px w-7 bg-[#dcc48c]" aria-hidden="true" />{page.heroEyebrow}</p>
            <h1 id="contact-heading" className="mb-7 max-w-[490px] text-[length:clamp(48px,4.5vw,68px)] font-normal leading-[1.02] tracking-[-.025em] max-[760px]:max-w-[440px] max-[760px]:text-[50px]">{page.heroTitle}</h1>
            <p className="m-0 max-w-[455px] font-montserrat text-[15px] leading-[1.9] text-[#d8d3c9] max-[760px]:text-[14px]">{page.heroIntro}</p>
            <p className="mt-6 text-[21px] italic leading-[1.5] text-[#dcc48c]">{page.welcome}</p>
            <div className="mt-[52px] max-w-[455px] max-[760px]:mt-7">
              <p className={`${label} mb-[15px] text-[#c5bdac]`}>{page.directLabel}</p>
              {methods.map(({ href, label: methodLabel, detail, Icon }) => (
                <a href={href} className={`group flex items-center gap-[17px] border-t border-t-[#4b4539] py-[18px] text-[#f9f7f1] no-underline max-[760px]:py-3 ${focusRing}`} key={href}>
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-[#dcc48c]" />
                  <span>
                    <strong className="block text-[20px] font-normal leading-[1.3] max-[760px]:text-[18px]">{methodLabel}</strong>
                    <small className="mt-1 block font-montserrat text-[12px] text-[#c7c0b4] [overflow-wrap:anywhere]">{detail}</small>
                  </span>
                  <ArrowUpRight size={19} aria-hidden="true" className="ml-auto shrink-0 text-[#bdb4a3] transition-transform duration-200 ease-[ease] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] motion-reduce:transition-none" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] border border-[#e7dfcf] bg-[#fffefa] p-[38px] [box-shadow:0_24px_80px_#0003] max-[1050px]:p-7 max-[760px]:rounded-[14px] max-[760px]:px-[22px] max-[760px]:py-7">
            <p className={`${label} mb-3 text-[#80651f]`}>{page.formEyebrow}</p>
            <h2 id="contact-form-heading" className="mb-[10px] text-[38px] font-normal leading-[1.08] tracking-[-.02em] max-[760px]:text-[33px]">{page.formTitle}</h2>
            <p className="mb-6 font-montserrat text-[13px] leading-[1.7] text-[#676157]">{page.formIntro}</p>
            <form name="contact" id="contact" method="POST"
              action={localizedPath('/contact/thankyou/', locale)}
              onSubmit={passVisitorName('name')} data-netlify="true"
              data-netlify-honeypot="bot-field" aria-labelledby="contact-form-heading"
              className="font-montserrat">
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="source" value="Contact page" />
              <input type="hidden" name="language" value={locale} />
              <p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <fieldset className="mb-[23px] min-w-0 p-0 [border:0]">
                <legend className={fieldLabel}>{copy.purpose}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {copy.purposes.map((purposeLabel, index) => (
                    <label key={purposes[index]} className="relative min-w-0 cursor-pointer">
                      <input type="radio" name="event-type" value={purposes[index]} defaultChecked={index === 0} className="peer absolute h-px w-px opacity-0" />
                      <span className="flex h-full min-h-11 items-center rounded-lg border border-[#dcd7ce] px-3 py-[10px] text-[11px] leading-[1.5] text-[#5e584f] peer-checked:border-[#92753c] peer-checked:bg-[#f0e8d7] peer-checked:text-[#403112] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[#80651f]">{purposeLabel}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid grid-cols-2 gap-4 max-[1050px]:grid-cols-1 max-[1050px]:gap-0">
                <div className={field}><label htmlFor="contact-name" className={fieldLabel}>{copy.name} {required}</label>
                  <input id="contact-name" name="name" autoComplete="name" placeholder={copy.namePlaceholder} required maxLength={150} className={input} />
                </div>
                <div className={field}><label htmlFor="contact-email" className={fieldLabel}>{copy.email} {required}</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required maxLength={254} className={input} />
                </div>
              </div>
              <div className={field}><label htmlFor="contact-phone" className={fieldLabel}>{copy.phone} <small className="text-[11px] font-normal text-[#71695c]">({copy.optional})</small></label>
                <input id="contact-phone" name="telephone" type="tel" autoComplete="tel" placeholder="+1 829 000 0000" aria-describedby="contact-phone-hint" maxLength={40} className={input} />
                <p id="contact-phone-hint" className={`${smallNote} mt-[7px]`}>{copy.phoneHint}</p>
              </div>
              <div className={field}><label htmlFor="contact-message" className={fieldLabel}>{copy.message} {required}</label>
                <textarea id="contact-message" name="additional" rows={4} placeholder={copy.messagePlaceholder} required maxLength={6000} className={`${input} min-h-[118px] resize-y`} />
              </div>
              <button className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[9px] border border-[#25231f] bg-[#25231f] px-5 py-4 text-[13px] font-semibold text-white transition-[background] duration-200 ease-[ease] hover:bg-[#51442b] motion-reduce:transition-none ${focusRing}`} type="submit">{copy.submit}<ArrowRight size={20} aria-hidden="true" /></button>
              <p className={`${smallNote} mt-[13px]`}>{copy.note}</p>
            </form>
          </div>
        </div>
      </section>
      <section className="m-auto max-w-[1200px] px-7 pb-[55px] pt-[72px] max-[760px]:max-w-[550px] max-[760px]:px-6 max-[760px]:pb-[35px] max-[760px]:pt-[45px]" aria-labelledby="contact-next-heading">
        <p className={`${label} mb-3 text-[#80651f]`}>{page.nextEyebrow}</p>
        <h2 id="contact-next-heading" className="mb-10 max-w-[690px] text-[length:clamp(34px,3.5vw,46px)] font-normal leading-[1.12] max-[760px]:mb-7">{page.nextTitle}</h2>
        <div className="grid grid-cols-3 gap-12 max-[760px]:grid-cols-1 max-[760px]:gap-[25px]">{(page.nextSteps || []).map(({ _key, title, body }, index) => <div key={_key} className="border-t border-t-[#d8cbae] pt-5">
          <span className="font-montserrat text-[11px] text-[#80651f]">0{index + 1}</span>
          <h3 className="my-3 text-[26px] font-normal leading-[1.2] max-[760px]:my-2">{title}</h3>
          <p className="font-montserrat text-[13px] leading-[1.85] text-[#686156]">{body}</p>
        </div>)}</div>
        <p className="mt-12 border-t border-t-[#e0d9cd] pt-6 text-[21px] italic text-[#756446]">{page.location}</p>
      </section>
    </main>
  );
}
