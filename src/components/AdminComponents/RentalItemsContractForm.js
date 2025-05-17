import React, { useState } from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import ContractClientInfo from "./ContractClientInfo";
import EventInformation from "./EventInformation";
import RentalItemSelect from "./RentalItemSelect";
import RentalContractSummary from "./RentalContractSummary";
import RentalPDFContractGenerator from "./pdfComponents/RentalPDFContractGenerator";

const RentalItemsContractForm = ({ companyInfo, rentalItems }) => {
  const [formData, setFormData] = useState({
    representativeName: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientId: "",
    eventType: "",
    eventLocation: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    selectedItems: [],
    setupIncluded: false,
    // Add any additional rental-specific fields here
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  return (
    <div className="w-full md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5">
      {!formSubmitted ? (
        <form
          name="RentalItemsContractForm"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          id="RentalItemsContractForm"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="form-name"
            value="RentalItemsContractForm"
          />

          <h4 className="text-2xl mb-5 font-bold">
            <Trans>Representative Information</Trans>
          </h4>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="representativeName"
              id="representativeName"
              className="contactFormInput peer"
              placeholder=" "
              required
              value={formData.representativeName}
              onChange={(e) =>
                setFormData({ ...formData, representativeName: e.target.value })
              }
            />
            <label htmlFor="representativeName" className="contactFormLabel">
              <Trans>Representative Name</Trans>
            </label>
          </div>

          <ContractClientInfo formData={formData} setFormData={setFormData} />
          <EventInformation formData={formData} setFormData={setFormData} />

          <div className="mt-6">
            <h4 className="text-2xl mb-5 font-bold">
              <Trans>Select Rental Items</Trans>
            </h4>
            <RentalItemSelect
              rentalItems={rentalItems}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
            >
              <Trans>Generate Contract</Trans>
            </button>
          </div>
        </form>
      ) : (
        <>
          <RentalContractSummary formData={formData} />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setFormSubmitted(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              <Trans>Back to Form</Trans>
            </button>
            <RentalPDFContractGenerator
              formData={formData}
              companyInfo={companyInfo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RentalItemsContractForm;
