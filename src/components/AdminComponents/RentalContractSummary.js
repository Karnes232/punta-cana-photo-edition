import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const RentalContractSummary = ({ formData }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h5 className="font-bold mb-3">
        <Trans>Contract Summary</Trans>
      </h5>

      <div className="mb-4">
        <h6 className="font-semibold mb-2">
          <Trans>Representative Information</Trans>
        </h6>
        <p>
          <strong>
            <Trans>Name</Trans>:{" "}
          </strong>
          {formData.representativeName}
        </p>
      </div>

      <div className="mb-4">
        <h6 className="font-semibold mb-2">
          <Trans>Client Information</Trans>
        </h6>
        <p>
          <strong>
            <Trans>Name</Trans>:{" "}
          </strong>
          {formData.clientName}
        </p>
        <p>
          <strong>
            <Trans>ID</Trans>:{" "}
          </strong>
          {formData.clientId}
        </p>
        <p>
          <strong>
            <Trans>Telephone</Trans>:{" "}
          </strong>
          {formData.clientPhone}
        </p>
        <p>
          <strong>
            <Trans>Email</Trans>:{" "}
          </strong>
          {formData.clientEmail}
        </p>
      </div>

      <div className="mb-4">
        <h6 className="font-semibold mb-2">
          <Trans>Event Information</Trans>
        </h6>
        <p>
          <strong>
            <Trans>Event Type</Trans>:{" "}
          </strong>
          {formData.eventType}
        </p>
        <p>
          <strong>
            <Trans>Location</Trans>:{" "}
          </strong>
          {formData.eventLocation}
        </p>
        <p>
          <strong>
            <Trans>Date</Trans>:{" "}
          </strong>
          {formData.eventDate}
        </p>
        <p>
          <strong>
            <Trans>Time</Trans>:{" "}
          </strong>
          {formData.eventStartTime} - {formData.eventEndTime}
        </p>
      </div>

      <div className="mt-4">
        <h6 className="font-semibold mb-2">
          <Trans>Selected Items</Trans>
        </h6>
        {formData.selectedItems.map((item, index) => (
          <div key={index} className="ml-4 mt-2">
            <p>
              <strong>{item.rentalItem}</strong> - {item.quantity}{" "}
              <Trans>units</Trans> x $
              {parseFloat(item.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}{" "}
              = $
              {(parseFloat(item.price) * item.quantity).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2 },
              )}
            </p>
          </div>
        ))}
        <p className="mt-3 font-bold">
          <Trans>Total Price</Trans>: $
          {formData.selectedItems
            .reduce(
              (sum, item) => sum + parseFloat(item.price) * item.quantity,
              0,
            )
            .toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default RentalContractSummary;
