import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const QuoteSummary = ({ formData }) => {
  const additionsTotal = formData.additions.reduce(
    (sum, addition) => sum + parseFloat(addition.price || 0),
    0,
  );
  // Calculate subtotal, tax (ITBIS), and total
  const subtotal = parseFloat(formData.packagePrice) + additionsTotal;
  const taxRate = 0.18; // 18% ITBIS
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h5 className="font-bold mb-3">
        <Trans>Quote Summary</Trans>
      </h5>
      <p>
        <strong>
          <Trans>Client</Trans>:
        </strong>{" "}
        {formData.name}
      </p>
      <p>
        <strong>
          <Trans>Telephone</Trans>:
        </strong>{" "}
        {formData.telephone}
      </p>
      <p>
        <strong>
          <Trans>Email</Trans>:
        </strong>{" "}
        {formData.email}
      </p>
      <p>
        <strong>
          <Trans>Package</Trans>:
        </strong>{" "}
        {formData.package}
      </p>
      <p>
        <strong>
          <Trans>Package Price</Trans>:
        </strong>{" "}
        $
        {parseFloat(formData.packagePrice).toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </p>
      {formData.packagesDescription && (
        <p className="mt-2">
          <strong>
            <Trans>Description</Trans>:
          </strong>
          <br />
          {formData.packagesDescription}
        </p>
      )}

      {formData.additions && formData.additions.length > 0 && (
        <div className="mt-4">
          <strong>
            <Trans>Additions</Trans>:
          </strong>
          {formData.additions.map((addition, index) => (
            <div key={index} className="ml-4 mt-2">
              <p>
                <strong>{addition.addition}</strong> - $
                {parseFloat(addition.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
              {addition.description && (
                <p className="text-sm text-gray-600 ml-2">
                  {addition.description}
                </p>
              )}
            </div>
          ))}
          <p className="mt-3 font-bold">
            <Trans>Subtotal</Trans>: $
            {subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-3 font-bold">
            <Trans>Deposit</Trans>: $
            {formData.deposit.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
            {" - "}({formData.depositPercentage}%)
          </p>
          <p className="mt-3 font-bold">
            <Trans>ITBIS (18%)</Trans>: $
            {taxAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-3 font-bold">
            <Trans>Total</Trans>: $
            {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteSummary;
