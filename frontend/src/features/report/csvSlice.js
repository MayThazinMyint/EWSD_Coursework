import { createSlice } from '@reduxjs/toolkit';
export const fetchCsvData = () => async (dispatch) => {
  try {
    dispatch(fetchCsvDataStart());
    const response = await fetch(
      'http://127.0.0.1:8000/api/download/idea?has_comment=1&is_anonymous=1&category_id=1&department_id=1&academic_year=1&show_all=1',
    );
    const csvData = await response.text();
    dispatch(fetchCsvDataSuccess(csvData));
  } catch (error) {
    dispatch(fetchCsvDataFailure(error.message));
  }
};

const csvSlice = createSlice({
  name: 'csv',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
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
});

export const { fetchCsvDataStart, fetchCsvDataSuccess, fetchCsvDataFailure, downloadCsv } =
  csvSlice.actions;

export default csvSlice.reducer;
