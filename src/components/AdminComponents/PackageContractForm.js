import React, { useState } from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import ContractClientInfo from "./ContractClientInfo";
import PackageSelect from "./PackageSelect";
import EventInformation from "./EventInformation";
import ContractSummary from "./ContractSummary";
// Import your PDF generator component if you have one
// import PDFContractGenerator from './pdfComponents/PDFContractGenerator';

const PackageContractForm = ({ packages, additions, companyInfo }) => {
  const [formData, setFormData] = useState({
    representativeName: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientId: "",
    package: "",
    packagePrice: 0,
    additions: [],
    packagesDescription: "",
    eventType: "",
    eventLocation: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation could be added here
    setFormSubmitted(true);
  };
  console.log(formData);
  return (
    <div className="w-full md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5">
      {!formSubmitted ? (
        <form
          name="PackageContractForm"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          id="PackageContractForm"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="PackageContractForm" />

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

          <PackageSelect
            packages={packages}
            additions={additions}
            formData={formData}
            setFormData={setFormData}
          />

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
          <ContractSummary formData={formData} />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setFormSubmitted(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              <Trans>Back to Form</Trans>
            </button>
            <button
              onClick={() => {
                /* Add download/print functionality */
              }}
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
            >
              <Trans>Download Contract</Trans>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PackageContractForm;
