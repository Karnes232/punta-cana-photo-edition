import React, { useEffect, useState } from "react";
import ContactInfo from "./ContactInfo";
import Additions from "./Additions";
import { Trans } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby"
const ContactForm = ({ item }) => {
  const [host, setHost] = useState("");
  const [formData, setFormData] = useState({
    "form-name": "floral-art",
    floralItem: item.floralItem,
    price: item.price,
    description: item.description,
    name: "",
    email: "",
    message: "",
    additions: [],
  });

  let redirectHref = `${host}/contact/thankyou/?name=${formData.name}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'additions') {
        // Handle additions array specifically
        const formattedAdditions = value.map(addition => 
          typeof addition === 'object' ? 
            `${addition.name}: ${addition.price}` : 
            addition
        ).join(', ');
        submissionData.append(key, formattedAdditions);
      } else {
        submissionData.append(key, value);
      }
    });

    // Submit the form
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(submissionData).toString()
    })
      .then(() => {
        console.log('Form successfully submitted');
        //window.location.href = redirectHref;
        navigate(`/contact/thankyou/?name=${formData.name}`)
        // You can add navigation or success message here
      })
      .catch((error) => console.log('Form submission error:', error));
  };

  useEffect(() => {
    setHost(window.location.origin);
  }, []);

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
          />
        </div>
      </form>
      <div className="absolute bottom-10 right-1/2 translate-x-1/2">
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
