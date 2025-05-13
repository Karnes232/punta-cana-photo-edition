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
    </>
  );
};

export default FloralForm;
