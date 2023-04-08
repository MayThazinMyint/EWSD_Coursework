import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../../assets/lock.png'
export default function Unautorized() {
  return (
    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-5xl">
                You are prohibited to see the content here.
              </h1>
              <p class="my-2 text-gray-800 text-3xl">Please return to login page.</p>
              <Link to='/login'>
                <button class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Return!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[500px]'>
        <img src={lock} alt="lock" />
      </div>
    </div>
  );
}
