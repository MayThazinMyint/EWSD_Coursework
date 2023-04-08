import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import { fetchIdeas, fetchIdeasByDepartment } from '../../../features/idea/ideaSlice';
import Cookies from 'js-cookie';
import { RiDeleteBinLine } from 'react-icons/ri';
import Loading from '../../../components/common/Loading';
import { fetchCategoriesByDept } from '../../../features/report/dashboardSlice';

const IdeaSummary = () => {
  const ideas = useSelector((state) => state.ideas);
  const dispatch = useDispatch();
  const departmentId = Cookies.get('departmentId');
  const userRole = Cookies.get('userRole');
  const [ideaList, setIdeaList] = useState(null);
  useEffect(() => {
    // will fetch based on user's department
    if (userRole == 3) {
      dispatch(fetchIdeasByDepartment(departmentId)).then((res) => {
        setIdeaList(res.payload.data);
        console.log('show by dpt', ideaList);
      });
      
    } else {
      dispatch(fetchIdeas()).then((res) => {
        setIdeaList(res.payload.data);
        console.log('show all', ideaList);
      });
    }
  }, [dispatch]);

  if (ideas.loading || ideaList === null || ideas.ideaByDept === undefined || ideas.ideas === undefined) {
    return <Loading />;
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

        {!ideas.loading && ideaList && (
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
                  {ideaList.map((idea) => (
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
      </div>
    </div>
  );
};

export default IdeaSummary;
