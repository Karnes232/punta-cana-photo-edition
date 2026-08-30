import React, { useEffect, useRef, useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import esLabels from "react-phone-number-input/locale/es.json";
import ptLabels from "react-phone-number-input/locale/pt.json";
import frLabels from "react-phone-number-input/locale/fr.json";
import "react-phone-number-input/style.css";

const COPY = {
  es: {
    placeholder: "Selecciona el país e ingresa el número",
    error:
      "Selecciona el país de procedencia e ingresa un número de teléfono válido.",
  },
  pt: {
    placeholder: "Selecione o país e digite o número",
    error: "Selecione o país de origem e digite um telefone válido.",
  },
  fr: {
    placeholder: "Sélectionnez le pays et saisissez le numéro",
    error: "Sélectionnez le pays d’origine et saisissez un numéro valide.",
  },
  en: {
    placeholder: "Select the country and enter the number",
    error: "Select the country of origin and enter a valid phone number.",
  },
};

/**
 * Shared international phone field for every public inquiry form.
 *
 * The visible value is stored in E.164 format and the detected ISO country is
 * submitted separately. A custom validity message prevents incomplete local
 * numbers or numbers without a country from reaching Netlify.
 */
const InternationalPhoneField = ({
  id,
  name = "phone",
  countryFieldName = "phone-country",
  value,
  onChange,
  language = "en-US",
  className = "mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus-within:border-primary-color focus-within:ring-2 focus-within:ring-primary-color/20",
  inputClassName = "min-w-0 flex-1 border-0 bg-transparent p-0 text-base outline-none",
  errorClassName = "mt-2 text-sm font-normal text-red-700",
  placeholder,
  required = true,
}) => {
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const copy = isPortuguese
    ? COPY.pt
    : isFrench
      ? COPY.fr
      : isSpanish
        ? COPY.es
        : COPY.en;
  const inputRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [touched, setTouched] = useState(false);
  const parsedCountry = parsePhoneNumber(value || "")?.country || "";
  const phoneCountry = parsedCountry || selectedCountry;
  const isComplete = Boolean(
    value && phoneCountry && isPossiblePhoneNumber(value),
  );
  const errorId = `${id}-error`;

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.setCustomValidity(!value || isComplete ? "" : copy.error);
  }, [copy.error, isComplete, value]);

  const handleInvalid = (event) => {
    setTouched(true);
    event.currentTarget.setCustomValidity(copy.error);
  };

  return (
    <>
      <PhoneInput
        ref={inputRef}
        international
        id={id}
        name={name}
        value={value}
        onChange={(nextValue) => {
          const normalizedValue = nextValue || "";
          onChange(normalizedValue);
          if (normalizedValue) setTouched(true);
        }}
        onCountryChange={(country) => setSelectedCountry(country || "")}
        onBlur={() => setTouched(true)}
        onInvalid={handleInvalid}
        placeholder={placeholder || copy.placeholder}
        autoComplete="tel"
        labels={
          isPortuguese
            ? ptLabels
            : isFrench
              ? frLabels
              : isSpanish
                ? esLabels
                : undefined
        }
        className={className}
        numberInputProps={{
          className: inputClassName,
          inputMode: "tel",
          "aria-describedby": touched && !isComplete ? errorId : undefined,
          "aria-invalid": touched && !isComplete ? "true" : undefined,
        }}
        required={required}
      />
      <input type="hidden" name={countryFieldName} value={phoneCountry} />
      {touched && !isComplete && (
        <p id={errorId} role="alert" className={errorClassName}>
          {copy.error}
        </p>
      )}
    </>
  );
};

export default InternationalPhoneField;
