import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";

const ContactInfo = ({ name, setName }) => {
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
          onChange={(e) => setName(e.target.value)}
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
        />
        <label htmlFor="Accommodation" className="contactFormLabel">
          <Trans>Accommodation</Trans>
        </label>
      </div>
    </>
  );
};

export default ContactInfo;
