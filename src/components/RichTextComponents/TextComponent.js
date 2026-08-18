import React from "react";
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
      <div className="flex flex-col justify-center max-w-5xl mx-5 lg:p-2 xl:mx-auto">
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
      </div>
    </div>
  );
};

export default TextComponent;
