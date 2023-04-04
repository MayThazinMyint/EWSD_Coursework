import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
 
const initialState = {
  loading: true,
  report: [],
  ideaReport:[],
  summaryList: [],
  anonymousComment: [],
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
    show_all: 1,
  };
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .post('http://127.0.0.1:8000/api/report/idea',data, { headers })
    .then((response) => response.data);
});

export const fetchSummaryList = createAsyncThunk('department/fetchSummaryList', () => {
  const token = Cookies.get('token'); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .get('http://127.0.0.1:8000/api/summaryList', { headers })
    .then((response) => response.data);
});
//api/report/comment_anonymous
export const fetchAnonymousComment = createAsyncThunk('dashboard/fetchAnonymousComment', (data) => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post('http://127.0.0.1:8000/api/report/comment_anonymous', data, { headers })
    .then((response) => response.data);
});

export const fetchIdeaReport = createAsyncThunk('dashboard/fetchIdeaReport', (data) => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post('http://127.0.0.1:8000/api/report/idea', data, { headers })
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
    builder.addCase(fetchIdeaReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIdeaReport.fulfilled, (state, action) => {
      state.loading = false;
      state.ideaReport = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIdeaReport.rejected, (state, action) => {
      state.loading = false;
      state.ideaReport = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchSummaryList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSummaryList.fulfilled, (state, action) => {
      state.loading = false;
      state.summaryList = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSummaryList.rejected, (state, action) => {
      state.loading = false;
      state.summaryList = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchAnonymousComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAnonymousComment.fulfilled, (state, action) => {
      state.loading = false;
      state.anonymousComment = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAnonymousComment.rejected, (state, action) => {
      state.loading = false;
      state.anonymousComment = [];
      state.error = action.error.message;
    });
  },
});

export default repportSlice.reducer;
