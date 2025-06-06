import React from "react";
import { motion } from "framer-motion";
import { Trans } from "gatsby-plugin-react-i18next";
const BackgroundVideo = ({ videoUrl, fullSize, heroHeading }) => {
  let height = "";
  let blankDivHeight = "";
  if (fullSize) {
    height = "h-screen";
    blankDivHeight = "h-[90vh]";
  } else {
    height = "h-[65vh]";
    blankDivHeight = "h-[55vh]";
  }

  return (
    <>
      <div className={`absolute top-0 w-full ${height}`}>
        <motion.div
          initial={{ filter: "brightness(0)" }}
          whileInView={{ filter: "brightness(0.6)" }}
          viewport={{ once: true }}
          transition={{
            duration: 6,
            delay: 0.5,
          }}
          className="absolute top-0 left-0 w-full h-full z-0 opacity-100 overflow-hidden brightness-[0.6]"
        >
          <video
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center scale-[1.5]"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            Your device does not support playing videos
          </video>
        </motion.div>
        {heroHeading && (
          <>
            <div
              className={`relative z-10 flex items-center justify-center w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto ${blankDivHeight} mt-[10vh] lg:hidden`}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 6,
                  delay: 2.5,
                }}
                className="text-white font-playfair text-2xl md:text-3xl xl:text-4xl  font-bold text-center"
              >
                {heroHeading}
              </motion.h1>
            </div>
            <div
              className={`hidden relative z-10 lg:flex flex-col items-center justify-center w-full mx-auto ${blankDivHeight} mt-[10vh]`}
            >
              {/* Enhanced CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 2.2,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document
                    .getElementById("wedding-questionnaire")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-playfair text-xl xl:text-2xl font-semibold px-12 py-4 rounded-full shadow-2xl transform transition-all duration-300 ease-out border-2 border-white/20 backdrop-blur-sm"
                //className="group relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-400 hover:via-pink-400 hover:to-purple-400 text-white font-playfair text-xl xl:text-2xl font-semibold px-12 py-4 rounded-full shadow-2xl transform transition-all duration-300 ease-out border-2 border-white/20 backdrop-blur-sm"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                {/* Button text with icon */}
                <span className="relative flex items-center gap-3">
                  <Trans>Quote My Wedding</Trans>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                {/* Subtle pulse animation */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
              </motion.button>

              {/* Optional subtitle or additional CTA text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 2.6,
                }}
                className="text-white/80 font-light text-sm xl:text-base mt-4 text-center max-w-md"
              >
                Get your personalized quote in just 2 minutes
              </motion.p>
            </div>
          </>
        )}
      </div>

      <div className={`${blankDivHeight}`}></div>
    </>
  );
};

export default BackgroundVideo;
