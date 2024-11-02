import React from "react";

const Form = ({ formData, setFormData }) => {
  return (
    <>
      <form
        //   onSubmit={handleSubmit}
        action={`/contact/thankyou/?name=${formData.name}`}
        className="space-y-4"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="packageForm"
        id="packageForm"
      >
        <div className="hidden">
          <input type="text" name="name" defaultValue={formData.name} />
          <input type="email" name="email" defaultValue={formData.email} />
          <input type="tel" name="phone" defaultValue={formData.phone} />
          <input type="date" name="date" defaultValue={formData.date} />
          <textarea name="message" value={formData.message}></textarea>
        </div>
      </form>
    </>
  );
};

export default Form;
