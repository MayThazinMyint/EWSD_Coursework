import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function Layout(props) {
  return (
    <div className="">
      <Navbar />

      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
