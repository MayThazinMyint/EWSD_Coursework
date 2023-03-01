import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
const UserList = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (user.loading) {
    return <p>Loading...</p>;
  }

  if (user.error) {
    return <p>There is an error: {user.error}</p>;
  }
  return (
    <div className="flex flex-col p-[50px] mt-[50px]">
      <div className="flex justify-between">
        <p className="font-bold text-lg ">User List</p>
        <Link to="/admin/register-user">
          <button className="w-[8rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-[5px] md:px-3 py-2.5 text-center">Add User</button>
        </Link>
      </div>

      {/* {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null} */}
      {!user.loading && user.users.data.length ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      ID
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Role
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Department
                    </th>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.users.data.map((user) => (
                    <tr
                      className={`border-b 
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.user_name}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.user_role_id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.department_id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-8">
                          <Link to={`/admin/user/${user.id}`}>
                            <button>
                              <AiOutlineEdit size={20} id={user.id} />
                            </button>
                          </Link>
                          <button>
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
  );
};

export default UserList;
