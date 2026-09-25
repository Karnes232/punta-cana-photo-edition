import { ArrowRight, MailCheck } from "lucide-react";
import React, { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import esPhoneLabels from "react-phone-number-input/locale/es.json";
import frPhoneLabels from "react-phone-number-input/locale/fr.json";
import ptPhoneLabels from "react-phone-number-input/locale/pt.json";
import "react-phone-number-input/style.css";
import { recordConfirmedInquiry } from "../../utils/leadAnalytics";
import { localizedPath } from "../../utils/siteLocales";

// Country names in the phone picker; English is the library default.
const phoneLabels = { es: esPhoneLabels, pt: ptPhoneLabels, fr: frPhoneLabels };

const fieldLabelClass =
  "font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-gray-700";
const inputClass =
  "mt-2 w-full border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color";

// Checks the details with the elopementRequest function (validate-only, which
// catches bad phone numbers and email domains), then submits the
// Netlify form.
const submitInquiry = async (form, phone, phoneCountry) => {
  const formData = new FormData(form);
  formData.set("telephone", phone);
  formData.set("phone-country", phoneCountry);

  const validationPayload = Object.fromEntries(formData.entries());
  validationPayload.whatsapp = phone;
  validationPayload["validate-only"] = true;

  const validationResponse = await fetch(
    "/.netlify/functions/elopementRequest",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationPayload),
    },
  );
  const validationResult = await validationResponse.json().catch(() => ({}));

  if (!validationResponse.ok) {
    throw new Error(validationResult.error || "Form validation failed");
  }

  const formResponse = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  });

  if (!formResponse.ok) {
    throw new Error("Form submission failed");
  }
};

const HomeContactForm = ({ content, language }) => {
  const [status, setStatus] = useState("idle");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const phoneCountry = parsePhoneNumber(phone || "")?.country || "";
  const messages = content.formMessages;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!phoneCountry || !phone || !isPossiblePhoneNumber(phone)) {
      setStatus("error");
      setFormError(messages.phoneError);
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;

    try {
      await submitInquiry(form, phone, phoneCountry);
      form.reset();
      setPhone("");
      recordConfirmedInquiry("home-page");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setFormError(
        /email/i.test(error.message)
          ? messages.emailError
          : /phone/i.test(error.message)
            ? messages.phoneError
            : messages.error,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center border border-white/15 bg-white p-8 text-center text-black shadow-2xl"
      >
        <MailCheck
          aria-hidden="true"
          className="text-primary-color"
          size={44}
        />
        <h3 className="mt-5 font-crimson text-3xl font-medium">
          {messages.successTitle}
        </h3>
        <p className="mt-3 max-w-md font-montserrat text-base leading-7 text-gray-700">
          {messages.success}
        </p>
      </div>
    );
  }

  return (
    <form
      name="home-page"
      method="POST"
      onSubmit={handleSubmit}
      action={localizedPath("/contact/thankyou/", language)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="border border-white/15 bg-white p-6 text-black shadow-2xl md:p-9"
    >
      <input type="hidden" name="form-name" value="home-page" />
      <input type="hidden" name="source" value="Sertuin Events home page" />
      <input type="hidden" name="subject" value="New event planning inquiry" />
      <input type="hidden" name="phone-country" value={phoneCountry} />
      <p className="hidden">
        <label>
          {content.honeypotLabel} <input name="bot-field" />
        </label>
      </p>
      <h3 className="font-crimson text-3xl font-medium">{content.formTitle}</h3>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          {content.name}
          <input
            required
            name="name"
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className={fieldLabelClass}>
          {content.emailLabel}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={inputClass}
          />
        </label>
        <label className={fieldLabelClass}>
          {content.phone}
          <PhoneInput
            international
            labels={phoneLabels[language]}
            name="telephone"
            value={phone}
            onChange={(value) => {
              setPhone(value || "");
              if (status === "error") {
                setStatus("idle");
                setFormError("");
              }
            }}
            countrySelectProps={{
              "aria-label": messages.phoneCountry,
              required: true,
            }}
            numberInputProps={{
              "aria-label": content.phone,
              className:
                "w-full bg-transparent px-4 py-3 font-montserrat text-base font-normal text-black outline-none",
              autoComplete: "tel",
              inputMode: "tel",
            }}
            className="mt-2 border border-gray-300 bg-white px-3 transition focus-within:border-primary-color focus-within:ring-2 focus-within:ring-primary-color"
            required
          />
        </label>
        <label className={fieldLabelClass}>
          {content.eventType}
          <select
            required
            name="event-type"
            defaultValue=""
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          >
            <option value="" disabled>
              {content.selectEvent}
            </option>
            {content.eventOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={`${fieldLabelClass} sm:col-span-2`}>
          {content.date}
          <input
            required
            type="date"
            name="event-date"
            className={inputClass}
          />
        </label>
        <label className={`${fieldLabelClass} sm:col-span-2`}>
          {content.details}
          <textarea
            required
            name="additionalInfo"
            rows={5}
            className="mt-2 w-full resize-y border border-gray-300 px-4 py-3 font-montserrat text-base font-normal normal-case tracking-normal outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color"
          />
        </label>
      </div>
      {formError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 font-montserrat text-sm font-semibold text-red-700"
        >
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary-color px-6 py-4 font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? messages.sending : content.submit}
        <ArrowRight aria-hidden="true" size={18} />
      </button>
    </form>
  );
};

export default HomeContactForm;
