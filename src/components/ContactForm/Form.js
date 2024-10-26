import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MoreInfo from "./MoreInfo";
import OptionSelect from "./OptionSelect";
const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    setPhone(e);
  };
  return (
    <>
      <form
        name="contact"
        method="POST"
        action={`/contact/thankyou/?name=${name}`}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="contact"
        className="w-10/12 md:w-full max-w-md flex flex-col justify-center items-center mx-auto my-5"
      >
        <input type="hidden" name="form-name" value="contact" />
        <ContactInfo name={name} setName={setName} />
        <div className="relative z-0 mb-6 w-full group">
          <PhoneInput
            type="tel"
            name="telphone"
            id="telphone"
            className={`contactFormInput peer `}
            placeholder="Enter phone number"
            value={phone}
            onChange={handlePhoneChange}
            // onCountryChange={handleCountryChange}
          />
        </div>
        <OptionSelect />
        <MoreInfo />
        <button className="no-underline border py-2 xl:py-3 px-6 xl:px-8 xl:text-lg rounded-3xl mt-5 text-gray-400 border-gray-500 transition duration-500 hover:bg-black hover:text-white">
          Send Message
        </button>
      </form>
    </>
  );
};

export default Form;
