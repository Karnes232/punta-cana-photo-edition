import React, { useState } from "react";
import loadable from "@loadable/component";
import { HiBars3 } from "react-icons/hi2";
const SideBarMenu = loadable(() => import("./SideBarMenu"));
const HamburgerMenu = ({ overlay = false }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <div className="flex">
        <SideBarMenu toggled={toggled} setToggled={setToggled} />
        <main className="flex p-3">
          <div>
            <button
              aria-label="Menu"
              className={`sb-button rounded-full p-2 transition ${
                overlay
                  ? "border border-white/40 bg-slate-950/35 shadow-lg backdrop-blur-sm hover:bg-slate-950/60"
                  : "text-slate-900 hover:bg-slate-100"
              }`}
              onClick={() => setToggled(!toggled)}
            >
              <HiBars3
                className={`h-7 w-7 md:h-9 ${
                  overlay ? "text-white" : "text-slate-900"
                }`}
              />
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default HamburgerMenu;
