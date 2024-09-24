import React from "react";
import { IoClose } from "react-icons/io5";
import { Sidebar } from "react-pro-sidebar";
import SideBarInside from "./SideBarInside";
const SideBarMenu = ({ toggled, setToggled }) => {
  return (
    <>
      <Sidebar
        backgroundColor="rgb(255, 255, 255, 1)"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
        rtl
        width="100%"
      >
        <div className="flex flex-col h-full items-center text-center justify-between">
          {toggled && (
            <div className="fixed top-5 right-5">
              <button
                className="p-2 text-2xl text-gray-500"
                onClick={() => setToggled(false)}
              >
                <IoClose />
              </button>
            </div>
          )}

          <SideBarInside />
        </div>
      </Sidebar>
    </>
  );
};

export default SideBarMenu;
