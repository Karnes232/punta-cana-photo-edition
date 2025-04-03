import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const ContractClientInfo = ({ formData, setFormData }) => {
  return (
    <>
      <h4 className="text-2xl mb-5 font-bold">
        <Trans>Client Information</Trans>
      </h4>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="clientName"
          id="clientName"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
        />
        <label htmlFor="clientName" className="contactFormLabel">
          <Trans>Client Name</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="clientEmail"
          id="clientEmail"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.clientEmail}
          onChange={(e) =>
            setFormData({ ...formData, clientEmail: e.target.value })
          }
        />
        <label htmlFor="clientEmail" className="contactFormLabel">
          <Trans>Client Email</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="tel"
          name="clientPhone"
          id="clientPhone"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.clientPhone}
          onChange={(e) =>
            setFormData({ ...formData, clientPhone: e.target.value })
          }
        />
        <label htmlFor="clientPhone" className="contactFormLabel">
          <Trans>Client Phone Number</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="clientId"
          id="clientId"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.clientId}
          onChange={(e) =>
            setFormData({ ...formData, clientId: e.target.value })
          }
        />
        <label htmlFor="clientId" className="contactFormLabel">
          <Trans>Client ID Number</Trans>
        </label>
      </div>
    </>
  );
};

export default ContractClientInfo;
