import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import ProtectedRoutes from './Pages/routes/ProtectedRoutes';
import Navbar from './components/common/Navbar';
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
import Sidebar from './components/sidebar/Sidebar';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* admin routes */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/admin/user-list" element={<UserList />} />
        <Route path="/admin/department-list" element={<DepartmentList />} />
        <Route path="/admin/category-list" element={<CategoryList />} />
        <Route path="/admin/register-user" element={<RegisterUser />} />
        <Route path="/admin/user/:id" element={<User />} />
        {/* admin routes */}
        
        <Route path="/idea/create-idea" element={<CreateIdea />} />
        <Route path="/idea/all" element={<IdeaList />} />
        <Route path="/idea/details" element={<Idea />} />

        <Route path="/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/ideas" element={<Ideas />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
