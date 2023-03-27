import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  loading: true,
  report: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchReport = createAsyncThunk('department/fetchReport', () => {
  const data = {
    has_comment: 0,
    is_anonymous: 0,
    category_id: 1,
    department_id: 1,
    academic_year: 1,
    show_all: 0,
  };
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .post('http://127.0.0.1:8000/api/report/idea',data, { headers })
    .then((response) => response.data);
});

const repportSlice = createSlice({
  name: 'report',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
      state.error = '';
    });
    builder.addCase(fetchReport.rejected, (state, action) => {
      state.loading = false;
      state.report = [];
      state.error = action.error.message;
    });
  },
});

export default repportSlice.reducer;
