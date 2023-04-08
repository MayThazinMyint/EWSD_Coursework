import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import logo from '../../assets/logo.png';
import Cookies from 'js-cookie';
import ProfilePicture from '../idea/ProfilePicture';
import { fetchSingleUser } from '../../features/user/userSlice';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user);
  const userId = Cookies.get('userId');
  const userRole = Cookies.get('userRole');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch]);
  const handleLogout = () => {
    Cookies.set('isAuthenticated', false);
    Cookies.set('token', null);
    Cookies.set('userRole', null);
    Cookies.set('userId', null);
    Cookies.set('departmentId', null);
    dispatch(logout());
    navigate('/');
  };
  const links = [
    {
      id: 1,
      name: 'home',
      link: '/home',
    },
    {
      id: 3,
      name: 'Ideas',
      link: '/idea/all',
    },
    {
      id: 4,
      name: 'Add Idea',
      link: '/idea/add',
    },
    {
      id: 5,
      name: 'About Us',
      link: '/about',
    },
    {
      id: 6,
      name: 'profile',
      link: '/user/profile',
    },
    {
      id: 7,
      name: 'logout',
      link: '/',
    },
    
  ];

  return (
    <div className="flex justify-between z-[100] items-center w-full h-[80px] md:px-[100px] px-[25px] bg-slate-100  text-slate-500 fixed">
      <div className="flex space-x-2 justify-center items-center">
        <h1 className="text-2xl font-signature text-slate-800">Idea Hub</h1>
        <Link to='/admin/dashboard' className="text-lg font-signature text-slate-800">{userRole == 1 || userRole == 2 || userRole == 3 ? 'Dashboard':null}</Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            <Link to={`${link}`} onClick={name === 'logout' && handleLogout}>
              {isLogin ? name : null}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute  top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link, name }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-3xl hover:underline-offset-1"
            >
              <Link onClick={() => setNav(!nav)} to={link} smooth duration={500}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
