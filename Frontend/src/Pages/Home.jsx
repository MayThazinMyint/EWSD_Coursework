import React from 'react';
import PostInput from '../components/idea/PostInput';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import IdeaCard from '../components/idea/IdeaCard';
const Home = () => {
  return (
    <div className="px-[50px]">
      <HeroSection />
      <div className="p-[50px]">
        <div className="flex justify-between items-center">
          <h1 className="p-[50px] text-xl font-bold">Popular Posts</h1>
          <Link to="/idea/all">
            <h1 className="p-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className="mt-4 flex justify-center flex-row flex-wrap gap-4">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </div>
      <div className="p-[50px]">
        <div className="flex justify-between items-center">
          <h1 className="p-[50px] text-xl font-bold">Newest Posts</h1>
          <Link to="/idea/all">
            <h1 className="p-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className="mt-4 flex justify-center flex-row flex-wrap gap-4">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
