import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../features/user/userSlice';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Sidebardata } from './sidebardata';
import Submenu from './submenu';
import Cookies from 'js-cookie';

const Nav = styled.div`
  margin-top: 50px;
  height: full;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: 350ms;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #1447e6;
`;

const SidebarNav = styled.nav`
  background: #eeeeee;
  width: 250px;
  height: 100vh;
  display: flex;
  top: 0;
  justify-content: center;
  position: fixed;
  left: ${({ sidebar }) => (sidebar ? '0' : '100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  
  const [sidebar, SetSidebar] = useState(true);
  const showSidebar = () => SetSidebar(!sidebar);
  
  const userRole = Cookies.get('userRole');
  console.log('user role side bar',userRole);
  let filteredData = [];
  filteredData = [...Sidebardata]
  if(userRole === 2 || userRole === '3'){  
    filteredData = filteredData.filter((data) => data.id !== '2');
    console.log('hide user management', filteredData);
  }
  // if(userRole !== '1' || userRole !== '3') {
  //   filteredData = filteredData.filter((data) => data.id !== '3');
  //   console.log('hide category management', filteredData);
  // }
  
  return (
    <header>
      <div className="md:hidden">
        <Nav className="transition-transform translate-x-0 sm:translate-x-full">
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
      </div>
      <div className="fixed pt-[50px] top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} className="sm:hidden" />
            </NavIcon>
            {filteredData.map((item, index) => {
              return <Submenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </div>
    </header>
  );
};

export default Sidebar;
