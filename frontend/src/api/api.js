/// api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const token = Cookies.get('token');
export async function fetchData(endpoint) {
  //const response = await fetch(`${BASE_URL}/${endpoint}`);
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch data from ${endpoint}`);
  // }
   const response = axios({
     method: 'get',
     headers: {
       'Access-Control-Allow-Origin': '*',
       Authorization: 'Bearer ' + token,
       'Content-Type': 'application/json',
     },
     url: `${BASE_URL}/${endpoint}`,
     withCredentials: false,
   })
  return response;
}

export async function createData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to create data at ${endpoint}`);
  }
  return response.json();
}

export async function updateData(endpoint, id, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update data at ${endpoint}/${id}`);
  }
  return response.json();
}

export async function deleteData(endpoint, id) {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete data at ${endpoint}/${id}`);
  }
  return id;
}

// slice.js

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createData, deleteData, fetchData, updateData } from './api';

// export const createAsync = (sliceName, endpoint) =>
//   createAsyncThunk(`${sliceName}/createAsync`, async (data) => {
//     const createdData = await createData(endpoint, data);
//     return createdData;
//   });

// export const fetchAsync = (sliceName, endpoint) =>
//   createAsyncThunk(`${sliceName}/fetchAsync`, async () => {
//     const data = await fetchData(endpoint);
//     return data;
//   });

// export const updateAsync = (sliceName, endpoint) =>
//   createAsyncThunk(`${sliceName}/updateAsync`, async ({ id, data }) => {
//     const updatedData = await updateData(endpoint, id, data);
//     return updatedData;
//   });

// export const deleteAsync = (sliceName, endpoint) =>
//   createAsyncThunk(`${sliceName}/deleteAsync`, async (id) => {
//     await deleteData(endpoint, id);
//     return id;
//   });

// export const createSliceWithCrud = ({
//   sliceName,
//   initialState,
//   reducers = {},
//   extraReducers = {},
//   endpoint,
// }) => {
//   const slice = createSlice({
//     name: sliceName,
//     initialState,
//     reducers,
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchAsync(sliceName, endpoint).pending, (state) => {
//           state.isLoading = true;
//         })
//         .addCase(fetchAsync(sliceName, endpoint).fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.data = action.payload;
//         })
//         .addCase(fetchAsync(sliceName, endpoint).rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.error.message;
//         })
//         .addCase(createAsync(sliceName, endpoint).fulfilled, (state, action) => {
//           state.data.push(action.payload);
//         })
//       }
//     })
//   }
