import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";

const ContactInfo = ({ name, setName, formData, setFormData }) => {
  const { t } = useTranslation();
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  return (
    <>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="name"
          name="name"
          id="name"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="name" className="contactFormLabel">
          <Trans>Full Name</Trans>
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          id="email"
          className="contactFormInput peer"
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label htmlFor="email" className="contactFormLabel">
          <Trans>Email</Trans>
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="Accommodation"
          id="Accommodation"
          className="contactFormInput peer"
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label htmlFor="Accommodation" className="contactFormLabel">
          <Trans>Accommodation</Trans>
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <label
          htmlFor="additional"
          className="block mb-2 text-sm font-medium text-gray-500"
        >
          <Trans>Message</Trans>
        </label>
        <textarea
          id="additional"
          name="additional"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-0 focus:border-black additionalInfo"
          placeholder={t("Leave a comment...")}
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  );
};

export default ContactInfo;
