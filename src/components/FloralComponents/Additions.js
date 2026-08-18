import React from "react";

import CheckBox from "./CheckBox";
const Additions = ({ additions, formData, setFormData, idPrefix }) => {
  const filteredAdditions = additions?.filter(
    (addition) => addition.addition !== "None",
  );
  return (
    <div className="flex flex-col gap-2">
      {filteredAdditions &&
        filteredAdditions.map((addition) => (
          <CheckBox
            key={addition.id || addition.addition}
            addition={addition}
            formData={formData}
            setFormData={setFormData}
            idPrefix={idPrefix}
          />
        ))}
    </div>
  );
};

export default Additions;
