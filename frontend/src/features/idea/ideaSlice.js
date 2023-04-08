import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
  loading: true,
  ideas: [],
  idea:[],
  latestIdeas:[],
  popularIdeas:[],
  ideaByDept:[],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchIdeas = createAsyncThunk('ideas/fetchIdeas', () => {
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .get('http://127.0.0.1:8000/api/ideas', { headers })
    .then((response) => response.data);
});

export const fetchLatestIdeas = createAsyncThunk('ideas/fetchLatestIdeas', () => {
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .get('http://127.0.0.1:8000/api/ideas_list/latest', { headers })
    .then((response) => response.data);
});

export const fetchPopularIdeas = createAsyncThunk('ideas/fetchPopularIdeas', () => {
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .get('http://127.0.0.1:8000/api/ideas_list/popular', { headers })
    .then((response) => response.data);
});
 
export const postIdea = createAsyncThunk('ideas/postIdea', async (data) => {
  const token = Cookies.get('token');
  axios({
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
    url: 'http://127.0.0.1:8000/api/ideas/add',
    withCredentials: false,
    data: data,
  }).then(function (response) {
    console.log(response);
  });
});

export const fetchSingleIdea = createAsyncThunk('user/fetchSingleIdea', (id) => {
  console.log('fetch single idea', id);
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };

  return axios
    .get(`http://127.0.0.1:8000/api/ideas/${id}`, { headers })
    .then((response) => response.data);
});

export const fetchIdeasByDepartment = createAsyncThunk('ideas/fetchIdeasByDepartment', (id) => {
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .get(`http://127.0.0.1:8000/api/ideas_list/byDepartment?department_id=${id}`, { headers })
    .then((response) => response.data);
});

// export const fetchIdeasByUserId = createAsyncThunk('ideas/fetchIdeasByDepartment', (id) => {
//   const token = Cookies.get('token'); // get the token from localStorage
//   const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
//   return axios
//     .get('http://127.0.0.1:8000/api/ideas', { headers })
//     .then((response) => response.data);
// });

// export const deleteIdea = createAsyncThunk('department/deleteIdea', (id) => {
//   const token = Cookies.get('token');
//   const headers = { Authorization: `Bearer ${token}` };
//   //console.log('delete idea ', id, token);
//   return axios
//     .delete(`http://127.0.0.1:8000/api/department/delete/${id}`, { headers })
//     .then((response) => response.data);
// });
// export const postDepartment = createAsyncThunk('department/postDepartment', (data) => {
//   console.log('post dept', data);
//   const token = Cookies.get('token'); // get the token from localStorage
//   const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
//   return axios
//     .post('http://127.0.0.1:8000/api/department/add', data, { headers })
//     .then((response) => response.data);
// });

const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIdeas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIdeas.rejected, (state, action) => {
      state.loading = false;
      state.ideas = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchLatestIdeas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLatestIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.latestIdeas = action.payload;
      state.error = '';
    });
    builder.addCase(fetchLatestIdeas.rejected, (state, action) => {
      state.loading = false;
      state.latestIdeas = [];
      state.error = action.error.message;
    });
    builder.addCase(postIdea.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(postIdea.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(postIdea.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    });
    builder.addCase(fetchSingleIdea.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleIdea.fulfilled, (state, action) => {
      state.loading = false;
      state.idea = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSingleIdea.rejected, (state, action) => {
      state.loading = false;
      state.idea = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchIdeasByDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIdeasByDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.ideaByDept = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIdeasByDepartment.rejected, (state, action) => {
      state.loading = false;
      state.ideaByDept = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchPopularIdeas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.popularIdeas = action.payload;
      state.error = '';
    });
    builder.addCase(fetchPopularIdeas.rejected, (state, action) => {
      state.loading = false;
      state.popularIdeas = [];
      state.error = action.error.message;
    });
    // builder.addCase(deleteDepartment.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default ideaSlice.reducer;
