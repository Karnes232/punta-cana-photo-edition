import React from "react";

import CheckBox from "./CheckBox";
const Additions = ({ additions, formData, setFormData }) => {
  const filteredAdditions = additions?.filter(
    (addition) => addition.addition !== "None",
  );
  return (
    <div className="flex flex-col gap-2">
      {filteredAdditions &&
        filteredAdditions.map((addition, index) => (
          <CheckBox
            key={index}
            addition={addition}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
    </div>
  );
};

export default Additions;
