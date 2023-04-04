import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Cookies from 'js-cookie';
import { adminSidebardata, QACoordinatorSidebardata, QAManagerSidebardata } from './sidebardata';
import Submenu from './submenu';

const Nav = styled.div`
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
  overflow: auto;
  flex-shrink: 0;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, SetSidebar] = useState(true);
  const showSidebar = () => SetSidebar(!sidebar);
  const [sideBarData,setSideBarData] = useState(null)
  const userRole = Cookies.get('userRole');  
  useEffect(() => {
    if (userRole == 1) {
      setSideBarData(adminSidebardata);
    } else if (userRole == 2) {
      setSideBarData(QAManagerSidebardata);
    } else if (userRole == 3) {
      setSideBarData(QACoordinatorSidebardata);
    }
    console.log('data',sideBarData);
  }) 
  return (
    <header>
      <div className="md:hidden">
        <Nav className="transition-transform translate-x-0 sm:translate-x-full">
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
      </div>
      <div className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} className="sm:hidden" />
            </NavIcon>
            {sideBarData !== null && sideBarData.map((item, index) => {
              return <Submenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </div>
    </header>
  );
};

export default Sidebar;
