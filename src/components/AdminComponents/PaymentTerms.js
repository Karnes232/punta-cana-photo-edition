import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";

const PaymentTerms = ({ formData, setFormData }) => {
  return (
    <>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="paymentTerms"
          id="paymentTerms"
          className="contactFormInput peer"
          placeholder="Client agrees to pay the remaining balance 1 day before the event."
          required
          value={formData.paymentTerms}
          onChange={(e) =>
            setFormData({ ...formData, paymentTerms: e.target.value })
          }
        />
        <label htmlFor="paymentTerms" className="">
          <Trans>Payment Terms</Trans>
        </label>
      </div>
    </>
  );
};

export default PaymentTerms;
