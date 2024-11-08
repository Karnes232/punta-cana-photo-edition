import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
const FirebaseTestimonialCard = ({ testimonial }) => {
  return (
    <>
      <div className="md:hidden flex flex-col space-y-4 pb-10">
        <div className="w-full overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            lazy={"true"}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className={`testimonialSwiper max-h-fit`}
          >
            {testimonial.photoUrls.map((photoUrl, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={photoUrl}
                    alt="testimonial"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <h2 className="text-center font-thin uppercase tracking-widest text-xl text-stone-800 mb-6">
          TESTIMONIALS
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-xl text-stone-800">{testimonial.names}</h3>
          <p className="text-center text-stone-600 leading-relaxed">
            <FaQuoteLeft className="text-xs inline-block align-top" />{" "}
            {testimonial.testimonial}{" "}
            <FaQuoteRight className="text-xs inline-block align-top" />
          </p>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 gap-12 items-center md:h-[30rem] lg:h-[35rem]">
        <div className="aspect-[4/4] w-full overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            lazy={"true"}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className={`testimonialSwiper md:h-[30rem] lg:h-[35rem]`}
          >
            {testimonial.photoUrls.map((photoUrl, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={photoUrl}
                    alt="testimonial"
                    className="w-full object-cover object-center md:h-[25rem] lg:h-[30rem]"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="font-thin uppercase tracking-widest text-xl text-stone-800">
            TESTIMONIALS
          </h2>
          <h3 className="text-2xl text-stone-800"> {testimonial.names}</h3>
          <p className="text-stone-600 leading-relaxed">
            <FaQuoteLeft className="text-xs inline-block align-top" />{" "}
            {testimonial.testimonial}{" "}
            <FaQuoteRight className="text-xs inline-block align-top" />
          </p>
        </div>
      </div>
    </>
  );
};

export default FirebaseTestimonialCard;
