import React, { useState } from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import { IoClose } from "react-icons/io5";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const FloralForm = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
            <DialogPanel className="mb-20 mr-6 xl:mr-10 w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="absolute top-2 right-5">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <h1>Hello</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FloralForm;
