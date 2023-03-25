import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  loading: true,
  comments: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchComments = createAsyncThunk('comment/fetchComments', (id) => {
  const token = Cookies.get('token'); 
  const headers = { Authorization: `Bearer ${token}` }; 
  return axios
    .get(`http://127.0.0.1:8000/api/comment/${id}`, { headers })
    .then((response) => response.data);
});

export const postComment = createAsyncThunk('comment/postComment', (data) => {
  console.log('post comment', data);
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .post('http://127.0.0.1:8000/api/comment/add', data, { headers })
    .then((response) => response.data);
});

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

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = '';
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.comments = [];
      state.error = action.error.message;
    });
    builder.addCase(postComment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
    // builder.addCase(deleteDepartment.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default commentSlice.reducer;
