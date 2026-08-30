import React, { useState } from "react";
import { Check } from "lucide-react";
import { Trans } from "gatsby-plugin-react-i18next";
import { passVisitorName } from "../../utils/thankYouName";
import InternationalPhoneField from "../FormComponents/InternationalPhoneField";
import {
  getProposalAdditions,
  proposalAddOnType,
} from "../../utils/proposalPackageRules";
import { getProposalPackageDetails } from "../../data/proposalPackageDetails";
import { getMenuItemLabel } from "../../data/proposalDinnerMenu";
import DinnerMenuSelector, {
  createEmptyDinnerSelection,
} from "./DinnerMenuSelector";
const PackageForm = ({
  packageInformation,
  formData,
  setFormData,
  selectedAddOns,
  handleAddOnToggle,
  language,
  sideMedia,
}) => {
  const [dinnerSelection, setDinnerSelection] = useState(
    createEmptyDinnerSelection,
  );
  const proposalDetails = getProposalPackageDetails(
    packageInformation,
    language,
  );
  const additions = getProposalAdditions(packageInformation, language).sort(
    (a, b) => Number(a.price || 0) - Number(b.price || 0),
  );
  const dinnerAddition = additions.find(
    (addition) => proposalAddOnType(addition.addition)?.key === "dinner",
  );
  const dinnerIsSelected = Boolean(
    dinnerAddition && selectedAddOns.includes(dinnerAddition.id),
  );
  const dinnerIsAvailable = Boolean(
    proposalDetails?.dinnerIncluded || dinnerIsSelected,
  );
  const isSpanish = language === "es";
  const isPortuguese = language === "pt";
  const isFrench = language === "fr";
  const proposalFormTitle = isPortuguese
    ? "Solicite sua proposta"
    : isFrench
      ? "Demandez votre proposition"
      : isSpanish
        ? "Solicita tu propuesta"
        : "Request your proposal";
  const proposalSubmitLabel = isPortuguese
    ? "Enviar solicitação de proposta"
    : isFrench
      ? "Envoyer la demande de proposition"
      : isSpanish
        ? "Enviar solicitud de propuesta"
        : "Send proposal request";

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
    return packageInformation.packages[0].price + addOnsTotal;
  };
  const selectedAddOnSummary = selectedAddOns
    .map((id) => additions.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `${item.addition} - $${item.price}`)
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
              <h2 className="text-3xl font-semibold mb-2">
                {packageInformation.heroHeading}
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                ${calculateTotal()}
              </p>
              <p className="text-gray-600 mt-2">
                <Trans>Base price</Trans>:{" "}
                {formatter.format(packageInformation.packages[0].price)}
              </p>
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
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border pb-20 lg:pb-10">
            <h3
              id="package-booking-heading"
              className="mb-6 text-xl font-semibold"
            >
              {proposalDetails ? (
                proposalFormTitle
              ) : (
                <Trans>Book Your Session</Trans>
              )}
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
              <input
                type="hidden"
                name="dinner-selection-status"
                value={
                  dinnerIsAvailable
                    ? proposalDetails?.dinnerIncluded
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
                {proposalDetails ? (
                  proposalSubmitLabel
                ) : (
                  <Trans>Contact Us</Trans>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageForm;
