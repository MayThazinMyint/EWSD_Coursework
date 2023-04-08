import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import logo from '../../assets/logo.png';
import Cookies from 'js-cookie';
import ProfilePicture from '../idea/ProfilePicture';
import { fetchSingleUser } from '../../features/user/userSlice';
const Navbar = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user);
  //console.log('user name',user)
  const userId = Cookies.get('userId')
  const userRole = Cookies.get('userRole')
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
    Cookies.set('departmentId',null)
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="navbar fixed inset-x-0 top-0 bg-slate-400 z-10 px-[100px]">
      <div className="flex-1">
        <p className="btn btn-ghost normal-case text-xl">
          <img src={logo} className="w-full h-[50px]" alt="" />
        </p>
      </div>
      <div className="flex-none gap-4">
        <Link to="/home">
          <li className="list-none ">Home</li>
        </Link>
        {userRole == 1 || userRole == 2 || userRole == 3 ? (
          <Link to="/admin/dashboard">
            <li className="list-none">Dashboard</li>
          </Link>
        ) : null}
        {isLogin ? (
          <Link to="/idea/all">
            <li className="list-none">Ideas</li>
          </Link>
        ) : null}
        <Link to="/about">
          <li className="list-none">About Us</li>
        </Link>
        {isLogin ? (
          <Link to="/idea/add">
            <li className="list-none">Add Idea</li>
          </Link>
        ) : null}

        {isLogin ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="flex flex-col items-center w-[35px] h-[35px] p-1 bg-slate-500 rounded-full cursor-pointer">
                <h6 className="text-white text-xl">
                  {user.user.data && user.user.data.user_name.charAt(0)}
                </h6>
              </div>
              {/* <div className="flex flex-col items-center">{user.user.data.user_name.charAt(0)}
                 <img w-10 rounded-full
                  src="https://images.template.net/wp-content/uploads/2015/04/Cartoon-Love-Drawing-Template.jpg"
                  alt="profile"
                /> 
                <ProfilePicture fisrtLetter={user.user.data.user_name.charAt(0) } />
              </div> */}
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
