import React from "react";
import IdeaCard from "../../components/idea/IdeaCard";

const Ideas = () => {
  return (
    <>
      <h3 className="text-center font-bold text-xl">My Idea Posts</h3>
      <div className="p-[50px] flex justify-center flex-row flex-wrap gap-4">
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </div>
    </>
  );
};

export default Ideas;
