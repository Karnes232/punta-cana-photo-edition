import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
const TestimonialCard = ({ testimonial }) => {
  const image = getImage(testimonial.image.gatsbyImage);
  return (
    <>
      <div className="md:hidden flex flex-col space-y-4 pb-5">
        <div className="w-full overflow-hidden">
          <GatsbyImage
            image={image}
            alt={testimonial.image.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-center font-thin uppercase tracking-widest text-xl text-stone-800 mb-6">
          TESTIMONIALS
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-xl text-stone-800">{testimonial.names}</h3>
          <p className="text-center text-stone-600 leading-relaxed">
            <FaQuoteLeft className="text-xs inline-block align-top" />{" "}
            {testimonial.testimonial.testimonial}{" "}
            <FaQuoteRight className="text-xs inline-block align-top" />
          </p>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 gap-12 items-center md:h-[30rem] lg:h-[35rem]">
        <div className="aspect-[4/4] w-full overflow-hidden">
          <GatsbyImage
            image={image}
            alt={testimonial.image.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="font-thin uppercase tracking-widest text-xl text-stone-800">
            TESTIMONIALS
          </h2>
          <h3 className="text-2xl text-stone-800"> {testimonial.names}</h3>
          <p className="text-stone-600 leading-relaxed">
            <FaQuoteLeft className="text-xs inline-block align-top" />{" "}
            {testimonial.testimonial.testimonial}{" "}
            <FaQuoteRight className="text-xs inline-block align-top" />
          </p>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
