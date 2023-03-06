import React from 'react';
import ProfilePicture from '../../components/idea/ProfilePicture';

const EditUser = () => {
  return (
    <div class="flex items-center h-[75vh]  w-full justify-center">
      <div class="max-w-sm">
        <div class="flex flex-col items-center bg-white shadow-xl rounded-lg py-3">
          <ProfilePicture />
          <div class="p-4">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
            <div class="text-center text-gray-400 text-md font-semibold">
              <p>Staff</p>
            </div>
            <table class="text-md my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">johndoe@gmail.com</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Address</td>
                  <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Department</td>
                  <td class="px-2 py-2">Human Resource</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Password</td>
                  <td class="px-2 py-2">******</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Date of Birth</td>
                  <td class="px-2 py-2">8/11/1998</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
