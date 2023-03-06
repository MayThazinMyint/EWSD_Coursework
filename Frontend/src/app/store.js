import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import departmentReducer from "../features/department/departmentSlice";
import categoryReducer from "../features/category/categorySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
    category:categoryReducer,
   
  },
});

export default store;
