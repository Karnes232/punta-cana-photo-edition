import React, { useState } from "react";
import { FaShare } from "react-icons/fa6";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
<WhatsappShare url={url} />;
const ShareButton = ({ siteUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = "Check out this photo gallery!";
  console.log(siteUrl);
  return (
    <>
      <FaShare
        className="text-xl xl:text-2xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-400/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-xl bg-white lg:p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="fixed top-2 right-2">
                <button
                  className="p-2 text-2xl text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose />
                </button>
              </div>
              <div className="px-4 py-10 space-y-6">
                <DialogTitle className="font-thin text-left text-xl">
                  Share
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={siteUrl}
                    className="flex-1 p-2 border rounded-md bg-gray-50"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(siteUrl);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm text-gray-500">
                    Share on social media
                  </h3>
                  <div className="flex gap-4">
                    <FacebookShare
                      url={siteUrl}
                      quote={title}
                      hashtag={"#react-share-lite"}
                    />
                    <TwitterShare url={siteUrl} title={title} />
                    <WhatsappShare url={siteUrl} />
                    <EmailShare url={siteUrl} subject={title} body="body" />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </DialogBackdrop>
      </Dialog>
    </>
  );
};

export default ShareButton;
