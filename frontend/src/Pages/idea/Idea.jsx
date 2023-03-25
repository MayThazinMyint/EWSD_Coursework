import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleIdea } from '../../features/idea/ideaSlice';
import { fetchComments, postComment } from '../../features/idea/commentSlice';
import Like from '../../components/idea/Like';
import Dislike from '../../components/idea/Dislike';
import CategoryTag from '../../components/idea/CategoryTag';
import Comment from '../../components/comment/Comment';
import Cookies from 'js-cookie';

const Idea = () => {
  const idea = useSelector((state) => state.ideas);
  const comments = useSelector((state) => state.comment);
  const [comment,setComment] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const userId = Cookies.get('userId')
  const dispatch = useDispatch();
  let { id } = useParams();
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaError, setTextareaError] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleIdea(id));
    dispatch(fetchComments(id)).then((response) => {
      setComment(response.payload.data);
    });
  }, [dispatch, id]);
  // console.log('cmt',comment);
  // console.log('id', id);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textareaValue.trim() === '') {
      setTextareaError(true);
    } else {
      // handle form submission
      
      const data = {
        comment_description: textareaValue,
        is_anonymous: 0,
        user_id: userId,
        idea_id: id,
      };
      // console.log('post cmt', data);
      dispatch(postComment(data)).then((res) => {
        setTextareaValue('')
        console.log('cmt success',res);
        dispatch(fetchComments(id)).then((response) => {
          setComment(response.payload.data);
        });
      })
    }
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    setTextareaError(false);
  };

  const showComment = () => {
    setIsShow(!isShow);
  };
  if (
    idea.loading ||
    comments.loading ||
    !idea.idea.data[0] ||
    !comments.comments.data
  ) {
    return <p>Loading...</p>;
  }

  if (idea.error) {
    return <p>There is an error: {idea.error}</p>;
  }
  return (
    // <p>idea</p>
    <div className="h-[70vh] flex items-center justify-center">
      {!idea.loading ? (
        <div className="px-[50px] flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-2 shadow-lg md:w-[500px] w-[300px] p-4">
            <div className="flex flex-row space-x-4 mb-4 items-center ">
              <div className="flex items-center justify-center w-[60px] h-[60px] bg-slate-400 rounded-full cursor-pointer">
                <h6 className="text-white text-xl">A</h6>
              </div>
              <p className="font-semibold">{idea.idea.data[0].user.user_name}</p>
            </div>

            <div className="flex space-x-4">
              <p>{idea.idea.data[0].department.department_description}</p>
              <CategoryTag category={idea.idea.data[0].category.category_type} />
            </div>
            {idea.idea.data[0].file_path ? (
              <img src={idea.idea.data[0].file_path} alt="idea_image" />
            ) : null}
            <div className="flex flex-col space-y-4">
              <p>{idea.idea.data[0].idea_description}</p>

              <div class="flex flex-row ">
                <Like count={22} />
                <Dislike count={5} />
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
              <div className="flex justify-between">
                <p onClick={showComment}>
                  {!comments.loading && comment !== null & comment.length > 0
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
