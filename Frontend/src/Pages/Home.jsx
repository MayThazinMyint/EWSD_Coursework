import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import IdeaCard from '../components/idea/IdeaCard';
const Home = () => {
  return (
    <div className="px-[4rem]">
      <HeroSection />
      <div className="px-4 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Popular Posts</h1>
          <Link to="/idea/all">
            <h1 className="pb-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className=" flex justify-between flex-row flex-wrap">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </div>
      <div className="px-4 py-[50px]">
        <div className="flex justify-between items-center">
          <h1 className=" text-2xl font-bold">Newest Posts</h1>
          <Link to="/idea/all">
            <h1 className="pb-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className=" flex justify-between flex-row flex-wrap">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
