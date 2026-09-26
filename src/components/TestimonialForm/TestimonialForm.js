import React, { useState } from "react";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import {
  SERVICE_VALUES,
  shareExperienceContent,
} from "../../content/shareExperienceContent";
import { localizedPath, normalizeLanguage } from "../../utils/siteLocales";

// The title and intro come from the Share Your Experience document in Sanity;
// the field labels from shareExperienceContent.js.
const TestimonialForm = ({ language = "en-US", title, intro }) => {
  const [phone, setPhone] = useState("");
  const locale = normalizeLanguage(language);
  const copy = shareExperienceContent[locale];
  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100";

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <h1 className="font-crimson text-4xl font-medium text-slate-950 md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
          {intro}
        </p>
        <form
          name="testimonial"
          method="POST"
          onSubmit={passVisitorName("names")}
          action={localizedPath("/contact/thankyou/", locale)}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          encType="multipart/form-data"
          className="mt-9 space-y-6"
        >
          <input type="hidden" name="form-name" value="testimonial" />
          <input type="hidden" name="source" value="Client testimonial" />
          <input
            type="hidden"
            name="subject"
            value="New Sertuin Events client testimonial"
          />
          <p className="hidden">
            <label>
              {copy.honeypotLabel} <input name="bot-field" />
            </label>
          </p>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.names} *
            <input
              className={inputClass}
              type="text"
              name="names"
              autoComplete="name"
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.email} *
            <input
              className={inputClass}
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.phone} *
            <InternationalPhoneField
              id="testimonial-phone"
              name="phone"
              value={phone}
              onChange={setPhone}
              language={language}
              className={inputClass}
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.service} *
            <select
              className={inputClass}
              name="service"
              defaultValue=""
              required
            >
              <option value="">{copy.selectService}</option>
              {SERVICE_VALUES.map((value, index) => (
                <option value={value} key={value}>
                  {copy.services[index]}
                </option>
              ))}
            </select>
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.experience} *
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              name="testimonial"
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            {copy.photo}
            <input
              className={inputClass}
              type="file"
              name="testimonial-photo"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center bg-slate-950 px-6 py-4 font-montserrat text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-amber-700"
          >
            {copy.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default TestimonialForm;
