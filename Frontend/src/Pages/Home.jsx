import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLatestIdeas } from '../features/idea/ideaSlice';
import HeroSection from '../components/HeroSection';
import IdeaCard from '../components/idea/IdeaCard';
const Home = () => {
  const ideaList = useSelector((state) => state.ideas);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestIdeas());
  }, [dispatch]);
  console.log('latest list', ideaList);

  if (ideaList.loading) {
    return <p>Loading...</p>;
  }

  if (ideaList.error) {
    return <p>There is an error: {ideaList.error}</p>;
  }
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
          {
            !ideaList.loading && ideaList.latestIdeas.data.map((data) => (
              //console.log('latest',data)
              <IdeaCard
                category_type={data.category_id}
                idea_description={data.idea_description}
                id={data.idea_id}
              />
            ))
          }
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
          {
            !ideaList.loading && ideaList.latestIdeas.data.map((data) => (
              //console.log('latest',data)
              <IdeaCard
                category_type={data.category_id}
                idea_description={data.idea_description}
                id={data.idea_id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
