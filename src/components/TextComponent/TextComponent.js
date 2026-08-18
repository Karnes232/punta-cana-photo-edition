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
      <div className="flex flex-col items-center justify-center text-center max-w-5xl  lg:p-2 mx-auto">
        {title && (
          <HeadingTag id={id} className={`font-crimson ${className}`}>
            {title}
          </HeadingTag>
        )}

        {paragraph && (
          <p
            className={`font-crimson lg:text-lg text-gray-700 lg:mt-5 ${pClassName}`}
          >
            {paragraph}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextComponent;
