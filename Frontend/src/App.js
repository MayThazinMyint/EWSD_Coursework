import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import Navbar from './components/common/Navbar';
import PrivateRoute from './Pages/routes/PrivateRoute';
import Error from './Pages/routes/Error';
import RegisterUser from './Pages/admin/users/RegisterUser';
import UserList from './Pages/admin/users/UserList';
import DepartmentList from './Pages/admin/department/DepartmentList';
import Layout from './components/helper/Layout';
import CreateIdea from './Pages/idea/CreateIdea';
import Login from './Pages/Login';
import User from './Pages/admin/users/User';
import CategoryList from './Pages/admin/category/CategoryList';
import IdeaList from './Pages/idea/IdeaList';
import Idea from './Pages/idea/Idea';
import Profile from './Pages/staff/Profile';
import Ideas from './Pages/staff/Ideas';
import About from './Pages/About';
import Contact from './Pages/Contact';
import AcademicYear from './Pages/admin/academic/AcademicYear';
import Dashboard from './Pages/admin/dashboard/Dashobard'
import Unauthorized from './Pages/routes/Unauthorized';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);
  console.log('app js',isAuthenticated, typeof userRole,' ', userRole);
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idea/all" element={<IdeaList />} />
        <Route path="/idea/details" element={<Idea />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={Number(userRole)}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/user-list"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/department-list"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <DepartmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/category-list"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/register-user"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <RegisterUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/academic-year"
          element={
            <PrivateRoute isAuth={isAuthenticated} role={userRole}>
              <AcademicYear />
            </PrivateRoute>
          }
        />
        {/* Protected admin routes */}
        {/* Protected routes */}
        <Route path="/idea/add" element={<CreateIdea />} />]
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/ideas" element={<Ideas />} />
        {/* Protected routes */}
      </Routes>
    </Layout>
  );
}

export default App;
