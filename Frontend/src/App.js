import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import ProtectedRoute from "./Pages/routes/ProtectedRoutes";
import Error from "./Pages/routes/Error";
import RegisterUser from "./Pages/admin/users/RegisterUser";
import UserList from "./Pages/admin/users/UserList";
import DepartmentList from "./Pages/admin/department/DepartmentList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route
        path="/admin/user-list"
        element={<ProtectedRoute isAuth={true} />}
      /> */}
      <Route path="/admin/register-user" element={<RegisterUser />} />
      <Route path="/admin/user-list" element={<UserList />} />
      <Route path="/admin/department-list" element={<DepartmentList />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
