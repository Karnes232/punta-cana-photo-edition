import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import Additions from "./Additions";
import { Trans, useTranslations } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby";
const ContactForm = ({ item }) => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    "form-name": "floral-art",
    floralItem: item.floralItem,
    price: item.price,
    description: item.description,
    name: "",
    email: "",
    telephone: "",
    message: "",
    additions: [],
  });

  // Add error state
  const [errors, setErrors] = useState({});

  // Add validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = t("Name is required");
    if (!formData.email.trim()) newErrors.email = t("Email is required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("Email is invalid");
    if (!formData.telephone.trim())
      newErrors.telephone = t("Telephone is required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check validation before submitting
    if (!validateForm()) {
      return;
    }

    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "additions") {
        // Handle additions array specifically
        const formattedAdditions = value
          .map((addition) =>
            typeof addition === "object"
              ? `${addition.name}: ${addition.price}`
              : addition,
          )
          .join(", ");
        submissionData.append(key, formattedAdditions);
      } else {
        submissionData.append(key, value);
      }
    });

    // Submit the form
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
        name="floral-art"
        method="POST"
        action={`/contact/thankyou/?name=${formData.name}`}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="floral-art"
        className="w-full md:w-full max-w- xl:max-w-5xl flex flex-col justify-center items-center mx-auto my-5"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="floral-art" />
        <div className="w-[310px] md:w-[25rem] lg:w-[20rem] flex flex-col lg:flex-col-reverse gap-4 xl:gap-12">
          <Additions
            additions={item.additions}
            formData={formData}
            setFormData={setFormData}
          />
          <ContactInfo
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 text-sm mt-2 text-center">
          <Trans>Please fill in all required fields correctly</Trans>
        </div>
      )}
      <div className="flex justify-center items-center lg:absolute lg:bottom-10 lg:right-1/2 lg:translate-x-1/2">
        <button
          className="bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded "
          onClick={handleSubmit}
        >
          <Trans>Contact Us</Trans>
        </button>
      </div>
    </>
  );
};

export default ContactForm;
