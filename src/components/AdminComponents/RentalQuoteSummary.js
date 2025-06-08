import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const RentalQuoteSummary = ({ formData }) => {
  const subtotal = formData.selectedItems.reduce((sum, item) => {
    const originalPrice = parseFloat(item.price) * item.quantity;
    const discount = item.discount ? originalPrice * (item.discount / 100) : 0;
    return sum + (originalPrice - discount);
  }, 0);
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

      <div className="mt-4">
        <strong>
          <Trans>Selected Items</Trans>:
        </strong>
        {formData.selectedItems.map((item, index) => {
          const originalPrice = parseFloat(item.price) * item.quantity;
          const discount = item.discount
            ? originalPrice * (item.discount / 100)
            : 0;
          const finalPrice = originalPrice - discount;

          return (
            <div key={index} className="ml-4 mt-2">
              <p>
                <strong>{item.rentalItem}</strong> - {item.quantity}{" "}
                <Trans>units</Trans> x $
                {parseFloat(item.price).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                = $
                {originalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
                {item.discount > 0 && (
                  <span>
                    {" "}
                    - {item.discount}% <Trans>discount</Trans> (-$
                    {discount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                    ) = $
                    {finalPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </p>
            </div>
          );
        })}
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
          <Trans>Total Price</Trans>: $
          {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
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
