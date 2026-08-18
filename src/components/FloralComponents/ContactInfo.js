import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";

const ContactInfo = ({ formData, setFormData, errors, idPrefix }) => {
  const { t } = useTranslation();
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  return (
    <div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="name"
          id={`${idPrefix}-name`}
          className={`contactFormInput peer ${errors.name ? "border-red-500" : ""}`}
          placeholder=" "
          required
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor={`${idPrefix}-name`} className="contactFormLabel">
          <Trans>Full Name</Trans>
        </label>
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          id={`${idPrefix}-email`}
          className={`contactFormInput peer ${errors.email ? "border-red-500" : ""}`}
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label htmlFor={`${idPrefix}-email`} className="contactFormLabel">
          <Trans>Email</Trans>
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="tel"
          name="telephone"
          id={`${idPrefix}-telephone`}
          className={`contactFormInput peer ${errors.telephone ? "border-red-500" : ""}`}
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label htmlFor={`${idPrefix}-telephone`} className="contactFormLabel">
          <Trans>Telephone</Trans>
        </label>
        {errors.telephone && (
          <span className="text-red-500 text-sm">{errors.telephone}</span>
        )}
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="shippingAddress"
          id={`${idPrefix}-shipping-address`}
          className="contactFormInput peer"
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label
          htmlFor={`${idPrefix}-shipping-address`}
          className="contactFormLabel"
        >
          <Trans>Ship To</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <label
          htmlFor={`${idPrefix}-message`}
          className="block mb-2 text-sm font-medium text-gray-500"
        >
          <Trans>Message</Trans>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-0 focus:border-black additionalInfo"
          placeholder={t("Leave a comment...")}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default ContactInfo;
