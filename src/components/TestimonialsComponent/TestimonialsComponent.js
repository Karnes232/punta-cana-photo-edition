import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
const TestimonialsComponent = ({ testimonials }) => {
  return (
    <div className="flex flex-col max-w-5xl mx-5 my-5 lg:p-2 xl:mx-auto">
      <div className={`w-full`}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          lazy={"true"}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{
            type: "fraction",
          }}
          className={`testimonialSwiper`}
        >
          {testimonials.map((testimonial, index) => {
            return (
              <SwiperSlide
                className={`relative object-cover object-center h-full w-full`}
                key={index}
              >
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsComponent;
