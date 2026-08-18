import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import ContactInfo from "./ContactInfo";
import CartComponent from "./CartComponent";
const RentalForm = ({ language }) => {
  const { cartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    "form-name": "contact",
    name: "",
    email: "",
    telephone: "",
    Accommodation: "",
    additional: "",
  });
  const thankYouPath =
    language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/";
  const rentalItemSummary = cartItems
    .map(
      (item) =>
        `${item.rentalItem} - Quantity: ${item.quantity}${item.price ? ` - $${item.price * item.quantity}` : ""}`,
    )
    .join(", ");

  return (
    <>
      <form
        name="contact"
        method="POST"
        action={thankYouPath}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="cart"
        className="w-full md:w-full max-w- xl:max-w-5xl flex flex-col justify-center items-center mx-auto my-5"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="source" value="Event Rentals cart" />
        <input type="hidden" name="subject" value="New event rental request" />
        <input
          type="hidden"
          name="rental-items"
          value={rentalItemSummary || "No items selected"}
        />
        <p className="hidden">
          <label>
            Do not fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="w-80 lg:w-96 xl:w-full flex flex-col xl:flex-row xl:justify-center xl:mt-10 xl:gap-12">
          <div className="xl:w-[35rem] flex flex-col mt-5 xl:mt-24">
            <ContactInfo formData={formData} setFormData={setFormData} />
          </div>
          <CartComponent />
        </div>
        <input
          type="hidden"
          name="Rental Items"
          value={
            cartItems
              .map((item) => `${item.rentalItem} - Quantity: ${item.quantity}`)
              .join(", ") || "None"
          }
        />
        <button
          type="submit"
          className="px-4 py-2 my-3 bg-[#E4C05C] hover:bg-[#C6A855] text-white text-xs font-bold uppercase rounded hover:opacity-70 focus:outline-none focus:bg-gray-700"
        >
          Reserve Now
        </button>
      </form>
    </>
  );
};

export default RentalForm;
