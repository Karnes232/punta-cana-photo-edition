import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

const Copyright = ({ companyName, language }) => {
  const [date, setDate] = useState(undefined);
  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);
  console.log(language);
  const jsonLd =
    language === "es"
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Atribución del desarrollo del sitio web",
          inLanguage: "es",
          creator: {
            "@type": "Organization",
            "@id": "https://www.dr-webstudio.com/#organization",
            name: "DR Web Studio",
            url: "https://www.dr-webstudio.com/es",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "Website build attribution",
          inLanguage: "en",
          creator: {
            "@type": "Organization",
            "@id": "https://www.dr-webstudio.com/#organization",
            name: "DR Web Studio",
            url: "https://www.dr-webstudio.com/en",
          },
        };
  return (
    <div className=" flex flex-col lg:flex-row justify-between py-4">
      <Link to="/">
        <p className="tracking-wider cursor-pointer text-slate-400">
          All content Copyright &copy; {date} {companyName}
        </p>
      </Link>
      <p className="text-slate-400 flex flex-col lg:flex-row items-center gap-2 lg:flex-1 lg:justify-end lg:mr-8 mt-5 lg:mt-0">
        {language === "es" ? "Desarrollado por" : "Built by"}
        <a
          href={
            language === "es"
              ? "https://www.dr-webstudio.com/es"
              : "https://www.dr-webstudio.com/en"
          }
          className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
          target="_blank"
        >
          <img
            src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
            alt="DR Web Studio"
            className="h-4"
          />
          DR Web Studio
        </a>
        <span className="hidden lg:inline"> —</span>
        {language === "es"
          ? "Desarrollo Web en República Dominicana"
          : "Web Development in the Dominican Republic"}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Copyright;
