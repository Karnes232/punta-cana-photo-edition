import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby";

const ContactForm = ({ weddingPackage }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    "form-name": "wedding-package",
    weddingPackage: weddingPackage.title,
    description: weddingPackage.paragraph,
    name: "",
    email: "",
    telephone: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = t("Name is required");
    if (!formData.email.trim()) newErrors.email = t("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("Email is invalid");
    if (!formData.telephone.trim())
      newErrors.telephone = t("Telephone is required");
    if (!formData.date.trim()) newErrors.date = t("Date is required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(submissionData).toString(),
    })
      .then(() => {
        console.log("Form successfully submitted");
        navigate(`/contact/thankyou/?name=${formData.name}`);
        // You can add navigation or success message here
      })
      .catch((error) => console.log("Form submission error:", error));
  };

  return (
    <>
      <form
        name="wedding-package"
        method="POST"
        action={`/contact/thankyou/?name=${formData.name}`}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="wedding-package"
        className="w-full md:w-full max-w- xl:max-w-5xl flex flex-col justify-center items-center mx-auto my-5"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="wedding-package" />
        <div className="w-[310px] md:w-[25rem] lg:w-[20rem] flex flex-col lg:flex-col-reverse gap-4 xl:gap-12">
          <ContactInfo
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </div>
      </form>
      <div className="flex justify-center items-center lg:absolute lg:bottom-10 lg:right-1/2 lg:translate-x-1/2">
        <button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-1 px-4 rounded "
          onClick={handleSubmit}
        >
          <Trans>Contact Us</Trans>
        </button>
      </div>
    </>
  );
};

export default ContactForm;
