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

export const postAcademicYear = createAsyncThunk('department/postAcademicYear', async (data) => {
  console.log('post academic year', data);
  const token = Cookies.get('token'); 
  axios({
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    url: 'http://127.0.0.1:8000/api/academic_year/add',
    withCredentials: false,
    data: data,
  }).then(function (response) {
    console.log(response);
  });
});

export const deleteAcademicYear = createAsyncThunk('department/deleteAcademicYear', async (id) => {
  console.log('delete academic year', id);
  const token = Cookies.get('token'); // get the token from cookies
  axios({
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    url: `http://127.0.0.1:8000/api/academic_year/${id}`,
    withCredentials: false,
  }).then(function (response) {
    console.log(response);
  });
});

// export const postAcademicYear = createAsyncThunk(
//   'department/postAcademicYear',
//   async (data, thunkAPI) => {
//     try {
//       const token = Cookies.get('token'); // get the token from cookies
//       //headers: {"Access-Control-Allow-Origin": "*"}
//       const config = {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           Authorization: 'Bearer ' + token,
//           'Content-Type': 'application/json',
//         },
//       };
//       const headers = { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }; // set the Authorization header with the token
//       const response = await axios.post('http://127.0.0.1:8000/academic_year/add', data,
//         config,
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
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
    builder.addCase(postAcademicYear.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(postAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(postAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
    builder.addCase(deleteAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default academicSlice.reducer;
