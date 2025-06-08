import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const ContractSummary = ({ formData }) => {
  return (
    <div className="w-full">
      <h4 className="text-2xl mb-5 font-bold text-center">
        <Trans>Your Contract is Ready</Trans>
      </h4>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h5 className="font-bold mb-3">
          <Trans>Contract Summary</Trans>
        </h5>

        <p>
          <strong>
            <Trans>Representative</Trans>:
          </strong>{" "}
          {formData.representativeName}
        </p>

        <div className="mt-4">
          <strong>
            <Trans>Client Details</Trans>:
          </strong>
          <p className="ml-4">
            <strong>
              <Trans>Name</Trans>:
            </strong>{" "}
            {formData.clientName}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>ID Number</Trans>:
            </strong>{" "}
            {formData.clientId}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Phone</Trans>:
            </strong>{" "}
            {formData.clientPhone}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Email</Trans>:
            </strong>{" "}
            {formData.clientEmail}
          </p>
        </div>

        <div className="mt-4">
          <strong>
            <Trans>Event Details</Trans>:
          </strong>
          <p className="ml-4">
            <strong>
              <Trans>Event Type</Trans>:
            </strong>{" "}
            {formData.eventType}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Location</Trans>:
            </strong>{" "}
            {formData.eventLocation}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Date</Trans>:
            </strong>{" "}
            {formData.eventDate}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Time</Trans>:
            </strong>{" "}
            {formData.eventStartTime} - {formData.eventEndTime}
          </p>
        </div>

        <div className="mt-4">
          <strong>
            <Trans>Package Details</Trans>:
          </strong>
          <p className="ml-4">
            <strong>
              <Trans>Selected Package</Trans>:
            </strong>{" "}
            {formData.package}
          </p>
          <p className="ml-4">
            <strong>
              <Trans>Package Price</Trans>:
            </strong>{" "}
            $
            {parseFloat(formData.packagePrice).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          {formData.packagesDescription && (
            <p className="ml-4">
              <strong>
                <Trans>Description</Trans>:
              </strong>
              <br />
              {formData.packagesDescription}
            </p>
          )}
        </div>

        {formData.additions && formData.additions.length > 0 && (
          <div className="mt-4">
            <strong>
              <Trans>Additional Services</Trans>:
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
            <div className="mt-3">
              <p className="font-bold">
                <Trans>Subtotal</Trans>: $
                {(
                  parseFloat(formData.packagePrice) +
                  formData.additions.reduce(
                    (sum, addition) => sum + parseFloat(addition.price || 0),
                    0,
                  )
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="font-bold">
                <Trans>Deposit</Trans>: $
                {formData.deposit.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
                {" - "}({formData.depositPercentage}%)
              </p>
              <p className="font-bold">
                <Trans>ITBIS (18%)</Trans>: $
                {(
                  (parseFloat(formData.packagePrice) +
                    formData.additions.reduce(
                      (sum, addition) => sum + parseFloat(addition.price || 0),
                      0,
                    )) *
                  0.18
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="font-bold">
                <Trans>Total Contract Value</Trans>: $
                {(
                  (parseFloat(formData.packagePrice) +
                    formData.additions.reduce(
                      (sum, addition) => sum + parseFloat(addition.price || 0),
                      0,
                    )) *
                  1.18
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractSummary;
