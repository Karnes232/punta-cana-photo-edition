import React, { useState } from "react";
import ClientInfo from "./ClientInfo";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import RentalItemSelect from "./RentalItemSelect";
import RentalPDFQuoteGenerator from "./pdfComponents/RentalPDFQuoteGenerator";

const RentalItemQuoteForm = ({ rentalItems, companyInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    selectedItems: [],
    itemsDescription: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleItemSelection = (item) => {
    const existingItem = formData.selectedItems.find(
      (i) => i.rentalItem === item.rentalItem,
    );

    if (existingItem) {
      setFormData({
        ...formData,
        selectedItems: formData.selectedItems.filter(
          (i) => i.rentalItem !== item.rentalItem,
        ),
      });
    } else {
      setFormData({
        ...formData,
        selectedItems: [...formData.selectedItems, item],
      });
    }
  };

  const totalPrice = formData.selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0,
  );
  console.log(formData);
  return (
    <div className="w-full md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5">
      {!formSubmitted ? (
        <form
          name="RentalItemQuoteForm"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          id="RentalItemQuoteForm"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="RentalItemQuoteForm" />
          <h4 className="text-2xl mb-5 font-bold">
            <Trans>Client Information</Trans>
          </h4>
          <ClientInfo formData={formData} setFormData={setFormData} />

          <div className="mt-6">
            <h4 className="text-2xl mb-5 font-bold">
              <Trans>Select Rental Items</Trans>
            </h4>
            <RentalItemSelect
              rentalItems={rentalItems}
              formData={formData}
              setFormData={setFormData}
            />

            <div className="relative z-0 mb-6 w-full group">
              <label
                htmlFor="ItemsDescription"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                <Trans>Additional Notes</Trans>
              </label>
              <textarea
                id="ItemsDescription"
                name="ItemsDescription"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-0 focus:border-black additionalInfo"
                placeholder={t("Additional notes...")}
                value={formData.itemsDescription}
                onChange={(e) =>
                  setFormData({ ...formData, itemsDescription: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
            >
              <Trans>Generate Quote</Trans>
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full">
          <h4 className="text-2xl mb-5 font-bold text-center">
            <Trans>Your Quote is Ready</Trans>
          </h4>

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
                    <Trans>units</Trans> x ${parseFloat(item.price).toFixed(2)}{" "}
                    = ${(parseFloat(item.price) * item.quantity).toFixed(2)}
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
                  .toFixed(2)}
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

          <RentalPDFQuoteGenerator
            formData={formData}
            companyInfo={companyInfo}
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setFormSubmitted(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              <Trans>Back to Form</Trans>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalItemQuoteForm;
