import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiLike, BiDislike } from 'react-icons/bi';
import { SlLike, SlDislike } from 'react-icons/sl';
import { fetchSingleIdea } from '../../features/idea/ideaSlice';
import { fetchComments, postComment } from '../../features/idea/commentSlice';
import {AiFillLike, AiFillDislike} from 'react-icons/ai';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import CategoryTag from '../../components/idea/CategoryTag';
import Comment from '../../components/comment/Comment';
import Cookies from 'js-cookie';
import { fetchVotes, postVote } from '../../features/idea/votingSlice';

const Idea = () => {
  const idea = useSelector((state) => state.ideas);
  const comments = useSelector((state) => state.comment);
  const voting = useSelector((state) => state.voting);
  const [comment, setComment] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [like, setLike] = useState(0);
  const [unlike, setUnlike] = useState(0);
  const [isLiked, setIsLiked] = useState(0);
  const [isUnliked, setIsUnliked] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false)
  const userId = Cookies.get('userId');

  const dispatch = useDispatch();
  let { id } = useParams();
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaError, setTextareaError] = useState(false);
  const [isChecked, setIsCheck] = useState(false)
  const dataObj = {
    "idea_id": Number(id),
    "user_id": Number(userId),
  };
  //console.log('data obj',dataObj);
  useEffect(() => {
    dispatch(fetchSingleIdea(id));
    dispatch(fetchComments(id)).then((response) => {
      //console.log('fetch cmt and set cmts', response.payload.data);
      setComment(response.payload.data);
    });
    dispatch(fetchVotes(dataObj)).then((response) => {
      console.log('fetch votes and set votes', response);
      setLike(response.payload.total_like);
      setUnlike(response.payload.total_dislike);
      if (response.payload.is_user_liked !== null && response.payload.is_user_liked.is_liked === 1) {
        setIsDisabled(true);
        setIsLiked(true);
      }
      if (response.payload.is_user_liked === null) {
        setIsDisabled(false);
        setIsLiked(false);
        setIsUnliked(false);
      }
      if (
        response.payload.is_user_liked !== null &&
        response.payload.is_user_liked.is_unliked === 1
      ) {
        setIsDisabled(true);
        setIsUnliked(true);
      }
         
    });
  }, [dispatch, id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textareaValue.trim() === '') {
      setTextareaError(true);
    } else {
      const data = {
        comment_description: textareaValue,
        is_anonymous: isChecked?1:0,
        user_id: userId,
        idea_id: id,
      };
      console.log('post cmt', data);
      dispatch(postComment(data)).then((res) => {
        setIsCheck(false)
        setTextareaValue('');
        //console.log('cmt success', res);
        dispatch(fetchComments(id)).then((response) => {
          setComment(response.payload.data);
        });
      });
    }
  };

  const addLike = (e) => {
    e.preventDefault();
    const data = {
      idea_id: id,
      user_id: userId,
      is_liked: like + 1,
      is_unliked: 0,
    };
    // console.log('add like data', data);
    dispatch(postVote(data)).then((res) => {
      console.log('vote success', res);
      dispatch(fetchVotes(dataObj)).then((response) => {
        console.log('after votes', response);
        setLike(response.payload.total_like);
        setIsDisabled(true);
        setIsLiked(true);
      });
    });
  };

  const addDisLike = (e) => {
    e.preventDefault();
    const data = {
      idea_id: id,
      user_id: userId,
      is_liked: 0,
      is_unliked: unlike + 1,
    };
    console.log('add dislike data', data);
    dispatch(postVote(data)).then((res) => {
      console.log('vote success', res);
      dispatch(fetchVotes(dataObj)).then((response) => {
        setUnlike(response.payload.total_dislike);
        setIsDisabled(true);
        setIsUnliked(true);
      });
    });
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    setTextareaError(false);
  };

 
  const showComment = () => {
    setIsShow(!isShow);
  };
  if (idea.loading || comments.loading || comment === null) {
    return <p>Loading...</p>;
  }

  if (idea.error) {
    return <p>There is an error: {idea.error}</p>;
  }
  return (
    // <p>idea</p>
    <div className="h-[80vh] flex items-center justify-center">
      {!idea.loading && !comments.loading && !voting.loading ? (
        <div className="px-[50px] flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-2 shadow-lg md:w-[500px] w-[300px] p-4">
            <div className="flex flex-row space-x-4 mb-4 items-center ">
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-slate-400 rounded-full cursor-pointer">
                <h6 className="text-white text-2xl">
                  {idea.idea.data[0].user.user_name.charAt(0)}
                </h6>
              </div>
              <p className="font-semibold">{idea.idea.data[0].user.user_name}</p>
            </div>

            <div className="flex space-x-4">
              <p>{idea.idea.data[0].department.department_description}</p>
              <CategoryTag category={idea.idea.data[0].category.category_type} />
            </div>
            {idea.idea.data[0].attachment ? (
              <img src={idea.idea.data[0].attachment} alt="idea_image" />
            ) : null}
            <div className="flex flex-col space-y-4">
              <p>{idea.idea.data[0].idea_description}</p>

              <div class="flex flex-row items-center gap-2">
                <div className="flex flex-row justify-center items-center gap-2">
                  <button onClick={addLike} disabled={isDisabled}>
                    {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                  </button>
                  {like}
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                  <button onClick={addDisLike} disabled={isDisabled}>
                    {isUnliked ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                  </button>{' '}
                  {unlike}
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              {' '}
              <textarea
                id="message"
                rows="4"
                value={textareaValue}
                onChange={handleTextareaChange}
                className={`${
                  textareaError ? '1px solid red' : '1px solid black'
                }block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300`}
                placeholder="Write your comment here"
                required
              ></textarea>
              <label>
                <input type="checkbox" checked={isChecked} onChange={() => setIsCheck(!isChecked)} />
                Do you want to comment anonymously?
              </label>
              <div className="flex justify-between">
                <p onClick={showComment}>
                  {!comments.loading && (comment !== null) & (comment.length > 0)
                    ? `${comment.length} comment`
                    : null}
                </p>

                <button
                  className="w-[70px] text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>

            {isShow && (
              <div className="pt-4 flex flex-col space-y-4">
                {comment.map((cmt) => (
                  <Comment
                  is_anonymous={cmt.is_anonymous}
                    userName={cmt.user_name}
                    comment_description={cmt.comment_description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Idea;
