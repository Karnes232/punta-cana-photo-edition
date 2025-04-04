import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const RentalQuoteSummary = ({ formData }) => {
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

      <div className="mt-4">
        <strong>
          <Trans>Selected Items</Trans>:
        </strong>
        {formData.selectedItems.map((item, index) => (
          <div key={index} className="ml-4 mt-2">
            <p>
              <strong>{item.rentalItem}</strong> -{item.quantity}{" "}
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

      {formData.itemsDescription && (
        <div className="mt-4">
          <strong>
            <Trans>Additional Notes</Trans>:
          </strong>
          <p className="mt-1">{formData.itemsDescription}</p>
        </div>
      )}
    </div>
  );
};

export default RentalQuoteSummary;
