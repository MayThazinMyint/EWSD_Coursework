import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  loading: true,
  votes: [],
  error: '',
};

// Generates pending, fulfilled and rejected action types
export const fetchVotes = createAsyncThunk('voting/fetchVotes', (data) => {
  console.log('get vote', data);
  const token = Cookies.get('token');
  return axios({
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    url: 'http://127.0.0.1:8000/api/total_voting',
    //withCredentials: false,
    data: data,
  })
    .then((response) => response.data);
});

export const postVote = createAsyncThunk('voting/postVote', (data) => {
  console.log('post vote', data);
  const token = Cookies.get('token'); // get the token from localStorage
    return axios({
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      url: 'http://127.0.0.1:8000/api/voting',
      withCredentials: false,
      data: data,
    }).then((response) => response.data);
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

const votingSlice = createSlice({
  name: 'voting',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVotes.fulfilled, (state, action) => {
      state.loading = false;
      state.votes = action.payload;
      state.error = '';
    });
    builder.addCase(fetchVotes.rejected, (state, action) => {
      state.loading = false;
      state.votes = [];
      state.error = action.error.message;
    });
    builder.addCase(postVote.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(postVote.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(postVote.rejected, (state, action) => {
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

export default votingSlice.reducer;
