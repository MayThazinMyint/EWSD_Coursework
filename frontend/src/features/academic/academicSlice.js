import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
  loading: true,
  academicYear: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchAcademicYear = createAsyncThunk('category/fetchAcademicYear', () => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  console.log('token', token);
  return axios
    .get('http://127.0.0.1:8000/api/academic_years', { headers })
    .then((response) => response.data);
});

// export const deleteCategory = createAsyncThunk('user/deleteCategory', (id) => {
//   const token = Cookies.get('token');
//   const headers = { Authorization: `Bearer ${token}` };
//   console.log('delete category ', id, token);
//   return axios
//     .delete(`http://127.0.0.1:8000/api/category_delete/${id}`, { headers })
//     .then((response) => response.data);
// });

// export const postCategory = createAsyncThunk('department/postCategory', (data) => {
//   console.log('post category', data);
//   const token = Cookies.get('token'); // get the token from localStorage
//   const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
//   return axios
//     .post('http://127.0.0.1:8000/api/category_add', data, { headers })
//     .then((response) => response.data);
// });

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

const academicSlice = createSlice({
  name: 'academic',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAcademicYear.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.academicYear = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.academicYear = [];
      state.error = action.error.message;
    });
    // builder.addCase(postCategory.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.data = null;
    // });
    // builder.addCase(postCategory.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.data = action.payload;
    // });
    // builder.addCase(postCategory.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.data = null;
    // });
    // builder.addCase(deleteCategory.fulfilled, (state, action) => {
    //   state.loading = false;
    // });
    // builder.addCase(deleteCategory.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default academicSlice.reducer;
