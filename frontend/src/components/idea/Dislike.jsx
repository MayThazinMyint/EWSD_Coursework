import React from "react";
import { BiDislike } from "react-icons/bi";

const Dislike = ({ count }) => {
  return (
    <span class="flex items-center space-x-2  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      <BiDislike size={20} /> {count}
    </span>
  );
};

export default Dislike;
