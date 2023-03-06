import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../../features/user/userSlice';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../../../components/idea/ProfilePicture';
import Sidebar from '../../../components/sidebar/Sidebar';

const User = () => {
  const user = useSelector((state) => state.user);
  console.log('single user fetch', user.user.data);
  const dispatch = useDispatch();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log('id', { id });
  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  if (user.loading) {
    return <p>Loading...</p>;
  }

  if (user.error) {
    return <p>There is an error: {user.error}</p>;
  }
  return (
    <>
    <Sidebar />
      <>
        {!user.loading && user.user.data && (
          <div class="flex items-center h-[75vh] w-md pl-[200px] justify-center">
            <div class="flex flex-col items-center bg-white shadow-xl rounded-lg py-3 px-6">
              <ProfilePicture />
              <div class="p-4">
                <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                  {user.user.data.user_name}
                </h3>
                <div class="text-center text-gray-400 text-md font-semibold">
                  <p>{user.user.data.user_role_name}</p>
                </div>
                <table class="text-md my-3">
                  <tbody>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Email</td>
                      <td class="px-4 py-2">{user.user.data.email}</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Phone</td>
                      <td class="px-4 py-2">{user.user.data.user_phone}</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Address</td>
                      <td class="px-4 py-2">{user.user.data.address}</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Department</td>
                      <td class="px-4 py-2">{user.user.data.department_name}</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Password</td>
                      <td class="px-4 py-2">{user.user.data.address}</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 text-gray-500 font-semibold">Date of Birth</td>
                      <td class="px-4 py-2">8/11/1998</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default User;
