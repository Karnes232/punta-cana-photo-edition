import React, { useState, useEffect } from "react";
import ClientInfo from "./ClientInfo";
import { Trans } from "gatsby-plugin-react-i18next";
import PackageSelect from "./PackageSelect";
import Select from "react-select";
import PDFQuoteGenerator from "./pdfComponents/PDFQuoteGenerator";
import QuoteSummary from "./QuoteSummary";
import { db } from "../../config/firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import DepositInfo from "./DepositInfo";
const PackageQuoteForm = ({ packages, additions, companyInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    package: "",
    packagePrice: 0,
    additions: [],
    packagesDescription: "",
    deposit: 0,
    depositPercentage: 0,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation could be added here
    setFormSubmitted(true);
    let docName = `package-quotes`;
    await setDoc(doc(db, docName, formData.email), {
      name: formData.name,
      email: formData.email,
      telephone: formData.telephone,
      package: formData.package,
      packagePrice: formData.packagePrice,
      additions: formData.additions,
      packagesDescription: formData.packagesDescription,
      deposit: formData.deposit,
      depositPercentage: formData.depositPercentage,
      createdAt: new Date(),
    });
  };

  const fetchQuotes = async () => {
    try {
      const quotesCollection = collection(db, "package-quotes");
      const quotesSnapshot = await getDocs(quotesCollection);
      const quotesList = quotesSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setQuotes(quotesList);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const quoteOptions = quotes.map((quote) => ({
    value: quote.email,
    label: quote.email,
    quote: quote,
  }));

  const handleQuoteSelect = (selectedOption) => {
    setFormData({
      name: selectedOption.quote.name,
      email: selectedOption.quote.email,
      telephone: selectedOption.quote.telephone,
      package: selectedOption.quote.package,
      packagePrice: selectedOption.quote.packagePrice,
      additions: selectedOption.quote.additions,
      packagesDescription: selectedOption.quote.packagesDescription,
    });
  };

  return (
    <div className="w-full md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5">
      {!formSubmitted ? (
        <>
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
            <DepositInfo formData={formData} setFormData={setFormData} />

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
              >
                <Trans>Generate Quote</Trans>
              </button>
            </div>
          </form>
          <div className="mt-8 w-full">
            <h4 className="text-2xl mb-5 font-bold">
              <Trans>Previous Quotes</Trans>
            </h4>
            <Select
              options={quoteOptions}
              onChange={handleQuoteSelect}
              placeholder="Select client email..."
              isClearable
              className="mb-4"
            />
          </div>
        </>
      ) : (
        <div className="w-full">
          <h4 className="text-2xl mb-5 font-bold text-center">
            <Trans>Your Quote is Ready</Trans>
          </h4>

          <QuoteSummary formData={formData} />

          <PDFQuoteGenerator formData={formData} companyInfo={companyInfo} />

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

export default PackageQuoteForm;
