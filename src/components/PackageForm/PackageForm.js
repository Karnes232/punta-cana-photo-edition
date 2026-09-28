import React, { useState } from "react";
import { Check } from "lucide-react";
import { Trans } from "gatsby-plugin-react-i18next";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import { getMenuItemLabel } from "../../data/proposalDinnerMenu";
import DinnerMenuSelector, {
  createEmptyDinnerSelection,
} from "./DinnerMenuSelector";

// The booking form of a proposal package page. The package's name, price and
// extras come from Sanity (the Proposal Package, its Proposal Extras and their
// names in this language); the field labels come from the translation files.
const PackageForm = ({
  packageName,
  price,
  addOns = [],
  dinnerIncluded = false,
  title,
  submitLabel,
  language,
  sideMedia,
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    hotel: "",
    message: "",
  });
  const [dinnerSelection, setDinnerSelection] = useState(
    createEmptyDinnerSelection,
  );
  const additions = [...addOns].sort(
    (a, b) => Number(a.price || 0) - Number(b.price || 0),
  );
  const dinnerAddition = additions.find(
    (addition) => addition.kind === "dinner",
  );
  const dinnerIsSelected = Boolean(
    dinnerAddition && selectedAddOns.includes(dinnerAddition.id),
  );
  const dinnerIsAvailable = Boolean(dinnerIncluded || dinnerIsSelected);
  const handleAddOnToggle = (addition) => {
    setSelectedAddOns((prev) =>
      prev.includes(addition.id)
        ? prev.filter((id) => id !== addition.id)
        : [...prev, addition.id],
    );
  };
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
      return sum + Number(addOn?.price || 0);
    }, 0);
    return (price || 0) + addOnsTotal;
  };
  const selectedAddOnSummary = selectedAddOns
    .map((id) => additions.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `${item.name} - $${item.price}`)
    .join(", ");
  const chooseLater =
    language === "pt"
      ? "Escolher depois com o coordenador"
      : language === "fr"
        ? "Choisir plus tard avec la coordinatrice"
        : language === "es"
          ? "Elegir después con el coordinador"
          : "Choose later with coordinator";
  const menuValue = (guest, section) =>
    getMenuItemLabel(
      section,
      dinnerSelection[guest]?.[
        section === "starters"
          ? "starter"
          : section === "mains"
            ? "main"
            : "dessert"
      ],
      language,
    ) || chooseLater;
  const wineChoice =
    dinnerSelection.wine === "red"
      ? language === "pt"
        ? "Vinho tinto"
        : language === "fr"
          ? "Vin rouge"
          : language === "es"
            ? "Vino tinto"
            : "Red wine"
      : dinnerSelection.wine === "white"
        ? language === "pt"
          ? "Vinho branco"
          : language === "fr"
            ? "Vin blanc"
            : language === "es"
              ? "Vino blanco"
              : "White wine"
        : chooseLater;
  const thankYouPath =
    language === "pt"
      ? "/pt/contact/thankyou/"
      : language === "fr"
        ? "/fr/contact/thankyou/"
        : language === "es"
          ? "/es/contact/thankyou/"
          : "/contact/thankyou/";
  return (
    <>
      <section
        id="package-booking"
        aria-labelledby="package-booking-heading"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-12"
      >
        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="min-w-0 space-y-8">
            {sideMedia && (
              <div className="mx-auto aspect-[3/2] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                {sideMedia}
              </div>
            )}
            <div className="text-center p-6  rounded-lg">
              <h2 className="text-3xl font-semibold mb-2">{packageName}</h2>
              {/* A package without a price shows no total instead of "$0". */}
              {price != null && (
                <>
                  <p className="text-4xl font-bold text-blue-600">
                    ${calculateTotal()}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <Trans>Base price</Trans>: {formatter.format(price)}
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                <Trans>Available Add-ons</Trans>
              </h3>
              {additions.map((addition, index) => (
                <button
                  key={addition.id || index}
                  type="button"
                  className={`w-full rounded-lg border bg-gray-50 p-4 text-left transition-colors ${
                    selectedAddOns.includes(addition.id)
                      ? "border-blue-500 bg-blue-50 "
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleAddOnToggle(addition)}
                  aria-pressed={selectedAddOns.includes(addition.id)}
                  aria-label={`${addition.name}, ${formatter.format(
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
                        <h4 className="font-medium">{addition.name}</h4>
                        {/* <p className="text-sm text-gray-600">{addOn.description}</p>*/}
                      </div>
                    </div>
                    <span className="font-semibold">${addition.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border pb-20 lg:pb-10">
            <h3
              id="package-booking-heading"
              className="mb-6 text-xl font-semibold"
            >
              {title}
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
              <input type="hidden" name="package-name" value={packageName} />
              <input type="hidden" name="base-price" value={price} />
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
              <input
                type="hidden"
                name="dinner-selection-status"
                value={
                  dinnerIsAvailable
                    ? dinnerIncluded
                      ? "Included in package"
                      : "Selected add-on"
                    : "Not selected"
                }
              />
              <input
                type="hidden"
                name="dinner-guest-1-starter"
                value={dinnerIsAvailable ? menuValue("guest1", "starters") : ""}
              />
              <input
                type="hidden"
                name="dinner-guest-1-main"
                value={dinnerIsAvailable ? menuValue("guest1", "mains") : ""}
              />
              <input
                type="hidden"
                name="dinner-guest-1-dessert"
                value={dinnerIsAvailable ? menuValue("guest1", "desserts") : ""}
              />
              <input
                type="hidden"
                name="dinner-guest-2-starter"
                value={dinnerIsAvailable ? menuValue("guest2", "starters") : ""}
              />
              <input
                type="hidden"
                name="dinner-guest-2-main"
                value={dinnerIsAvailable ? menuValue("guest2", "mains") : ""}
              />
              <input
                type="hidden"
                name="dinner-guest-2-dessert"
                value={dinnerIsAvailable ? menuValue("guest2", "desserts") : ""}
              />
              <input
                type="hidden"
                name="dinner-wine"
                value={dinnerIsAvailable ? wineChoice : ""}
              />
              <input
                type="hidden"
                name="dietary-restrictions"
                value={
                  dinnerIsAvailable
                    ? dinnerSelection.restrictions || "None provided"
                    : ""
                }
              />
              <p className="hidden">
                <label>
                  <Trans>Do not fill this out</Trans>:{" "}
                  <input name="bot-field" />
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
                <InternationalPhoneField
                  id="packageForm-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, phone }))
                  }
                  language={language}
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

              {dinnerIsAvailable && (
                <DinnerMenuSelector
                  language={language}
                  value={dinnerSelection}
                  onChange={setDinnerSelection}
                />
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageForm;
