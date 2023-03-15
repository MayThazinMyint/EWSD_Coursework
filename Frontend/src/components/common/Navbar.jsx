import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'
import logo from '../../assets/logo.png';
import Cookies from 'js-cookie';
const Navbar = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.set('isAuthenticated', false);
    Cookies.set('userRole', null);
    dispatch(logout());
    navigate('/')
  };
  return (
    <div className="navbar bg-base-100 px-[100px]">
      <div className="flex-1">
        <p className="btn btn-ghost normal-case text-xl">
          <img src={logo} className="w-full h-[50px]" alt="" />
        </p>
      </div>
      <div className="flex-none gap-4">
        <Link to="/">
          <li className="list-none ">Home</li>
        </Link>
        <Link to="/idea/all">
          <li className="list-none">Ideas</li>
        </Link>
        <Link to="/about">
          <li className="list-none">About Us</li>
        </Link>
        <Link to="/contact">
          <li className="list-none">Contact Us</li>
        </Link>
        {isLogin ? (
          <Link to="/idea/add">
            <li className="list-none">Add Idea</li>
          </Link>
        ) : null}

        {isLogin ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://images.template.net/wp-content/uploads/2015/04/Cartoon-Love-Drawing-Template.jpg"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <Link to="/user/profile">
                <li>
                  <p>My Profile</p>
                </li>
              </Link>

              <Link to="/user/ideas">
                <li>
                  <p>My Idea Posts</p>
                </li>
              </Link>
              <li>
                <button onClick={() => handleLogout()}>Log out</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <li className="list-none">Login</li>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
