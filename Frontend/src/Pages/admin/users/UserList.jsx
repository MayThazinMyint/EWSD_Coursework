import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import Sidebar from '../../../components/sidebar/Sidebar';
import Loading from '../../../components/common/Loading'
const UserList = () => {
  const user = useSelector((state) => state.user);
  const [showWarning, setShowWarning] = useState(false);
  const [userId, setUserId] = useState();
  const [userList, setUserList] = useState(null)
  const handleCancel = () => {
    setShowWarning(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers()).then((res) => {
      setUserList(res.payload.data)
    })
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    setUserId(userId);
    setShowWarning(true);
    //console.log('user id', userId);
  };

  const handleDeleteConfirmClick = () => {
    dispatch(deleteUser(userId));
    setUserId(null);
    setShowWarning(false);
    //console.log('user id', userId);
    dispatch(fetchUsers()).then((res) => {
      setUserList(res.payload.data);
    });
  };

  if (user.loading || userList === null) {
    return <Loading />;
  }

  if (user.error) {
    return <p>There is an error: {user.error}</p>;
  }
  return (
    <div>
      <Sidebar />
      {!user.loading ? (
        <div className="flex flex-col pl-[350px] py-[50px] mt-[50px]">
          <div className="flex justify-between w-[80%]">
            <p className="font-bold text-lg ">User List</p>
            <Link to="/admin/register-user">
              <button className="w-[8rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-[5px] md:px-3 py-2.5 text-center">
                Add User
              </button>
            </Link>
          </div>

          {/* {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null} */}
          {!user.loading && (userList !== undefined || null) ? (
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-[80%]">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          email
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Role
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(userList !== undefined || null) &&
                        userList.map((user) => (
                          <tr
                            className={`border-b 
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {user.user_name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {user.user_role_name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {user.department_name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-8">
                                <Link to={`/admin/user/${user.id}`}>
                                  <button>
                                    <AiOutlineEdit size={20} id={user.id} />
                                  </button>
                                </Link>
                                <button onClick={() => handleDeleteClick(user.id)}>
                                  <RiDeleteBinLine
                                    size={20}
                                    id={user.id}

                                    // className="text-red-500 fill-current w-6 h-6"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {showWarning ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
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
                    type="submit"
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
  );
};

export default UserList;
