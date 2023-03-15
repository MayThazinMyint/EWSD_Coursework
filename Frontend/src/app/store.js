import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import departmentReducer from "../features/department/departmentSlice";
import categoryReducer from "../features/category/categorySlice";
import authReducer from '../features/auth/authSlice';
import academicReducer from '../features/academic/academicSlice';
import Cookies from "js-cookie";

const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
const userRole = Cookies.get('userRole');
const userId = localStorage.getItem('userId');
console.log('store isAuthenticated',isAuthenticated, 'userRole',userRole);
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    category: categoryReducer,
    academic: academicReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated,
      userId,
      userRole,
    },
  },
});

export default store;
