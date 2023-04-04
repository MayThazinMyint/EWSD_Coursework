import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchCsvData = () => async (dispatch, downloadUrl) => {
  try {
    dispatch(fetchCsvDataStart());
    const response = await fetch('http://127.0.0.1:8000/api/exportCSV/3');
    const csvData = await response.text();
    dispatch(fetchCsvDataSuccess(csvData));
  } catch (error) {
    dispatch(fetchCsvDataFailure(error.message));
  }
};

export const downloadZipFile = createAsyncThunk('zipFile/download', async (url, thunkAPI) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const urlObject = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = urlObject;
  link.download = 'file.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

const csvSlice = createSlice({
  name: 'csv',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    status: 'idle',
  },
  reducers: {
    fetchCsvDataStart(state) {
      state.isLoading = true;
    },
    fetchCsvDataSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchCsvDataFailure(state, action) {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload;
    },
    downloadCsv(state) {
      const csvUrl = window.URL.createObjectURL(new Blob([state.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = csvUrl;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadZipFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(downloadZipFile.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(downloadZipFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { fetchCsvDataStart, fetchCsvDataSuccess, fetchCsvDataFailure, downloadCsv } =
  csvSlice.actions;

export default csvSlice.reducer;
