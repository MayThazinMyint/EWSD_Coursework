import React from "react";
import Navbar from "../common/Navbar";

function Layout(props) {
  return (
    <div className="">
      <Navbar />

      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
