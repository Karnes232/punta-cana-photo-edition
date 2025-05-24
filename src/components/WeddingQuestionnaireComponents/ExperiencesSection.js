import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Anchor,
  Palmtree,
  Car,
  Camera,
  Music,
  Utensils,
  Mountain,
} from "lucide-react";

const ExperiencesSection = ({ formData, updateFormData }) => {
  const handleArrayToggle = (field, value) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFormData({ [field]: newArray });
  };

  const experiences = [
    {
      value: "catamaran",
      label: "Catamaran Tour",
      icon: Anchor,
      description: "Sail the crystal waters",
      color: "blue",
    },
    {
      value: "isla-saona",
      label: "Isla Saona",
      icon: Palmtree,
      description: "Paradise island excursion",
      color: "green",
    },
    {
      value: "buggies",
      label: "Buggy Adventure",
      icon: Car,
      description: "Off-road exploration",
      color: "orange",
    },
    {
      value: "snorkeling",
      label: "Snorkeling",
      icon: Camera,
      description: "Underwater adventure",
      color: "cyan",
    },
    {
      value: "cultural-tour",
      label: "Cultural Tour",
      icon: Mountain,
      description: "Local heritage experience",
      color: "purple",
    },
    {
      value: "beach-party",
      label: "Beach Party",
      icon: Music,
      description: "Sunset celebration",
      color: "pink",
    },
    {
      value: "cooking-class",
      label: "Cooking Class",
      icon: Utensils,
      description: "Learn local cuisine",
      color: "red",
    },
    {
      value: "spa-day",
      label: "Spa Day",
      icon: Palmtree,
      description: "Relaxation & wellness",
      color: "indigo",
    },
  ];

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected
        ? "border-blue-400 bg-blue-50"
        : "border-gray-200 hover:border-blue-300",
      green: isSelected
        ? "border-green-400 bg-green-50"
        : "border-gray-200 hover:border-green-300",
      orange: isSelected
        ? "border-orange-400 bg-orange-50"
        : "border-gray-200 hover:border-orange-300",
      cyan: isSelected
        ? "border-cyan-400 bg-cyan-50"
        : "border-gray-200 hover:border-cyan-300",
      purple: isSelected
        ? "border-purple-400 bg-purple-50"
        : "border-gray-200 hover:border-purple-300",
      pink: isSelected
        ? "border-pink-400 bg-pink-50"
        : "border-gray-200 hover:border-pink-300",
      red: isSelected
        ? "border-red-400 bg-red-50"
        : "border-gray-200 hover:border-red-300",
      indigo: isSelected
        ? "border-indigo-400 bg-indigo-50"
        : "border-gray-200 hover:border-indigo-300",
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color, isSelected) => {
    const colors = {
      blue: isSelected ? "text-blue-500" : "text-gray-400",
      green: isSelected ? "text-green-500" : "text-gray-400",
      orange: isSelected ? "text-orange-500" : "text-gray-400",
      cyan: isSelected ? "text-cyan-500" : "text-gray-400",
      purple: isSelected ? "text-purple-500" : "text-gray-400",
      pink: isSelected ? "text-pink-500" : "text-gray-400",
      red: isSelected ? "text-red-500" : "text-gray-400",
      indigo: isSelected ? "text-indigo-500" : "text-gray-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Additional Experiences
        </h2>
        <p className="text-gray-600">
          Make your wedding celebration unforgettable
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <label htmlFor="experiences-group" className="text-sm font-medium text-gray-700">
          Select experiences you'd like to offer your guests (optional)
        </label>
        <div id="experiences-group" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            const isSelected = formData.additionalExperiences?.includes(
              experience.value,
            );

            return (
              <motion.button
                key={experience.value}
                onClick={() =>
                  handleArrayToggle("additionalExperiences", experience.value)
                }
                className={`p-4 rounded-xl border-2 transition-all text-left ${getColorClasses(experience.color, isSelected)}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${isSelected ? "bg-white" : "bg-gray-100"}`}
                  >
                    <Icon
                      size={20}
                      className={getIconColor(experience.color, isSelected)}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {experience.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {experience.description}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Experiences Summary */}
      {formData.additionalExperiences?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200"
        >
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <MapPin size={16} className="mr-2 text-emerald-500" />
            Selected Experiences ({formData.additionalExperiences.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.additionalExperiences.map((expValue) => {
              const exp = experiences.find((e) => e.value === expValue);
              return exp ? (
                <span
                  key={expValue}
                  className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-emerald-200"
                >
                  {exp.label}
                </span>
              ) : null;
            })}
          </div>
        </motion.div>
      )}

      {/* Experience Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200"
      >
        <p className="text-sm text-amber-800">
          💡 <strong>Tip:</strong> These experiences can be organized as welcome
          activities, day-after adventures, or extended celebration options for
          your guests.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ExperiencesSection;
