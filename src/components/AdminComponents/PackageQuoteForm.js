import React, { useState } from "react";
import ClientInfo from "./ClientInfo";
import { Trans } from "gatsby-plugin-react-i18next";
import PackageSelect from "./PackageSelect";

const PackageQuoteForm = ({ packages, additions }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    package: "",
    packagePrice: 0,
    additions: [],
  });

  console.log(formData);
  return (
    <form
      name="PackageQuoteForm"
      method="POST"
      // action={`/contact/thankyou/?name=${name}`}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      id="PackageQuoteForm"
      className="w-full md:w-full max-w-md  flex flex-col justify-center items-center mx-auto my-5"
      // onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="PackageQuoteForm" />
      <h4 className="text-2xl font-bold">
        <Trans>Client Information</Trans>
      </h4>
      <ClientInfo formData={formData} setFormData={setFormData} />
      <PackageSelect
        packages={packages}
        additions={additions}
        formData={formData}
        setFormData={setFormData}
      />
    </form>
  );
};

export default PackageQuoteForm;
