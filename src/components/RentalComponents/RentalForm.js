import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart";
import ContactInfo from "./ContactInfo";
import CartComponent from "./CartComponent";

const RentalForm = ({ rentalItems }) => {
  const [name, setName] = useState("");
  const { clearCart, cartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    "form-name": "cart",
    name: "",
    email: "",
    Accommodation: "",
    additional: "",
    rentalItems: [],
  });
  function getFormData(object) {
    const newFormData = new FormData();
    Object.keys(object).forEach((key) => newFormData.append(key, object[key]));
    return newFormData;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedData = {
      ...formData,
      "Rental Items": cartItems.map(item => 
        `${item.rentalItem} - Quantity: ${item.quantity}`
      ).join(', ')
    };
    const dataFromForm = getFormData(formattedData);
    
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(dataFromForm).toString(),
    }).then(() => {
      console.log("Form successfully submitted");
      clearCart(); // Clear the cart after successful submission
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      rentalItems: JSON.stringify(cartItems), // Convert array to string
    });
  }, [cartItems]);

  console.log(formData);
  return (
    <>
      <form
        name="cart"
        method="POST"
        action={`/contact/thankyou/?name=${name}`}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        id="cart"
        className="w-full md:w-full max-w- xl:max-w-4xl flex flex-col justify-center items-center mx-auto my-5"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="cart" />
        
        <div className="w-80 flex flex-col xl:flex-row xl:mt-10 xl:gap-12">
          <div className="xl:w-[25rem] flex flex-col mt-5 xl:mt-24">
            <ContactInfo
              name={name}
              setName={setName}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <CartComponent />
        </div>
        <input
          type="hidden"
          name="Rental Items"
          value={cartItems.map(item => 
            `${item.rentalItem} - Quantity: ${item.quantity}`
          ).join(', ') || "None"}
        />
        <button
          type="submit"
          className="px-4 py-2 my-3 bg-[#E4C05C] hover:bg-[#C6A855] text-white text-xs font-bold uppercase rounded hover:opacity-70 focus:outline-none focus:bg-gray-700"
          onClick={() => {}}
        >
          Reserve Now
        </button>
      </form>
    </>
    // <div className="container mx-auto px-4 py-8">
    //   {cartItems.length > 0 ? (
    //     <div>
    //       {cartItems.map((item, index) => (
    //         <div key={index} className="p-4 border-b">
    //           {item.rentalItem} - Quantity: {item.quantity}
    //         </div>
    //       ))}
    //       <button
    //         onClick={clearCart}
    //         className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
    //       >
    //         Clear Cart
    //       </button>
    //     </div>
    //   ) : (
    //     <div>Your cart is empty</div>
    //   )}
    // </div>
  );
};

export default RentalForm;
