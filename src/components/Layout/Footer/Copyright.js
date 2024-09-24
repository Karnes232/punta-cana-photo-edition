import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

const Copyright = ({ companyName }) => {
  const [date, setDate] = useState(undefined);
  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);
  return (
    <div className=" flex flex-col justify-between py-4">
      <Link to="/">
        <p className="tracking-wider cursor-pointer text-slate-400">
          All content Copyright &copy; {date} {companyName}
        </p>
      </Link>
    </div>
  );
};

export default Copyright;
