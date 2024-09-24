import React from "react";
import { motion } from "framer-motion";
const TextComponent = ({ title, paragraph, className, pClassName }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 3,
          delay: 0.3,
        }}
        className="flex flex-col items-center justify-center text-center max-w-5xl mx-5 lg:p-2 xl:mx-auto"
      >
        {title && <h1 className={`font-crimson ${className}`}>{title}</h1>}

        {paragraph && (
          <p
            className={`font-crimson lg:text-lg text-gray-700 lg:mt-5 ${pClassName}`}
          >
            {paragraph}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default TextComponent;
