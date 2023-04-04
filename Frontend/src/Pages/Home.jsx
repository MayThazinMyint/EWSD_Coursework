import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLatestIdeas, fetchPopularIdeas } from '../features/idea/ideaSlice';
import HeroSection from '../components/HeroSection';
import Loading from '../components/common/Loading';
import PostedBy from '../components/idea/PostedBy';

const Home = () => {
  const ideaList = useSelector((state) => state.ideas);
  const [latestIdeas,setLatestIdeas] = useState(null);
  const [popularIdeas, setPopularIdeas] = useState(null)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestIdeas()).then((res) => {
      setLatestIdeas(res.payload.data);
      console.log('setLatestIdeas', res.payload.data);
    });
    dispatch(fetchPopularIdeas()).then((res) => {
      setPopularIdeas(res.payload.data);
      console.log('setPopularIdeas', res.payload.data);
    });
  }, [dispatch]);
  

  if (ideaList.loading || latestIdeas === null || popularIdeas === null) {
    return <Loading />;
  }

  if (ideaList.error) {
    return <p>There is an error: {ideaList.error}</p>;
  }
  return (
    <div className="md:px-[4rem] px-[1rem] pt-[100px]">
      <HeroSection />
      <div className="px-4 mx-auto py-[2rem]">
        <div className="flex justify-between items-center mx-4">
          <h1 className="text-2xl font-bold">Popular Ideas</h1>
          <Link to="/idea/all">
            <h1 className="pb-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className=" flex gap-[50px]  flex-row overflow-x-auto">
          {!ideaList.loading &&
            popularIdeas.map((data) => (
              //console.log('latest', data),
              <Link to={`/idea/${data.idea_id}`}>
                <div className={`w-[400px] rounded overflow-hidden shadow-lg`}>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{data.category.category_type}</div>
                    <p class="text-gray-700 text-base">{data.idea_description.slice(0, 30)}...</p>
                  </div>
                  <div class="flex flex-col justify-between p-2 pb-2">
                    <p className="px-3">{data.department.department_description}</p>

                    <div className="flex items-center">
                      <p className="px-3">
                        Posted by: {data.is_anonymous ? 'Anonymous' : data.user.user_name}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="px-4 mx-auto">
        <div className="flex justify-between items-center mx-4">
          <h1 className="text-2xl font-bold">Latest Ideas</h1>
          <Link to="/idea/all">
            <h1 className="pb-[50px] text-md font-semibold">See All</h1>
          </Link>
        </div>
        <div className=" flex gap-[50px] flex-row overflow-x-auto pb-4">
          {!ideaList.loading &&
            latestIdeas.slice(0, 3).map((data) => (
              //console.log('latest', data),
              <Link to={`/idea/${data.idea_id}`}>
                <div className={`w-[400px] rounded overflow-hidden shadow-lg`}>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{data.category.category_type}</div>
                    <p class="text-gray-700 text-base">{data.idea_description.slice(0, 30)}...</p>
                  </div>
                  <div class="flex flex-col justify-between p-2 pb-2">
                    <p className="px-3">{data.department.department_description}</p>

                    <div className="flex items-center">
                      <p className="px-3">
                        Posted by: {data.is_anonymous ? 'Anonymous' : data.user.user_name}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
