import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

const Copyright = ({ companyName }) => {
  const [date, setDate] = useState(undefined);
  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);
  return (
    <div className=" flex flex-col md:flex-row justify-between py-4">
      <Link to="/">
        <p className="tracking-wider cursor-pointer text-slate-400">
          All content Copyright &copy; {date} {companyName}
        </p>
      </Link>
      <p className="text-slate-400 flex items-center gap-2 md:flex-1 md:justify-end md:mr-8 mt-5 md:mt-0">
        Built by
        <a
          href="https://dr-webstudio.com"
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
      </p>
    </div>
  );
};

export default Copyright;
