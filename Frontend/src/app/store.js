import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import departmentReducer from "../features/department/departmentSlice";
import categoryReducer from "../features/category/categorySlice";
import authReducer from '../features/auth/authSlice';
import academicReducer from '../features/academic/academicSlice';
import ideaReducer from '../features/idea/ideaSlice';
import reportReducer from '../features/report/reportSlice'
import csvReducer from '../features/report/csvSlice';
import commentReducer from '../features/idea/commentSlice'
import Cookies from "js-cookie";

const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
const userRole = Cookies.get('userRole');
const userId = Cookies.get('userId');
console.log('store isAuthenticated',isAuthenticated, 'userRole',userRole, 'userId',userId);
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    category: categoryReducer,
    academic: academicReducer,
    ideas: ideaReducer,
    report: reportReducer,
    csv: csvReducer,
    comment: commentReducer,
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
