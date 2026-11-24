import { Link } from "gatsby";
import React from "react";
import PopOverComponent from "./PopOverComponent";
import PopOverComponentHover from "./PopOverComponentHover";
import useSharedContent from "../useSharedContent";
export default function Sitemap() {
  const { content, text, path } = useSharedContent();
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {content.navigation.map((item) =>
        item.children?.length ? (
          <React.Fragment key={item._key}>
            <div className="2xl:hidden">
              <PopOverComponent
                title={text(item.label)}
                links={item.children.map((l) => ({
                  name: text(l.label),
                  urlLink: path(l.url),
                }))}
              />
            </div>
            <div className="hidden 2xl:block">
              <PopOverComponentHover
                title={text(item.label)}
                links={item.children.map((l) => ({
                  name: text(l.label),
                  urlLink: path(l.url),
                }))}
              />
            </div>
          </React.Fragment>
        ) : (
          <Link
            key={item._key}
            to={path(item.url)}
            className="navLinks no-underline"
          >
            {text(item.label)}
          </Link>
        ),
      )}
    </div>
  );
}
