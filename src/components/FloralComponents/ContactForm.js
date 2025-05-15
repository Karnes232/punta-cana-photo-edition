import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import Additions from "./Additions";

const ContactForm = ({ item }) => {
  const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    name: item.floralItem,
    price: item.price,
    description: item.description,
    name: "",
    email: "",
    message: "",
    additions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <>
      <form
        name="floral-art"
        method="POST"
        action={`/contact/thankyou/?name=${name}`}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="floral-art"
        className="w-full md:w-full max-w- xl:max-w-5xl flex flex-col justify-center items-center mx-auto my-5"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="floral-art" />
        <div className="w-[310px] md:w-[25rem] lg:w-[20rem] flex flex-col lg:flex-col-reverse xl:mt-10 gap-4 xl:gap-12">
          <Additions
            additions={item.additions}
            formData={formData}
            setFormData={setFormData}
          />
          <ContactInfo
            name={name}
            setName={setName}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </form>
    </>
  );
};

export default ContactForm;
