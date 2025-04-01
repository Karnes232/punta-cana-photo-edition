import React, { useState } from "react";
import ClientInfo from "./ClientInfo";
import { Trans } from "gatsby-plugin-react-i18next";
import PackageSelect from "./PackageSelect";
import PDFQuoteGenerator from "./pdfComponents/PDFQuoteGenerator";

const PackageQuoteForm = ({ packages, additions }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    package: "",
    packagePrice: 0,
    additions: [],
    packagesDescription: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation could be added here
    setFormSubmitted(true);
  };
  return (
    <div className="w-full md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5">
      {!formSubmitted ? (
        <form
          name="PackageQuoteForm"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          id="PackageQuoteForm"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="PackageQuoteForm" />
          <h4 className="text-2xl mb-5 font-bold">
            <Trans>Client Information</Trans>
          </h4>
          <ClientInfo formData={formData} setFormData={setFormData} />
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
                <Trans>Price</Trans>:
              </strong>{" "}
              ${parseFloat(formData.packagePrice).toFixed(2)}
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
          </div>

          <PDFQuoteGenerator formData={formData} />

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
    // <form
    //   name="PackageQuoteForm"
    //   method="POST"
    //   // action={`/contact/thankyou/?name=${name}`}
    //   data-netlify="true"
    //   data-netlify-honeypot="bot-field"
    //   id="PackageQuoteForm"
    //   className="w-full md:w-full max-w-md  flex flex-col justify-center items-center mx-auto my-5"
    //   // onSubmit={handleSubmit}
    // >
    //   <input type="hidden" name="form-name" value="PackageQuoteForm" />
    //   <h4 className="text-2xl mb-5 font-bold">
    //     <Trans>Client Information</Trans>
    //   </h4>
    //   <ClientInfo formData={formData} setFormData={setFormData} />
    //   <PackageSelect
    //     packages={packages}
    //     additions={additions}
    //     formData={formData}
    //     setFormData={setFormData}
    //   />
    // </form>
  );
};

export default PackageQuoteForm;
