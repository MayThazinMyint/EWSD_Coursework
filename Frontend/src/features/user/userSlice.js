import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  loading: true,
  users: [],
  error: "",
};
const api = () => {
  const token = localStorage.getItem("authToken");
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("http://127.0.0.1:8000/api/users")
    .then((response) => response.data);
});

export const fetchSingleUser = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("http://127.0.0.1:8000/api/users")
    .then((response) => response.data);
});
export const addUser = createAsyncThunk("user/addUser", async (data) => {
  console.log("add user", data);
  const token = Cookies.get("token"); // get the token from localStorage
  const headers = { Authorization: `Bearer ${token}` }; // set the Authorization header with the token
  return axios
    .post("http://127.0.0.1:8000/api/register", data, { headers })
    .then((response) => response.data);
});

export const login = createAsyncThunk("user/login", async (data) => {
  console.log("login user", data);
  return axios
    .post("http://127.0.0.1:8000/api/login", data)
    .then((response) => response.data);
});
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
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
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
