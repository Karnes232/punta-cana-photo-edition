import React from "react";
import { motion } from "framer-motion";
const TextComponent = ({
  title,
  heading,
  paragraph,
  className,
  pClassName,
  id,
}) => {
  const HeadingTag = heading || "h1";

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
        {title && (
          <HeadingTag
            id={id}
            className={`font-lato tracking-wider font-semibold ${className}`}
          >
            {title}
          </HeadingTag>
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
