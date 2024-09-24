import React, { useRef } from "react";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Link } from "gatsby";

const PopOverComponentHover = ({ title, links }) => {
  const useHover = true;
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutDuration = 200;
  let timeout;

  const openMenu = () => buttonRef?.current.click();
  const closeMenu = () =>
    dropdownRef?.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      }),
    );

  const onMouseEnter = (closed) => {
    clearTimeout(timeout);
    closed && openMenu();
  };
  const onMouseLeave = (open) => {
    open && (timeout = setTimeout(() => closeMenu(), timeoutDuration));
  };

  return (
    <Popover className="group">
      {({ open }) => (
        <>
          <PopoverButton
            className="flex items-center gap-2"
            ref={buttonRef}
            onMouseEnter={() => useHover && onMouseEnter(!open)}
            onMouseLeave={() => useHover && onMouseLeave(open)}
          >
            {title}
          </PopoverButton>
          <PopoverBackdrop
            transition
            className="fixed inset-0 bg-black/15 transition duration-100 ease-out data-[closed]:opacity-0"
          />
          <PopoverPanel
            ref={dropdownRef}
            anchor={{ to: "top start", gap: "10px" }}
            transition
            className="flex flex-col bg-secondary-color justify-evenly items-center rounded-xl shadow-2xl px-10 origin-bottom transition duration-500 ease-out data-[closed]:scale-50 data-[closed]:opacity-0"
          >
            {links.map((link, index) => {
              return (
                <Link
                  to={link.urlLink}
                  className="no-underline w-64 my-4 text-center"
                  key={index}
                >
                  <button className={`navLinks popoverLinks`} translate="no">
                    {link.name}
                  </button>
                </Link>
              );
            })}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default PopOverComponentHover;
