import React from "react";
import { Route } from "react-router-dom";

import Login from "../Login";
import UserList from "../admin/users/UserList";

const ProtectedRoute = ({ isAuth }) => {
  return isAuth ? <UserList /> : <Login />;
};

export default ProtectedRoute;
