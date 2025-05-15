import React, { useState } from "react";

import { Checkbox, Field, Label } from "@headlessui/react";
import CheckBox from "./CheckBox";
const Additions = ({ additions, formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-2">
      {additions.map((addition, index) => (
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
