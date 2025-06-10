import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";
import ItemCardSwiper from "../RentalComponents/ItemCardSwiper";
import ContactForm from "./ContactForm";

const WeddingPackageForm = ({ weddingPackage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form name="wedding-package" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="wedding-package" />
        <input type="text" name="package" value={weddingPackage.title} />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="telephone" />
        <input type="date" name="date" />
        <input type="text" name="message" />
      </form>
      <div className="">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-md w-full"
        >
          {weddingPackage.callToActionButton}
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-transparent/80">
          <div className="flex min-h-screen p-4 justify-center items-center">
            <DialogPanel className="mb-20 xl:mr-10 w-full max-w-md md:max-w-4xl h-auto lg:h-[65vh] rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="absolute top-2 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <div className="flex flex-col md:justify-center md:items-center lg:flex-row gap-2 mt-8 lg:mt-0 2xl:mt-5">
                <div className="flex flex-col gap-2 md:w-[25rem] lg:gap-0 lg:mt-5 xl:mt-0">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <ItemCardSwiper
                      photoList={[weddingPackage.image]}
                      height="h-52 md:h-72 lg:h-80"
                    />
                  </div>
                  <div className="pt-4 md:pr-4">
                    <div className="font-bold h-10 text-lg mb-2 flex justify-between">
                      <div className="truncate mr-3" translate="no">
                        {weddingPackage.title}
                      </div>
                      {/* <div className="">${item.price}</div> */}
                    </div>
                    <p className="text-gray-700  my-2 text-base min-h-[5rem]">
                      {weddingPackage.paragraph}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:w-[25rem]">
                  <ContactForm weddingPackage={weddingPackage} />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default WeddingPackageForm;
