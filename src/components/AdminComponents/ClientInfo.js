import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";

const ClientInfo = ({ formData, setFormData }) => {
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="email" className="contactFormLabel">
          <Trans>Email</Trans>
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="tel"
          name="telephone"
          id="telephone"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
        />
        <label htmlFor="telephone" className="contactFormLabel">
          <Trans>Telephone</Trans>
        </label>
      </div>
    </>
  );
};

export default ClientInfo;
