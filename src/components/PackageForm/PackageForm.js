import React from "react";
import { Check } from "lucide-react";
import { Trans } from "gatsby-plugin-react-i18next";
import { passVisitorName } from "../../utils/thankYouName";
const PackageForm = ({
  packageInformation,
  formData,
  setFormData,
  selectedAddOns,
  handleAddOnToggle,
  language,
}) => {
  const additions = [...(packageInformation.packages[0].additions || [])].sort(
    (a, b) => (a.price > b.price ? 1 : -1),
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

  // Only Enter and Space should activate a card. This previously fired on any
  // keydown, so tabbing away from a focused add-on silently toggled it and
  // changed the quoted price.
  const handleAddOnKeyDown = (event, addition) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    // Space would otherwise scroll the page.
    event.preventDefault();
    handleAddOnToggle(addition);
  };

  const calculateTotal = () => {
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = additions.find((item) => item.id === id);
      return sum + addOn.price;
    }, 0);
    return packageInformation.packages[0].price + addOnsTotal;
  };
  const selectedAddOnSummary = selectedAddOns
    .map((id) => additions.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `${item.addition} - $${item.price}`)
    .join(", ");
  const thankYouPath =
    language === "es" ? "/es/contact/thankyou/" : "/contact/thankyou/";
  return (
    <>
      <div className="mx-auto px-4 py-12 w-full lg:h-full  flex justify-center items-center">
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
              <h3 className="text-xl font-semibold">
                <Trans>Available Add-ons</Trans>
              </h3>
              {additions.map((addition, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors bg-gray-50 ${
                    selectedAddOns.includes(addition.id)
                      ? "border-blue-500 bg-blue-50 "
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleAddOnToggle(addition)}
                  onKeyDown={(event) => handleAddOnKeyDown(event, addition)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedAddOns.includes(addition.id)}
                  aria-label={`${addition.addition}, ${formatter.format(
                    addition.price,
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 ">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedAddOns.includes(addition.id)
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300 "
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

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border pb-20 lg:pb-10">
            <h3 className="text-xl font-semibold mb-6">
              <Trans>Book Your Session</Trans>
            </h3>
            <form
              method="POST"
              onSubmit={passVisitorName()}
              action={thankYouPath}
              className="space-y-4"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              name="package-detail"
              id="packageForm"
            >
              <input type="hidden" name="form-name" value="package-detail" />
              <input type="hidden" name="source" value="Package detail page" />
              <input
                type="hidden"
                name="subject"
                value="New package information request"
              />
              <input
                type="hidden"
                name="package-name"
                value={formData.packageName}
              />
              <input type="hidden" name="base-price" value={formData.price} />
              <input
                type="hidden"
                name="selected-add-ons"
                value={selectedAddOnSummary || "None"}
              />
              <input
                type="hidden"
                name="estimated-total"
                value={calculateTotal()}
              />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>
              <div>
                <label
                  htmlFor="packageForm-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Name</Trans>
                </label>
                <input
                  type="text"
                  id="packageForm-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="packageForm-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Email</Trans>
                </label>
                <input
                  type="email"
                  id="packageForm-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="packageForm-phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Phone</Trans>
                </label>
                <input
                  type="tel"
                  id="packageForm-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="packageForm-hotel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Hotel / Accommodation</Trans>
                </label>
                <input
                  type="text"
                  id="packageForm-hotel"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="packageForm-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Preferred Date</Trans>
                </label>
                <input
                  type="date"
                  id="packageForm-date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="packageForm-message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <Trans>Message</Trans>
                </label>
                <textarea
                  id="packageForm-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Trans>Contact Us</Trans>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageForm;
