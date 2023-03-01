import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-[50px]">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Name</a>
      </div>
      <div className="flex-none gap-4">
        <Link to="/">
          <li className="list-none">Home</li>
        </Link>
        <Link to="/idea/all">
          <li className="list-none">Feeds</li>
        </Link>
        <Link to="/about">
          <li className="list-none">About Us</li>
        </Link>
        <Link to="/contact">
          <li className="list-none">Contact Us</li>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://images.template.net/wp-content/uploads/2015/04/Cartoon-Love-Drawing-Template.jpg" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <Link to="/user/profile">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </Link>

            <Link to="/user/ideas">
              <li>
                <a>My Idea Posts</a>
              </li>
            </Link>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
