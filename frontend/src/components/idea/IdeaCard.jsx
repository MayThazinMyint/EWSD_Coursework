import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Dislike from "./Dislike";
import PostedBy from "./PostedBy";
const IdeaCard = ({idea_description, category_type,id }) => {
  return (
    <Link to={`/idea/${id}`}>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{category_type}</div>
          <p class="text-gray-700 text-base">{idea_description}</p>
        </div>
        <div class="flex flex-row justify-between px-6 pt-4 pb-2">
          <div class="flex flex-row ">
            <Like count={22} />
            <Dislike count={5} />
          </div>
          <PostedBy name="Josh" />
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;
