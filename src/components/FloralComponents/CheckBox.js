import React from "react";

const CheckBox = ({ addition, formData, setFormData, idPrefix }) => {
  const inputId = `${idPrefix}-addon-${addition.addition
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
  const handleChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        additions: [
          ...formData.additions,
          {
            name: addition.addition,
            selected: true,
            price: addition.price,
          },
        ],
      });
    } else {
      setFormData({
        ...formData,
        additions: formData.additions.filter(
          (item) => item.name !== addition.addition,
        ),
      });
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={inputId}
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={handleChange}
      />
      <label
        htmlFor={inputId}
        className="flex justify-between items-center w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span>{addition.addition}</span>{" "}
        <span className="font-bold">${addition.price}</span>
      </label>
    </div>
  );
};

export default CheckBox;
