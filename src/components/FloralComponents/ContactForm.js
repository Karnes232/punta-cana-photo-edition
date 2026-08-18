import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import Additions from "./Additions";

const ContactForm = ({ item }) => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({
    "form-name": "contact",
    floralItem: item.floralItem,
    price: item.price,
    description: item.description,
    name: "",
    email: "",
    telephone: "",
    message: "",
    additions: [],
  });

  const formId = `floral-art-${item.id}`;
  const additions = formData.additions
    .map((addition) => `${addition.name}: $${addition.price}`)
    .join(", ");
  const thankYouPath =
    i18n.language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/";

  return (
    <>
      <form
        name="contact"
        method="POST"
        action={thankYouPath}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id={formId}
        className="w-full md:w-full max-w- xl:max-w-5xl flex flex-col justify-center items-center mx-auto my-5"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="source" value="Floral Art page" />
        <input type="hidden" name="subject" value="New floral item inquiry" />
        <input type="hidden" name="floral-item" value={item.floralItem} />
        <input type="hidden" name="item-price" value={item.price} />
        <input type="hidden" name="item-description" value={item.description} />
        <input
          type="hidden"
          name="selected-additions"
          value={additions || "None"}
        />
        <p className="hidden">
          <label>
            Do not fill this out: <input name="bot-field" />
          </label>
        </p>
        <div className="w-[310px] md:w-[25rem] lg:w-[20rem] flex flex-col lg:flex-col-reverse gap-4 xl:gap-12">
          <Additions
            additions={item.additions}
            formData={formData}
            setFormData={setFormData}
            idPrefix={formId}
          />
          <ContactInfo
            formData={formData}
            setFormData={setFormData}
            errors={{}}
            idPrefix={formId}
          />
        </div>
      </form>
      <div className="flex justify-center items-center lg:absolute lg:bottom-10 lg:right-1/2 lg:translate-x-1/2">
        <button
          type="submit"
          form={formId}
          className="bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded "
        >
          <Trans>Contact Us</Trans>
        </button>
      </div>
    </>
  );
};

export default ContactForm;
