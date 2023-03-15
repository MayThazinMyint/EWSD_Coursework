import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
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
  const [subnav, setSubnav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSubnav = () => setSubnav(!subnav);
  
  const handleClick = (item) => {
    console.log('item', item);
    if (item.title === 'Logout') {
      console.log('logout');
      Cookies.set('isAuthenticated', '', { expires: 1 });
      Cookies.set('userRole', '', { expires: 1 });
      dispatch(logout());
      navigate('/');
      
    }
  };
  
  return (
    <>
      <div onClick={() => handleClick(item)}>
        <SidebarLink onClick={item.subNav && showSubnav} to={item.path}>
          {item.icon}
          {item.src && <img className="w-[150px]" src={item.src} alt="logo" />}
          <SidebarLabel>{item.title} </SidebarLabel>

          <div>
            {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
          </div>
        </SidebarLink>
      </div>

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default Submenu;
