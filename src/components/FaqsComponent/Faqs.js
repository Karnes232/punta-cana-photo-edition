import React from "react";
import Faq from "react-faq-component";
import uniqueByTitle from "../../hooks/uniqueByTitle";
const Faqs = ({ faqs }) => {
  const uniqueObjects = uniqueByTitle(faqs);
  let faqsArray = [];
  uniqueObjects.forEach((item) => {
    let object = { title: item.title, content: item.content.content };
    faqsArray.push(object);
  });
  const data = {
    title: "FAQ",
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
    <div className="mx-5 lg:mx-10 xl:mx-auto max-w-5xl my-10">
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default Faqs;
