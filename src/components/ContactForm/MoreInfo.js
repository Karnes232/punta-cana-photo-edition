import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";

const MoreInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="relative z-0 mb-6 w-full group">
        <label
          htmlFor="additional"
          className="block mb-2 text-sm font-medium text-gray-500"
        >
          <Trans>Message</Trans>
        </label>
        <textarea
          id="additional"
          name="additional"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-0 focus:border-black additionalInfo"
          placeholder={t("Leave a comment...")}
        ></textarea>
      </div>
    </>
  );
};

export default MoreInfo;
