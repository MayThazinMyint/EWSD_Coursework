import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProtectedRoute from "./Pages/routes/ProtectedRoutes";
import Error from "./Pages/routes/Error";
import RegisterUser from "./Pages/admin/users/RegisterUser";
import UserList from "./Pages/admin/users/UserList";
import DepartmentList from "./Pages/admin/department/DepartmentList";
import Navbar from "./components/sidebar/navbar";


function App() {
  return (
    <>
    <Router>
    <Navbar />
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
    </Router>
    </>
  );
}

export default App;
