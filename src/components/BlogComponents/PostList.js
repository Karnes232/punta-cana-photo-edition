import React from "react";
import RecommendationCard from "./RecommendationCard";

const PostList = ({ list }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly md:space-x-10 max-w-5xl xl:max-w-6xl mx-auto">
        {list &&
          list.map((blog, index) => {
            return <RecommendationCard blog={blog} key={index} />;
          })}
        {/* {list.map((blog, index) => {
          return <RecommendationCard blog={blog} key={index} />;
        })} */}
      </div>
    </>
  );
};

export default PostList;
