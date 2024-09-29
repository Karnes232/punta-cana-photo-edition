import React from "react";
import TextComponent from "../TextComponent/TextComponent";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { motion } from "framer-motion";
const QuoteComponent = ({ quote }) => {
  console.log(quote.author);
  return (
    <div className="my-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 3,
          delay: 0.3,
        }}
        className="flex flex-col items-center justify-center text-center max-w-xl xl:max-w-3xl mx-5 md:mx-auto"
      >
        <h1
          className={`font-crimson mb-5 tracking-wide 2xl:mb-2 2xl:mt-10 text-xl md:text-3xl flex gap-1 border-b pb-10`}
        >
          <FaQuoteLeft className="text-2xl" /> {quote.quote}{" "}
          <FaQuoteRight className="text-2xl self-end" />
        </h1>
        <h3 className="flex justify-center items-center self-start uppercase text-sm text-gray-400">
          <GoDash /> {quote.author}
        </h3>
      </motion.div>
    </div>
  );
};

export default QuoteComponent;
