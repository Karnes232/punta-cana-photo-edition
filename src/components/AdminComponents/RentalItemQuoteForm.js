import React, { useState } from "react";
import ClientInfo from "./ClientInfo";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import RentalItemSelect from "./RentalItemSelect";
import RentalPDFQuoteGenerator from "./pdfComponents/RentalPDFQuoteGenerator";
import RentalQuoteSummary from "./RentalQuoteSummary";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // TODO: Add the form data to the database
    let docName = `rental-items-quotes`;
    // Save testimonial to Firestore
    await setDoc(doc(db, docName, formData.email), {
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      selectedItems: formData.selectedItems,
      itemsDescription: formData.itemsDescription,
      createdAt: new Date(),
    });
  };

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

          <RentalQuoteSummary formData={formData} />

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
