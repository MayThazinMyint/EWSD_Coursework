import React from "react";

const CategoryTag = ({ category }) => {
  return (
    <span class="flex items-center space-x-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {category}
    </span>
  );
};

export default CategoryTag;
