import React, { useState } from "react";
import { Link } from "gatsby";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import useSharedContent from "../useSharedContent";
export default function RomanticEvents({ item, footer, setToggled }) {
  const [open, setOpen] = useState(false);
  const { text, path } = useSharedContent();
  return (
    <SubMenu
      label={text(item.label)}
      className={footer ? "hamburgerSmall" : "hamburger"}
      open={open}
      onOpenChange={setOpen}
      component={
        <button
          type="button"
          aria-expanded={open}
          className={footer ? "hamburgerSmall" : "hamburger gap-2"}
          onKeyUp={() => {}}
        />
      }
    >
      {item.children.map((link) => (
        <MenuItem
          key={link._key}
          component={
            <Link
              to={path(link.url)}
              className="no-underline uppercase text-sm"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p>{text(link.label)}</p>
        </MenuItem>
      ))}
    </SubMenu>
  );
}
