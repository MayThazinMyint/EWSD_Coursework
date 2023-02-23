import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import departmentReducer from "../features/department/departmentSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
  },
});

export default store;
