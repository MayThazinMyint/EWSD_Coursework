import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={logo} alt="logo" className="w-[150px] h-[55px]" />
      </div>
      <div className="flex-none gap-8">
        <Link to="/">Idea Posts</Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://wallpapers.com/images/featured/s52z1uggme5sj92d.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                My Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>My Idea Posts</a>
            </li>
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
