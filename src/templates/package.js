import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import HeroSwiper from "../components/HeroSwiper/HeroSwiper";
import RichText from "../components/RichTextComponents/RichText";
import SwiperCarousel from "../components/SwiperCarouselComponent/SwiperCarousel";
import TextComponent from "../components/RichTextComponents/TextComponent";
import ReactPlayer from "react-player";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Faqs from "../components/FaqsComponent/Faqs";
import Button from "../components/PackageForm/Button";
import Form from "../components/PackageComponents/Form";

const PackagePage = ({ pageContext }) => {
  const [host, setHost] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    addOn1: "",
    addOn2: "",
    addOn3: "",
    addOn4: "",
    addOn5: "",
    addOn6: "",
    price: pageContext.package.packages[0].price,
    totalCost: 0,
  });
  const image = getImage(pageContext.package.images[0]);
  console.log(formData);
  useEffect(() => {
    setHost(window.location.origin);
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get current scroll position

      // Define the scroll position at which the button should become sticky
      const triggerPosition = 500; // Adjust this value based on your page layout

      // Set the sticky state based on scroll position
      if (scrollY > triggerPosition) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      console.log(formData);
      // Handle your form submission here

      const redirectHref = `${host}/contact/thankyou/?name=${formData.name}`;
      const form = document.getElementById("packageForm");
      const newFormData = new FormData(form);
      const formDataObj = {};
      newFormData.forEach((value, key) => (formDataObj[key] = value));
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(newFormData).toString(),
      }).then(() => {
        window.location.href = redirectHref;
      });

      setIsSubmitting(false);
    }
  }, [formData, isSubmitting]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    let count = 1;
    let totalPrice = pageContext.package.packages[0].price;

    selectedAddOns.forEach((addOnId) => {
      let result = pageContext.package.packages[0].additions.filter((addOn) =>
        addOn.id.includes(addOnId),
      );
      totalPrice = totalPrice + result[0].price;
      setFormData((prev) => ({
        ...prev,
        [`addOn${count}`]: `${result[0].addition} - $${result[0].price}`,
      }));
      count++;
    });

    setFormData((prev) => ({
      ...prev,
      totalCost: totalPrice,
    }));

    setIsSubmitting(true);
  };

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId.id)
        ? prev.filter((id) => id !== addOnId.id)
        : [...prev, addOnId.id],
    );
  };

  return (
    <Layout generalInfo={pageContext.layout}>
      <HeroSwiper heroInfo={pageContext.package} />
      <div className="w-full max-w-5xl mx-auto relative">
        <Button
          text="Reserve"
          customClass=""
          sticky={isSticky}
          packageInformation={pageContext.package}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          selectedAddOns={selectedAddOns}
          setSelectedAddOns={setSelectedAddOns}
          handleAddOnToggle={handleAddOnToggle}
        />
        <Form formData={formData} />
      </div>
      <div className="mb-10">
        <RichText context={pageContext.package.packageInformation} />
      </div>
      <SwiperCarousel images={pageContext.package.images} />

      <div className="w-full max-w-7xl mx-auto px-4 lg:mt-5 xl:mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className=" lg:basis-1/2">
            {pageContext.package.included !== null ? (
              <>
                {" "}
                <div className="my-5 mx-auto">
                  <TextComponent
                    title="Included"
                    className="my-5 text-center tracking-wide 2xl:mb-2 2xl:mt-10 text-3xl lg:text-4xl"
                  />
                  <ul className="flex flex-col justify-center items-center gap-2">
                    {pageContext.package.packages[0].included.map(
                      (item, index) => {
                        return (
                          <li
                            key={index}
                            className="list-disc text-sm xl:text-lg capitalize"
                          >
                            {item}
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {pageContext.package.videoUrl !== null ? (
            <>
              <div className="w-full lg:basis-1/2 packagePageVideo">
                <ReactPlayer
                  url={pageContext.package.videoUrl}
                  muted
                  controls
                  playing={true}
                  loop
                  width="100%"
                  height="100%"
                  pip
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-full lg:basis-1/2 packagePageVideo">
                <GatsbyImage
                  image={image}
                  alt={pageContext.package.images[0].title}
                  className={`w-full object-cover object-center`}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Faqs faqs={pageContext.package.faqs} />
    </Layout>
  );
};

export default PackagePage;
