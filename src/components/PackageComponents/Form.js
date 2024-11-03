import React from "react";

const Form = ({ formData }) => {
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
          <input type="hidden" name="form-name" value="packageForm" />
          <input type="text" name="name" defaultValue={formData.name} />
          <input type="email" name="email" defaultValue={formData.email} />
          <input type="tel" name="phone" defaultValue={formData.phone} />
          <input type="date" name="date" defaultValue={formData.date} />
          <textarea name="message" value={formData.message}></textarea>
          <input type="text" name="AddOn1" defaultValue={formData.addOn1} />
          <input type="text" name="AddOn2" defaultValue={formData.addOn2} />
          <input type="text" name="AddOn3" defaultValue={formData.addOn3} />
          <input type="text" name="AddOn4" defaultValue={formData.addOn4} />
          <input type="text" name="AddOn5" defaultValue={formData.addOn5} />
          <input type="text" name="AddOn6" defaultValue={formData.addOn6} />
          <input type="number" name="price" defaultValue={formData.price} />
          <input
            type="text"
            name="packageName"
            defaultValue={formData.packageName}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
