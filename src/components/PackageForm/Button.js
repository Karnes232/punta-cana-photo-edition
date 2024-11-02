import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Check } from "lucide-react";
import { Dialog } from "@headlessui/react";
const Button = ({
  text,
  customClass,
  sticky,
  packageInformation,
  formData,
  setFormData,
  handleSubmit,
  selectedAddOns,
  setSelectedAddOns,
  handleAddOnToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let additions = packageInformation.packages[0].additions?.sort((a, b) =>
    a.price > b.price ? 1 : -1,
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = additions.find((item) => item.id === id);
      return sum + addOn.price;
    }, 0);
    return packageInformation.packages[0].price + addOnsTotal;
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Handle form submission here
  //     console.log({
  //       ...formData,
  //       totalPrice: calculateTotal(),
  //       selectedAddOns: selectedAddOns.map((id) =>
  //         additions.find((addition) => addition.id === id),
  //       ),
  //     });
  //   };

  return (
    <>
      <div
        className={`mb-2 ${
          sticky
            ? "fixed bottom-20 right-6 xl:right-10 z-50 bg-white rounded"
            : "w-fit"
        }`}
      >
        <button
          type="submit"
          onClick={() => setIsOpen(true)}
          className={`bg-[#94a3b8] hover:opacity-80 text-white font-bold py-1 px-4 rounded ${customClass}`}
        >
          {text}
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen h-screen overflow-scroll bg-white flex-col">
          <div className="fixed top-5 right-5">
            <button
              className="p-2 text-2xl text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>
          </div>
          <div className="mx-auto px-4 py-12 w-full h-full bg-gray-50 flex justify-center items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
              <div className="space-y-8">
                <div className="text-center p-6  rounded-lg">
                  <h2 className="text-3xl font-semibold mb-2">
                    {packageInformation.heroHeading}
                  </h2>
                  <p className="text-4xl font-bold text-blue-600">
                    ${calculateTotal()}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Base price:{" "}
                    {formatter.format(packageInformation.packages[0].price)}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Available Add-ons</h3>
                  {additions.map((addition, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddOns.includes(addition.id)
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => handleAddOnToggle(addition)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              selectedAddOns.includes(addition.id)
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300"
                            }`}
                          >
                            {selectedAddOns.includes(addition.id) && (
                              <Check className="w-3 h-3" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{addition.addition}</h4>
                            {/* <p className="text-sm text-gray-600">{addOn.description}</p>*/}
                          </div>
                        </div>
                        <span className="font-semibold">${addition.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-6">
                  Book Your Session
                </h3>
                <form
                  onSubmit={handleSubmit}
                  action={`/contact/thankyou/?name=${formData.name}`}
                  className="space-y-4"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  name="packageForm"
                  id="packageForm"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-2 border rounded-md"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Button;
