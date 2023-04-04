import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
  loading: true,
  categoriesByDept: [],
  ideasByDept:[],
  ideaByDept:[],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchCategoriesByDept = createAsyncThunk('dashboard/fetchCategoriesByDept', () => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get('http://127.0.0.1:8000/api/dashboard/categoryByDepartment', { headers })
    .then((response) => response.data);
});

export const fetchIdeaByDept = createAsyncThunk('dashboard/fetchIdeaByDept', () => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .get('http://127.0.0.1:8000/api/dashboard/ideas_by_dept', { headers })
    .then((response) => response.data);
});

const dashboardSlice = createSlice({
  name: 'dashbaord',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesByDept.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesByDept.fulfilled, (state, action) => {
      state.loading = false;
      state.categoriesByDept = action.payload;
      state.error = '';
    });
    builder.addCase(fetchCategoriesByDept.rejected, (state, action) => {
      state.loading = false;
      state.categoriesByDept = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchIdeaByDept.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIdeaByDept.fulfilled, (state, action) => {
      state.loading = false;
      state.ideaByDept = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIdeaByDept.rejected, (state, action) => {
      state.loading = false;
      state.ideaByDept = [];
      state.error = action.error.message;
    });
  },
});

export default dashboardSlice.reducer;
