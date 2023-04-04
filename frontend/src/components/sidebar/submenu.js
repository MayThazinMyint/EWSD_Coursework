import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { logout } from '../../features/auth/authSlice';

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16.5px;
  margin-bottom: 8px;

  &:hover {
    background: #bdbdbd;
    cursor: pointer;
    border-radius: 17px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #eeeeee;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 16px;
  margin-left: 15px;

  &:hover {
    background: #bdbdbd;
    cursor: pointer;
    border-radius: 17px;
  }
`;

const Submenu = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (item) => {
    console.log('clicked');
    if (item.title === 'Logout') {
        //console.log('Logout clicked');
        Cookies.set('isAuthenticated', false);
        Cookies.set('token', null);
        Cookies.set('userRole', null);
        Cookies.set('userId', null);
        Cookies.set('departmentId',null);
      dispatch(logout());
      navigate('/');
    }
  };
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  
  return (
    <div onClick={() => handleLogout(item)}>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        {item.src? <img className='w-[150px]' src={item.src} alt='logo'/>: item.icon}
        
        <SidebarLabel>{item.title} </SidebarLabel>

        <div>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </div>
  );
};

export default Submenu;
