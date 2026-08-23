import React from "react";
import { passVisitorName } from "../../utils/thankYouName";

const TestimonialForm = () => {
  const inputClass =
    "mt-2 w-full rounded-sm border border-slate-300 bg-white px-4 py-3 font-montserrat text-base text-slate-950 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-100";

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <h1 className="font-crimson text-4xl font-medium text-slate-950 md:text-5xl">
          Tell Us About Your Experience
        </h1>
        <p className="mt-4 font-montserrat text-base leading-7 text-slate-600">
          Thank you for choosing Sertuin Events. Share your experience with our
          team; your feedback helps us continue improving every celebration.
        </p>
        <form
          name="testimonial"
          method="POST"
          onSubmit={passVisitorName("names")}
          action="/contact/thankyou/"
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
              Do not fill this out: <input name="bot-field" />
            </label>
          </p>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            Names *
            <input
              className={inputClass}
              type="text"
              name="names"
              autoComplete="name"
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            Service *
            <select
              className={inputClass}
              name="service"
              defaultValue=""
              required
            >
              <option value="">Select a service</option>
              <option value="Marriage Proposal Experience">
                Marriage Proposal Experience
              </option>
              <option value="Elopement or Vow Renewal">
                Elopement or Vow Renewal
              </option>
              <option value="Wedding Planning">Wedding Planning</option>
              <option value="Gender Reveal">Gender Reveal</option>
              <option value="Corporate Event">Corporate Event</option>
            </select>
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            Your experience *
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              name="testimonial"
              required
            />
          </label>
          <label className="block font-montserrat text-sm font-semibold text-slate-800">
            Optional photo
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
            Submit testimonial
          </button>
        </form>
      </div>
    </section>
  );
};

export default TestimonialForm;
