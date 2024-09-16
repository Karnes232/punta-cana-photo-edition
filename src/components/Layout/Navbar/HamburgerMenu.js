import React, { useState } from "react";
import loadable from "@loadable/component";
import { HiBars3 } from "react-icons/hi2";
const SideBarMenu = loadable(() => import("./SideBarMenu"));
const HamburgerMenu = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <div className="flex">
        <SideBarMenu toggled={toggled} setToggled={setToggled} />
        <main className="flex p-3">
          <div>
            <button
              aria-label="Menu"
              className={`sb-button `}
              onClick={() => setToggled(!toggled)}
            >
              <HiBars3 className={`h-7 w-7 md:h-9 text-white`} />
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default HamburgerMenu;
