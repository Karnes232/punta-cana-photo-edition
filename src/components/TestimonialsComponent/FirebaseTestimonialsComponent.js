import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import FirebaseTestimonialCard from "./FirebaseTestimonialCard";
const FirebaseTestimonialsComponent = ({ packagePage }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const collectionName = `testimonials-${packagePage}`;
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const testimonialsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));

        setTestimonials(testimonialsData);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    if (packagePage) {
      fetchTestimonials();
    }
  }, [packagePage]);

  if (loading) return <div>Loading testimonials...</div>;
  if (error) return <div>{error}</div>;
  if (!testimonials.length) return <></>;

  return (
    <>
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
                  <FirebaseTestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FirebaseTestimonialsComponent;
