import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser, updateUser } from '../../features/user/userSlice';
import ProfilePicture from '../../components/idea/ProfilePicture';


const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log('single user fetch', user.user.data);
  // Get the userId param from the URL.
  const id = Cookies.get('userId')
  const dispatch = useDispatch();
  console.log('id', { id });
  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);
  return (
    <div class="flex items-center pt-8 h-[80vh]  w-full justify-center">
      {!user.loading && (
        <div class="md:max-w-md max-w-sm">
          <div class="flex flex-col items-center bg-white shadow-xl rounded-lg py-3">
            <ProfilePicture fisrtLetter={user.user.data.user_name.charAt(0)} />
            <div class="md:p-8 p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                {user.user.data.user_name}
              </h3>
              <div class="text-center text-gray-400 text-md font-semibold">
                <p>{user.user.data.user_role_name}</p>
              </div>
              <table class="text-md my-3">
                <tbody>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="px-2 py-2">{user.user.data.email}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="px-2 py-2">{user.user.data.user_phone}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                    <td class="px-2 py-2">{user.user.data.address}</td>
                  </tr>
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Department</td>
                    <td class="px-2 py-2">{user.user.data.department_name}</td>
                  </tr>
                  {/* <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Password</td>
                    <td class="px-2 py-2">******</td>
                  </tr> */}
                  {/* <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">Date of Birth</td>
                    <td class="px-2 py-2">8/11/1998</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
