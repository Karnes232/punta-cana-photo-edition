import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Trans, useTranslation, useI18next } from "gatsby-plugin-react-i18next";
import ContentfulSvg from "../ContentfulSvg/ContentfulSvg";

const ExperiencesSection = ({ formData, updateFormData }) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const data = useStaticQuery(graphql`
    query ExperiencesQuery {
      allContentfulWeddingQuestionnaireSelections(
        filter: { step: { eq: "Experiences Section" } }
      ) {
        nodes {
          node_locale
          step
          title
          description
          color
          icon {
            url
          }
        }
      }
    }
  `);
  const experiences =
    data.allContentfulWeddingQuestionnaireSelections.nodes.filter(
      (node) => node.node_locale === language,
    );

  const handleArrayToggle = (field, value) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFormData({ [field]: newArray });
  };

  const getStyles = (color, isSelected) => {
    if (!isSelected) {
      return {
        borderColor: "#e5e7eb", // gray-200
        backgroundColor: "#f3f4f6", // gray-100
      };
    }
    // Tailwind 400-level colors
    const colorMap = {
      slate: "#94a3b8",
      gray: "#9ca3af",
      zinc: "#a1a1aa",
      neutral: "#a3a3a3",
      stone: "#a8a29e",
      red: "#f87171",
      orange: "#fb923c",
      amber: "#fbbf24",
      yellow: "#facc15",
      lime: "#a3e635",
      green: "#4ade80",
      emerald: "#34d399",
      teal: "#2dd4bf",
      cyan: "#22d3ee",
      sky: "#38bdf8",
      blue: "#60a5fa",
      indigo: "#818cf8",
      violet: "#a78bfa",
      purple: "#c084fc",
      fuchsia: "#e879f9",
      pink: "#f472b6",
      rose: "#fb7185",
    };

    return {
      borderColor: colorMap[color] || "#60a5fa", // fallback to blue-400
      backgroundColor: `${colorMap[color]}15`, // 15 is for 10% opacity
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8 border-blue-400">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          <Trans>Additional Experiences</Trans>
        </h2>
        <p className="text-gray-600">
          <Trans>Make your wedding celebration unforgettable</Trans>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <label
          htmlFor="experiences-group"
          className="text-sm font-medium text-gray-700"
        >
          <Trans>
            Select experiences you'd like to offer your guests (optional)
          </Trans>
        </label>
        <div
          id="experiences-group"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {experiences.map((experience, index) => {
            const isSelected = formData.additionalExperiences?.includes(
              experience.title,
            );
            return (
              <motion.button
                key={experience.title}
                onClick={() =>
                  handleArrayToggle("additionalExperiences", experience.title)
                }
                style={getStyles(experience.color, isSelected)}
                className="p-4 rounded-xl border-2 transition-all text-left"
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
                    <ContentfulSvg
                      url={experience.icon.url}
                      color={experience.color}
                      intensity="500"
                      className="w-6 h-6"
                      isSelected={isSelected}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {experience.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {experience.description}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 2 }}
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
            <Trans>Selected Experiences</Trans> (
            {formData.additionalExperiences.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.additionalExperiences.map((expValue) => {
              const exp = experiences.find((e) => e.title === expValue);
              return exp ? (
                <span
                  key={expValue}
                  className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-emerald-200"
                >
                  {exp.title}
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
          💡{" "}
          <strong>
            <Trans>Tip:</Trans>
          </strong>{" "}
          <Trans>
            These experiences can be organized as welcome activities, day-after
            adventures, or extended celebration options for your guests.
          </Trans>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ExperiencesSection;
