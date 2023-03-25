import React from "react";

const Comment = ({userName, comment_description}) => {
  return (
    <div className="flex  space-x-4">
      <div className="flex items-center justify-center w-[40px] h-[40px] bg-slate-400 rounded-full cursor-pointer">
        <h6 className="text-white text-md">A</h6>
      </div>

      <div className="bg-slate-100 w-[80%] p-2 rounded-sm">
        <p className="font-semibold">{userName}</p>
        {/* comment */}
        <p>{comment_description}</p>
      </div>
    </div>
  );
};

export default Comment;
