import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Check, UtensilsCrossed, X } from "lucide-react";
import { dinnerMenu, getMenuItemLabel } from "../../data/proposalDinnerMenu";

const copy = {
  en: {
    title: "Choose your dinner menu",
    intro:
      "Each guest may independently choose one starter, one main course and one dessert. Selection is optional during booking and may be completed or modified with your coordinator up to 48 hours before the experience.",
    open: "View and choose the dinner menu",
    included: "Three-course dinner menu for two",
    includedText:
      "Includes water, one 750 ml sparkling wine and one additional 750 ml bottle of red or white wine.",
    guest: "Guest",
    starter: "Starter",
    main: "Main course",
    dessert: "Dessert",
    chooseLater: "Choose later with the coordinator",
    wine: "Additional wine",
    redWine: "Red wine",
    whiteWine: "White wine",
    restrictions: "Allergies or dietary restrictions",
    restrictionsPlaceholder:
      "Tell us which guest is affected and describe the restriction.",
    dietKey: "V = vegetarian · Ve = vegan",
    save: "Save menu choices",
    close: "Close dinner menu",
    saved: "Menu choices added to this request",
  },
  es: {
    title: "Elige el menú de la cena",
    intro:
      "Cada integrante puede elegir independientemente una entrada, un plato fuerte y un postre. La selección es opcional al reservar y puede completarse o modificarse con el coordinador hasta 48 horas antes de la experiencia.",
    open: "Ver y elegir el menú de la cena",
    included: "Menú de tres tiempos para dos",
    includedText:
      "Incluye agua, una botella de vino espumante de 750 ml y una botella adicional de vino tinto o blanco de 750 ml.",
    guest: "Persona",
    starter: "Entrada",
    main: "Plato fuerte",
    dessert: "Postre",
    chooseLater: "Elegir después con el coordinador",
    wine: "Vino adicional",
    redWine: "Vino tinto",
    whiteWine: "Vino blanco",
    restrictions: "Alergias o restricciones alimentarias",
    restrictionsPlaceholder:
      "Indica qué persona tiene la restricción y descríbela.",
    dietKey: "V = vegetariano · Ve = vegano",
    save: "Guardar selección del menú",
    close: "Cerrar menú de cena",
    saved: "La selección del menú se añadió a esta solicitud",
  },
};

const emptySelection = {
  guest1: { starter: "", main: "", dessert: "" },
  guest2: { starter: "", main: "", dessert: "" },
  wine: "",
  restrictions: "",
};

const CourseSelect = ({
  label,
  section,
  value,
  onChange,
  language,
  chooseLater,
}) => (
  <label className="block">
    <span className="text-sm font-semibold text-gray-800">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-gray-900"
    >
      <option value="">{chooseLater}</option>
      {dinnerMenu[section].map((item) => (
        <option key={item.id} value={item.id}>
          {getMenuItemLabel(section, item.id, language)}
        </option>
      ))}
    </select>
  </label>
);

const MenuList = ({ language, labels }) => (
  <div className="space-y-7 border-t border-stone-200 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
    {[
      ["starters", labels.starter],
      ["mains", labels.main],
      ["desserts", labels.dessert],
    ].map(([section, title]) => (
      <section key={section}>
        <h3 className="font-crimson text-2xl text-gray-900">{title}</h3>
        <ol className="mt-3 space-y-2">
          {dinnerMenu[section].map((item) => (
            <li key={item.id} className="text-sm leading-relaxed text-gray-700">
              {getMenuItemLabel(section, item.id, language)}
            </li>
          ))}
        </ol>
      </section>
    ))}
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
      {labels.dietKey}
    </p>
  </div>
);

const DinnerMenuSelector = ({ language, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const labels = copy[language === "es" ? "es" : "en"];
  const selection = value || emptySelection;
  const hasSelection = Boolean(
    selection.guest1?.starter ||
      selection.guest1?.main ||
      selection.guest1?.dessert ||
      selection.guest2?.starter ||
      selection.guest2?.main ||
      selection.guest2?.dessert ||
      selection.wine ||
      selection.restrictions,
  );

  const updateGuest = (guest, course, nextValue) => {
    onChange({
      ...selection,
      [guest]: { ...selection[guest], [course]: nextValue },
    });
  };

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <UtensilsCrossed
          aria-hidden="true"
          className="mt-0.5 h-6 w-6 shrink-0 text-amber-800"
          strokeWidth={1.5}
        />
        <div>
          <h4 className="font-crimson text-xl text-gray-900">
            {labels.included}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">
            {labels.includedText}
          </p>
          {hasSelection && (
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <Check aria-hidden="true" className="h-4 w-4" />
              {labels.saved}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
      >
        {labels.open}
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog onClose={setOpen} className="relative z-[100]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
            <div className="flex w-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <DialogPanel className="max-h-[calc(100dvh-2rem)] w-full max-w-6xl overflow-y-auto overscroll-contain bg-white shadow-2xl [-webkit-overflow-scrolling:touch] md:max-h-[calc(100dvh-4rem)]">
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-stone-200 bg-white p-6 md:px-10 md:py-7">
                    <div>
                      <DialogTitle className="font-crimson text-3xl font-normal text-gray-900 md:text-4xl">
                        {labels.title}
                      </DialogTitle>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 md:text-base">
                        {labels.intro}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={labels.close}
                      className="shrink-0 rounded-full border border-stone-300 p-2 text-gray-700 hover:bg-stone-100"
                    >
                      <X aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid gap-9 p-6 lg:grid-cols-[0.9fr_1.1fr] md:p-10">
                    <div className="space-y-7">
                      {["guest1", "guest2"].map((guest, guestIndex) => (
                        <fieldset
                          key={guest}
                          className="rounded-lg border border-stone-200 p-5"
                        >
                          <legend className="px-2 font-crimson text-xl text-gray-900">
                            {labels.guest} {guestIndex + 1}
                          </legend>
                          <div className="space-y-4">
                            <CourseSelect
                              label={labels.starter}
                              section="starters"
                              value={selection[guest]?.starter || ""}
                              onChange={(nextValue) =>
                                updateGuest(guest, "starter", nextValue)
                              }
                              language={language}
                              chooseLater={labels.chooseLater}
                            />
                            <CourseSelect
                              label={labels.main}
                              section="mains"
                              value={selection[guest]?.main || ""}
                              onChange={(nextValue) =>
                                updateGuest(guest, "main", nextValue)
                              }
                              language={language}
                              chooseLater={labels.chooseLater}
                            />
                            <CourseSelect
                              label={labels.dessert}
                              section="desserts"
                              value={selection[guest]?.dessert || ""}
                              onChange={(nextValue) =>
                                updateGuest(guest, "dessert", nextValue)
                              }
                              language={language}
                              chooseLater={labels.chooseLater}
                            />
                          </div>
                        </fieldset>
                      ))}

                      <label className="block">
                        <span className="text-sm font-semibold text-gray-800">
                          {labels.wine}
                        </span>
                        <select
                          value={selection.wine || ""}
                          onChange={(event) =>
                            onChange({ ...selection, wine: event.target.value })
                          }
                          className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-gray-900"
                        >
                          <option value="">{labels.chooseLater}</option>
                          <option value="red">{labels.redWine}</option>
                          <option value="white">{labels.whiteWine}</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-sm font-semibold text-gray-800">
                          {labels.restrictions}
                        </span>
                        <textarea
                          rows="4"
                          value={selection.restrictions || ""}
                          onChange={(event) =>
                            onChange({
                              ...selection,
                              restrictions: event.target.value,
                            })
                          }
                          placeholder={labels.restrictionsPlaceholder}
                          className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-gray-900"
                        />
                      </label>
                    </div>

                    <MenuList language={language} labels={labels} />
                  </div>

                  <div className="sticky bottom-0 z-10 flex justify-end border-t border-stone-200 bg-white p-5 md:px-10 md:py-6">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                    >
                      {labels.save}
                    </button>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export const createEmptyDinnerSelection = () => ({
  guest1: { ...emptySelection.guest1 },
  guest2: { ...emptySelection.guest2 },
  wine: "",
  restrictions: "",
});

export default DinnerMenuSelector;
