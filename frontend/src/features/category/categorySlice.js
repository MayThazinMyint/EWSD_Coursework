import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  loading: true,
  department: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  () => {
    return axios
      .get("http://127.0.0.1:8000/api/departments")
      .then((response) => response.data);
  }
);

export const postDepartment = createAsyncThunk(
  "department/postDepartment",
  (data) => {
    console.log("post dept", data);
    const token = Cookies.get("token"); // get the token from localStorage
    const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
    return axios
      .post("http://127.0.0.1:8000/api/department/add", data, { headers })
      .then((response) => response.data);
  }
);

// export const postDepartment = createAsyncThunk(
//   "department/postDepartment",
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/department/add",
//         data
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

const categorySlice = createSlice({
  name: "department",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = action.payload;
      state.error = "";
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.departments = [];
      state.error = action.error.message;
    });
    builder.addCase(postDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(postDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(postDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export default categorySlice.reducer;
