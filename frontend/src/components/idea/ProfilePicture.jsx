import React from "react";

const ProfilePicture = ({fisrtLetter}) => {
  return (
    <div className="flex items-center justify-center w-[60px] h-[60px] bg-slate-400 rounded-full cursor-pointer">
      <h6 className="text-white text-xl">{fisrtLetter}</h6>
    </div>
  );
};

export default ProfilePicture;
