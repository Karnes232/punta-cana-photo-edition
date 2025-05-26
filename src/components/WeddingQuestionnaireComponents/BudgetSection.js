import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Award, Star } from "lucide-react";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
const BudgetSection = ({ formData, updateFormData }) => {
  const { t } = useTranslation();
  const handleBudgetChange = (value) => {
    updateFormData({ budget: parseInt(value) });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBudgetTier = (budget) => {
    if (budget >= 35000)
      return {
        name: t("Luxury"),
        icon: Award,
        color: "purple",
        description: t("Premium experience with all amenities"),
      };
    if (budget >= 20000)
      return {
        name: t("Premium"),
        icon: Star,
        color: "blue",
        description: t("Enhanced features and services"),
      };
    if (budget >= 10000)
      return {
        name: t("Standard"),
        icon: TrendingUp,
        color: "green",
        description: t("Beautiful celebration with great value"),
      };
    return {
      name: t("Essential"),
      icon: DollarSign,
      color: "yellow",
      description: t("Elegant and affordable options"),
    };
  };

  const currentTier = getBudgetTier(formData.budget);
  const TierIcon = currentTier.icon;

  const budgetRanges = [
    {
      min: 5000,
      max: 10000,
      label: "$5K - $10K",
      description: t("Intimate & Essential"),
    },
    {
      min: 10000,
      max: 20000,
      label: "$10K - $20K",
      description: t("Standard & Beautiful"),
    },
    {
      min: 20000,
      max: 35000,
      label: "$20K - $35K",
      description: t("Premium & Enhanced"),
    },
    {
      min: 35000,
      max: 50000,
      label: "$35K+",
      description: t("Luxury & Exclusive"),
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      yellow: "from-yellow-400 to-amber-500",
      green: "from-emerald-400 to-green-500",
      blue: "from-blue-400 to-indigo-500",
      purple: "from-purple-400 to-pink-500",
    };
    return colors[color] || colors.yellow;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <DollarSign className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          <Trans>Investment Range</Trans>
        </h2>
        <p className="text-gray-600">
          <Trans>
            Help us understand your budget to create the perfect package
          </Trans>
        </p>
      </div>

      {/* Current Budget Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`text-center p-8 rounded-2xl bg-gradient-to-r ${getColorClasses(currentTier.color)} text-white shadow-lg`}
      >
        <TierIcon size={32} className="mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">
          {formatCurrency(formData.budget)}
        </h3>
        <div className="text-lg font-medium mb-2">
          {currentTier.name} <Trans>Package</Trans>
        </div>
        <p className="text-sm opacity-90">{currentTier.description}</p>
      </motion.div>

      {/* Budget Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="text-center">
          <label
            htmlFor="budget"
            className="text-lg font-medium text-gray-700 mb-4 block"
          >
            <Trans>Estimated Budget Range</Trans>
          </label>
        </div>

        <div className="px-4">
          <input
            id="budget"
            type="range"
            min="5000"
            max="50000"
            step="500"
            value={formData.budget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #e4c05c 0%, #e4c05c ${((formData.budget - 5000) / 45000) * 100}%, #e5e7eb ${((formData.budget - 5000) / 45000) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$5,000</span>
            <span>$50,000+</span>
          </div>
        </div>
      </motion.div>

      {/* Budget Range Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-4 gap-4"
      >
        {budgetRanges.map((range, index) => {
          const isActive =
            formData.budget >= range.min &&
            (range.max === 50000 ? true : formData.budget < range.max);

          return (
            <motion.button
              key={index}
              onClick={() =>
                handleBudgetChange(range.min + (range.max - range.min) / 2)
              }
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                isActive
                  ? "border-yellow-400 bg-yellow-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="font-semibold text-gray-800 mb-1">
                {range.label}
              </div>
              <div className="text-sm text-gray-600">{range.description}</div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Budget Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 p-6 rounded-xl border border-blue-200"
      >
        <h3 className="font-medium text-blue-800 mb-3 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          <Trans>What's Included in Your Package</Trans>
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Wedding planning & coordination</Trans>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Venue setup & styling</Trans>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Photography services</Trans>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Floral arrangements</Trans>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Music & entertainment</Trans>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <Trans>Catering & beverages</Trans>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Budget Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200"
      >
        <p className="text-sm text-amber-800">
          💰{" "}
          <strong>
            <Trans>Note:</Trans>
          </strong>{" "}
          <Trans>
            This is an estimated range to help us create your perfect package.
            Final pricing will be customized based on your specific requirements
            and guest count.
          </Trans>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BudgetSection;
