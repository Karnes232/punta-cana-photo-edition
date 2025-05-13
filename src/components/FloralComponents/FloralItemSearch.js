import { useTranslation } from "gatsby-plugin-react-i18next";
import React, { useState } from "react";

const FloralItemSearch = ({
  backendFloralList,
  allCategories,
  setSelectedCategory,
  setFloralItemsList,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    // Perform search across title and description
    const filteredItems = backendFloralList.filter(
      (item) =>
        item.floralItem.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );

    // Randomize filtered results
    const randomizedResults = filteredItems.sort(() => Math.random() - 0.5);

    // Update rental items list
    setFloralItemsList(randomizedResults);
    // Reset category to All when searching
    setSelectedCategory("All");
  };

  return (
    <div className="search-container my-3 px-5 flex justify-center items-center">
      <input
        type="text"
        placeholder={t("Search Floral items...")}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full lg:max-w-lg xl:max-w-xl  p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FloralItemSearch;
