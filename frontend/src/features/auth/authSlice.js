import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';

const initialState = {
  loading: true,
  isAuthenticated: false,
  userRole:null,
  error: '',
};
const api = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const login = createAsyncThunk('auth/login', async (data) => {
  console.log('login user', data);
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post('http://127.0.0.1:8000/api/login', data, { headers })
    .then((response) => response.data);
});

export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('log out');
  
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userRole = action.payload.data.user.user_role_id;
      state.error = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userRole = null;
      state.error = '';
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
