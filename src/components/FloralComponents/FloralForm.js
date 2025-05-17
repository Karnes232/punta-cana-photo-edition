import React, { useState } from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import { IoClose } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";
import ItemCardSwiper from "../RentalComponents/ItemCardSwiper";
import ContactForm from "./ContactForm";

const FloralForm = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <form name="floral-art" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="floral-art" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="shippingAddress" />
        <input type="text" name="floralItem" />
        <input type="text" name="price" />
        <input type="text" name="description" />

        <textarea name="message"></textarea>
        <input type="text" name="additions" />
      </form>
      <div className="flex justify-center items-center mb-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#E4C05C] hover:bg-[#C6A855] text-white font-bold py-1 px-4 rounded "
        >
          <Trans>More Info</Trans>
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-transparent/80">
          <div className="flex min-h-screen items-end justify-end p-4">
            <DialogPanel className="mb-20 xl:mr-10 w-full max-w-md md:max-w-4xl lg:h-[80vh] rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="absolute top-2 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <div className="flex flex-col md:justify-center md:items-center lg:flex-row gap-2 mt-8">
                <div className="flex flex-col gap-2 md:w-[25rem] lg:gap-0 lg:mt-5 xl:mt-0">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <ItemCardSwiper
                      photoList={item.images}
                      height="h-44 md:h-52 lg:h-60"
                    />
                  </div>
                  <div className="pt-4 md:pr-4">
                    <div className="font-bold h-10 text-lg mb-2 flex justify-between">
                      <div className="truncate mr-3" translate="no">
                        {item.floralItem}
                      </div>
                      <div className="">${item.price}</div>
                    </div>
                    <p className="text-gray-700  my-2 text-base  line-clamp-4 min-h-[5rem]">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:w-[25rem]">
                  <ContactForm item={item} />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FloralForm;
