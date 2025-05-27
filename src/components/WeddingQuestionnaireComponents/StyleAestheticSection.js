import React from "react";
import { motion } from "framer-motion";
import { Palette, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Trans, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { graphql, useStaticQuery } from "gatsby";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StyleAestheticSection = ({ formData, updateFormData }) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const weddingStylesData = useStaticQuery(graphql`
    query StyleAestheticQuery {
      weddingStyles: allContentfulWeddingQuestionnaireSelections(
        filter: { step: { eq: "Wedding Style" } }
      ) {
        nodes {
          node_locale
          step
          title
          description
          color
          iconEmoji
        }
      }
      chairStyles: allContentfulWeddingQuestionnaireSelections(
        filter: { step: { eq: "Chair Style" } }
      ) {
        nodes {
          node_locale
          step
          title
          color
          iconEmoji
          chairs {
            rentalItem
            images {
              gatsbyImage(width: 500, formats: WEBP, placeholder: BLURRED)
              title
            }
          }
        }
      }
      centerpieceStyles: allContentfulWeddingQuestionnaireSelections(
        filter: { step: { eq: "Centerpiece Style" } }
      ) {
        nodes {
          node_locale
          step
          title
          color
          iconEmoji
        }
      }
    }
  `);

  const weddingStyles2 = weddingStylesData.weddingStyles.nodes.filter(
    (node) => node.node_locale === language,
  );

  const weddingStyles = weddingStyles2.map((style) => ({
    value: style.title,
    label: style.title,
    icon: style.iconEmoji,
    description: style.description,
  }));

  const chairStyles2 = weddingStylesData.chairStyles.nodes.filter(
    (node) => node.node_locale === language,
  );

  const chairStyles = chairStyles2.map((style) => ({
    value: style.title,
    label: style.title,
    icon: style.iconEmoji,
    chairs: style.chairs,
  }));

  const centerpieceStyles2 = weddingStylesData.centerpieceStyles.nodes.filter(
    (node) => node.node_locale === language,
  );

  const centerpieceStyles = centerpieceStyles2.map((style) => ({
    value: style.title,
    label: style.title,
    icon: style.iconEmoji,
  }));

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleArrayToggle = (field, value) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFormData({ [field]: newArray });
  };

  // Custom navigation components for Swiper
  const CustomPrevButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
    >
      <ChevronLeft size={20} className="text-gray-600" />
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
    >
      <ChevronRight size={20} className="text-gray-600" />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Palette className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          <Trans>Style & Aesthetic</Trans>
        </h2>
        <p className="text-gray-600">
          <Trans>Let's bring your vision to life</Trans>
        </p>
      </div>

      {/* Wedding Styles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <label
          htmlFor="weddingStyles"
          className="flex items-center space-x-2 text-sm font-medium text-gray-700"
        >
          <Sparkles size={16} />
          <span>
            <Trans>Preferred Wedding Style (select all that apply)</Trans>
          </span>
        </label>
        <div id="weddingStyles" className="grid md:grid-cols-3 gap-4">
          {weddingStyles.map((style) => (
            <motion.button
              key={style.value}
              onClick={() => handleArrayToggle("weddingStyles", style.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.weddingStyles?.includes(style.value)
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <span className="text-3xl mb-2 block">{style.icon}</span>
                <h3 className="font-medium text-gray-800">{style.label}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {style.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Color Palette */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label
          htmlFor="colorPalette"
          className="flex items-center space-x-2 text-sm font-medium text-gray-700"
        >
          <Palette size={16} />
          <span>
            <Trans>Color Palette (describe or use HEX codes)</Trans>
          </span>
        </label>
        <input
          id="colorPalette"
          type="text"
          value={formData.colorPalette}
          onChange={(e) => handleInputChange("colorPalette", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
          placeholder={t(
            "e.g., Blush pink and gold, #f8b5c0 #e4c05c, Sage green and cream",
          )}
        />
      </motion.div>

      {/* Chair Styles Slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <label
          htmlFor="chairStyles"
          className="text-sm font-medium text-gray-700"
        >
          <Trans>Preferred Chair Style</Trans>
        </label>

        <div className="relative pb-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="chair-styles-swiper"
          >
            {chairStyles.map((chair) => (
              <SwiperSlide key={chair.value}>
                <motion.div
                  className={`relative rounded-xl border-2 transition-all overflow-hidden cursor-pointer ${
                    formData.chairStyle?.includes(chair.value)
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleArrayToggle("chairStyle", chair.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Chair Image */}
                  {chair.chairs?.images && chair.chairs.images.length > 0 && (
                    <div className="relative h-96">
                      {(() => {
                        const firstImage = chair.chairs.images[0];
                        const chairImage = getImage(firstImage.gatsbyImage);
                        return (
                          <div className="relative h-full">
                            {chairImage && (
                              <GatsbyImage
                                image={chairImage}
                                alt={firstImage.title || chair.label}
                                className="h-full w-full object-cover object-bottom"
                              />
                            )}
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Chair Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-center text-gray-800">
                          {chair.label}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {formData.chairStyle?.includes(chair.value) && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-white rounded-full p-1">
                      <Sparkles size={16} />
                    </div>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom">
            <CustomPrevButton />
          </div>
          <div className="swiper-button-next-custom">
            <CustomNextButton />
          </div>

          {/* Add custom pagination container */}
          <div className="swiper-pagination-custom absolute bottom-0 w-full"></div>
        </div>
      </motion.div>

      {/* Centerpiece Styles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <label
          htmlFor="centerpieceStyles"
          className="text-sm font-medium text-gray-700"
        >
          <Trans>Centerpiece Style</Trans>
        </label>
        <div id="centerpieceStyles" className="grid md:grid-cols-3 gap-4">
          {centerpieceStyles.map((centerpiece) => (
            <motion.button
              key={centerpiece.value}
              onClick={() =>
                handleArrayToggle("centerpieceStyle", centerpiece.value)
              }
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formData.centerpieceStyle?.includes(centerpiece.value)
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl block mb-2">{centerpiece.icon}</span>
              <span className="text-sm font-medium text-gray-800">
                {centerpiece.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Style Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-rose-50 to-amber-50 p-6 rounded-xl border border-rose-200"
      >
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Sparkles size={16} className="mr-2 text-rose-500" />
          <Trans>Your Style Summary</Trans>
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          {formData.weddingStyles?.length > 0 && (
            <p>
              <strong>
                <Trans>Styles:</Trans>
              </strong>{" "}
              {formData.weddingStyles.join(", ")}
            </p>
          )}
          {formData.colorPalette && (
            <p>
              <strong>
                <Trans>Colors:</Trans>
              </strong>{" "}
              {formData.colorPalette}
            </p>
          )}
          {formData.chairStyle?.length > 0 && (
            <p>
              <strong>
                <Trans>Chairs:</Trans>
              </strong>{" "}
              {formData.chairStyle.join(", ")}
            </p>
          )}
          {formData.centerpieceStyle?.length > 0 && (
            <p>
              <strong>
                <Trans>Centerpieces:</Trans>
              </strong>{" "}
              {formData.centerpieceStyle.join(", ")}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StyleAestheticSection;
