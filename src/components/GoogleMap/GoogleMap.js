import React from "react";

const GoogleMap = () => {
  return (
    <div className="google-maps mx-5 h-96 lg:mx-10 xl:mx-auto xl:w-[64rem] max-w-5xl">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Punta%20Cana+()&amp;t=h&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
