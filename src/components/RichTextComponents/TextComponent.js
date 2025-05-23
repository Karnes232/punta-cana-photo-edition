import React from "react";
import { motion } from "framer-motion";
const TextComponent = ({
  title,
  heading,
  paragraph,
  className,
  pClassName,
}) => {
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
        className="flex flex-col justify-center max-w-5xl mx-5 lg:p-2 xl:mx-auto"
      >
        {heading === "h1" || heading === undefined ? (
          <h1
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h1>
        ) : (
          <></>
        )}
        {heading === "h2" ? (
          <h2
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h2>
        ) : (
          <></>
        )}
        {heading === "h3" ? (
          <h3
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h3>
        ) : (
          <></>
        )}
        {heading === "h4" ? (
          <h4
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h4>
        ) : (
          <></>
        )}
        {heading === "h5" ? (
          <h5
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h5>
        ) : (
          <></>
        )}
        {heading === "h6" ? (
          <h6
            className={`font-lato tracking-wider font-semibold  ${className}`}
          >
            {title}
          </h6>
        ) : (
          <></>
        )}
        {paragraph ? (
          <p
            className={`font-crimson lg:text-lg text-gray-700 ${pClassName}`}
            // dangerouslySetInnerHTML={{ __html: paragraph }}
          >
            {paragraph}
          </p>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
};

export default TextComponent;
