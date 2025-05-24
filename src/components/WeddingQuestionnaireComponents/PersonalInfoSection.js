import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Phone, User } from "lucide-react";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
const PersonalInfoSection = ({ formData, updateFormData, errors }) => {
  const { t } = useTranslation();
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          <Trans>About You</Trans>
        </h2>
        <p className="text-gray-600">
          <Trans>Let's start with the basics about the happy couple!</Trans>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Partner 1 Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label
            htmlFor="fullName1"
            className="flex items-center space-x-2 text-sm font-medium text-gray-700"
          >
            <User size={16} />
            <span>
              <Trans>Partner 1 Full Name</Trans>
            </span>
          </label>
          <input
            id="fullName1"
            type="text"
            value={formData.fullName1}
            onChange={(e) => handleInputChange("fullName1", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${errors?.fullName1 ? "border-red-500" : ""}`}
            placeholder={t("Enter full name")}
          />
          {errors?.fullName1 && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName1}</p>
          )}
        </motion.div>

        {/* Partner 2 Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label
            htmlFor="fullName2"
            className="flex items-center space-x-2 text-sm font-medium text-gray-700"
          >
            <User size={16} />
            <span>
              <Trans>Partner 2 Full Name</Trans>
            </span>
          </label>
          <input
            id="fullName2"
            type="text"
            value={formData.fullName2}
            onChange={(e) => handleInputChange("fullName2", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${errors?.fullName2 ? "border-red-500" : ""}`}
            placeholder={t("Enter full name")}
          />
          {errors?.fullName2 && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName2}</p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label
            htmlFor="email"
            className="flex items-center space-x-2 text-sm font-medium text-gray-700"
          >
            <Mail size={16} />
            <span>
              <Trans>Email Address</Trans>
            </span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${errors?.email ? "border-red-500" : ""}`}
            placeholder="your@email.com"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label
            htmlFor="phone"
            className="flex items-center space-x-2 text-sm font-medium text-gray-700"
          >
            <Phone size={16} />
            <span>
              <Trans>WhatsApp/Phone</Trans>
            </span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${errors?.phone ? "border-red-500" : ""}`}
            placeholder="+1 (555) 123-4567"
          />
          {errors?.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <div className="flex items-center space-x-2 text-rose-400">
          <Heart size={16} className="animate-pulse" />
          <span className="text-sm font-medium">
            <Trans>Ready to plan your perfect day?</Trans>
          </span>
          <Heart size={16} className="animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfoSection;
