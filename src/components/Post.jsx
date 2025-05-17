import React, { useState } from "react";

const Post = ({imgSrc, heading, subText}) => {
  return (
    <div className="w-[60em] h-[1/3] rounded-2xl my-6">
      <img src={imgSrc} alt="Explore" className="w-[60em]" />
      <div className="flex flex-col pl-[20em] pr-1">
        <p className="transform translate-y-[-160px] text-4xl font-bold text-white">
          {heading}
        </p>
        <p className="transform translate-y-[-160px] text-md  text-white">
         {subText}
        </p>
      </div>
    </div>
  );
};

export default Post;
