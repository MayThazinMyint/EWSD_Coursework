import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import ProtectedRoute from "./Pages/routes/ProtectedRoutes";
import Navbar from "./components/common/Navbar";
import Error from "./Pages/routes/Error";
import RegisterUser from "./Pages/admin/users/RegisterUser";
import UserList from "./Pages/admin/users/UserList";
import DepartmentList from "./Pages/admin/department/DepartmentList";
import Layout from "./components/helper/Layout";
import CreateIdea from "./Pages/idea/CreateIdea";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
        path="/admin/user-list"
        element={<ProtectedRoute isAuth={true} />}
      /> */}
        <Route path="/admin/register-user" element={<RegisterUser />} />
        <Route path="/admin/user-list" element={<UserList />} />
        <Route path="/admin/department-list" element={<DepartmentList />} />
        <Route path="/idea/create-idea" element={<CreateIdea />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
