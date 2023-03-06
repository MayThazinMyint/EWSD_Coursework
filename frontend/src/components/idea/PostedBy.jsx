import React from "react";

const PostedBy = ({ name }) => {
  return (
    <span class="flex  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      by {name}
    </span>
  );
};

export default PostedBy;
