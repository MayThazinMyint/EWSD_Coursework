import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
  loading: true,
  isAuthenticated: false,
  users: [],
  user: [],
  addUser:[],
  error: '',
};
const api = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };

  return axios
    .get('http://127.0.0.1:8000/api/users', { headers })
    .then((response) => response.data);
});

export const fetchSingleUser = createAsyncThunk("user/fetchSingleUser", (id) => {
  console.log('fetch single user',id);
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };

  return axios
    .get(`http://127.0.0.1:8000/api/user/${id}`, { headers })
    .then((response) => response.data);
});

export const deleteUser = createAsyncThunk('user/deleteUser', (id) => {
  
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
console.log('delete single user', id,token);
  return axios
    .delete(`http://127.0.0.1:8000/api/user/delete/${id}`, { headers })
    .then((response) => response.data);
});
export const addUser = createAsyncThunk('user/addUser', async (data) => {
  console.log('add user', data);
  return axios.post('http://127.0.0.1:8000/api/register', data).then((response) => response.data);
});

export const updateUser = createAsyncThunk('user/updateUser', async (dataObj) => {
  console.log('update user', dataObj.data, dataObj.id);
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post(`http://127.0.0.1:8000/api/user/update/${dataObj.id}`, dataObj.data, { headers })
    .then((response) => response.data);
});

export const login = createAsyncThunk('user/login', async (data) => {
  console.log('login user', data);
  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  return axios
    .post('http://127.0.0.1:8000/api/login', data, { headers })
    .then((response) => response.data);
});

export const logout = createAsyncThunk('user/logout', async () => {
  console.log('login out');

});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.addUser = action.payload;
      state.error = '';
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.addUser = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
    
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
