import React from "react";
import Faq from "react-faq-component";
import uniqueByTitle from "../../hooks/uniqueByTitle";
const Faqs = ({ faqs, title = "FAQ" }) => {
  const uniqueObjects = uniqueByTitle(faqs);
  let faqsArray = [];
  uniqueObjects.forEach((item) => {
    let object = { title: item.title, content: item.content.content };
    faqsArray.push(object);
  });
  const data = {
    rows: faqsArray,
  };
  const styles = {
    bgColor: "white",
    titleTextColor: "#48482a",
    rowTitleColor: "#48484a",
    rowTitleTextSize: "large",
    rowContentColor: "#48484a",
    rowContentTextSize: "16px",
    rowContentPaddingTop: "10px",
    rowContentPaddingBottom: "10px",
    rowContentPaddingLeft: "10px",
    rowContentPaddingRight: "10px",
    arrowColor: "black",
  };

  const config = {
    animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  };
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-5 lg:mx-10 xl:mx-auto max-w-5xl my-16 md:my-24"
    >
      <h2
        id="faq-heading"
        className="font-crimson font-normal tracking-wide text-3xl md:text-4xl text-gray-900 text-center mb-10"
      >
        {title}
      </h2>
      <Faq data={data} styles={styles} config={config} />
    </section>
  );
};

export default Faqs;
