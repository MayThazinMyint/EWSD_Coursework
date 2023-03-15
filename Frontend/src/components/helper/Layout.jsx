import React from "react";
import { useLocation } from 'react-router-dom';

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function Layout(props) {
  const location = useLocation();
  // Check if the current path includes "admin"
  const hideNavbar = location.pathname.includes('admin');
  return (
    <div className="">
      {!hideNavbar && <Navbar />}

      <div className="content">{props.children}</div>
      
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default Layout;
