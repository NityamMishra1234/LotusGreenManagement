import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the requests API
const API_URL = 'http://localhost:8000/api/requests';

// Action to add a new request
export const addRequest = createAsyncThunk(
  'requests/addRequest',
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, requestData);
      return response.data.request;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Action to get requests for a student by student ID
export const getRequestsByStudent = createAsyncThunk(
  'requests/getRequestsByStudent',
  async (studentId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${studentId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Action to get all requests for a PG owner
export const getRequestsByOwner = createAsyncThunk(
  'requests/getRequestsByOwner',
  async (pgOwnerId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/owner/${pgOwnerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Action to update the status of a request
export const updateRequestStatus = createAsyncThunk(
  'requests/updateRequestStatus',
  async ({ requestId, status }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${requestId}`, { status });
      return response.data.request;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state for the requests
const initialState = {
  requests: [],
  loading: false,
  error: null,
};

// Create the requestSlice
const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload); // Add the new request to the state
        state.error = null;
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRequestsByStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequestsByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(getRequestsByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRequestsByOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequestsByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(getRequestsByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update the request status in the state
        const index = state.requests.findIndex(
          (request) => request._id === action.payload._id
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export default requestSlice.reducer;
