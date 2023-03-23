import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleIdea } from '../../features/idea/ideaSlice';

import Like from '../../components/idea/Like';
import Dislike from '../../components/idea/Dislike';
import CategoryTag from '../../components/idea/CategoryTag';
import Comment from '../../components/comment/Comment';

const Idea = () => {
  const idea = useSelector((state) => state.ideas);
  console.log('single idea fetch', idea);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log('id', { id });
  useEffect(() => {
    dispatch(fetchSingleIdea(id));
  }, [dispatch, id]);
  const showComment = () => {
    setIsShow(!isShow);
  };
  return (
    <>
      {!idea.loading ? (
        <div className="px-[50px] flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-2 shadow-lg md:w-[500px] w-[300px] p-4">
            <div className="flex flex-row space-x-4 mb-4 items-center ">
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-slate-400 rounded-full cursor-pointer">
                <h6 className="text-white text-xl">A</h6>
              </div>
              <p className="font-semibold">User Name</p>
            </div>

            <div className="flex space-x-4">
              <p>Department Name</p>
              <CategoryTag category="event" />
            </div>
            {idea.idea.data.file_path ? <img src={idea.idea.data.file_path} alt='idea_image'/>: null}
            <div className="flex flex-col space-y-4">
              <p>{idea.idea.data.idea_description}</p>

              <div class="flex flex-row ">
                <Like count={22} />
                <Dislike count={5} />
              </div>
            </div>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your comment here"
              required
            ></textarea>

            <div className="flex justify-between">
              <button onClick={showComment}>5 comments</button>
              <button
                className="w-[70px] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Post
              </button>
            </div>
            {isShow && (
              <div className="pt-4 flex flex-col space-y-4">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Idea;
