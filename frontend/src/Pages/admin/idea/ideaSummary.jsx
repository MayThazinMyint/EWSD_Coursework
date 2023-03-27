import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchIdeas } from '../../../features/idea/ideaSlice';
import Cookies from 'js-cookie';
import { RiDeleteBinLine } from 'react-icons/ri';


const IdeaSummary = () => {
  const ideas = useSelector((state) => state.ideas);
    const [showWarning, setShowWarning] = useState(false);
    const [ideaId, setIdeaId] = useState();
  const dispatch = useDispatch();
  const userId = Cookies.get('userId');

  useEffect(() => {
    // will fetch ideas based on user role
    dispatch(fetchIdeas());
  }, [dispatch]);
 const handleDeleteClick = (ideaId) => {
    setIdeaId(ideaId);
   setShowWarning(true);
   console.log('idea id', ideaId);
 };
const handleCancel = () => {
  setShowWarning(false);
};

const handleDeleteConfirmClick = () => {
  // dispatch(deleteCategory(categoryId));
  // setCategoryId(null);
  // setShowWarning(false);
  // console.log('categoryy id', categoryId);
  // dispatch(fetchCategories());
};

  if (ideas.loading) {
    return <p>Loading...</p>;
  }

  if (ideas.error) {
    return <p>There is an error: {ideas.error}</p>;
  }
  return (
    //<p>p</p>
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col pl-[300px] py-[50px]">
        <div className="flex justify-between space-x-2 py-4">
          <p className="font-bold text-lg ">Idea Summary</p>
        </div>

        {!ideas.loading && ideas.ideas.data && (
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Posted Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Idea Description
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Posted By
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Category Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Department
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Academic Year
                      </th>
                      {/* <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  {ideas.ideas.data.map((idea) => (
                    <tbody>
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {idea.created_date}
                        </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {idea.idea_description.slice(0, 15)} ...
                          </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {idea.is_anonymous ? 'Anonymous' : idea.user.user_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {idea.category.category_type}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {idea.department.department_description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {idea.academic_years.academic_year}
                        </td>
                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button>
                            <RiDeleteBinLine
                              onClick={() => handleDeleteClick(idea.idea_id)}
                              size={20}
                              id={idea.idea_id}

                              // className="text-red-500 fill-current w-6 h-6"
                            />
                          </button>
                        </td> */}
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        )}
        {showWarning ? (
          <div className="fixed z-10 inset-0 overflow-y-auto pl-[150px]">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Delete Warning
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        Are you sure you want to delete?.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-[10px]">
                  <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                    <button
                      type="button"
                      onClick={handleDeleteConfirmClick}
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Delete
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IdeaSummary;
