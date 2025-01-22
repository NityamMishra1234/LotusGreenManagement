// Report Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance'; // Centralized Axios instance

// Async thunk for fetching revenue report
export const fetchRevenueReport = createAsyncThunk('reports/fetchRevenue', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/reports/revenue');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
});

// Async thunk for fetching financial report
export const fetchFinancialReport = createAsyncThunk('reports/fetchFinancial', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/reports/financial');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
});

// Async thunk for fetching occupancy report
export const fetchOccupancyReport = createAsyncThunk('reports/fetchOccupancy', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/reports/occupancy');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
});

// Async thunk for fetching requests report
export const fetchRequestsReport = createAsyncThunk('reports/fetchRequests', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/reports/requests');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
});

const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        revenue: null,
        financial: null,
        occupancy: null,
        requests: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Revenue Report
            .addCase(fetchRevenueReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRevenueReport.fulfilled, (state, action) => {
                state.loading = false;
                state.revenue = action.payload;
            })
            .addCase(fetchRevenueReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Financial Report
            .addCase(fetchFinancialReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFinancialReport.fulfilled, (state, action) => {
                state.loading = false;
                state.financial = action.payload;
            })
            .addCase(fetchFinancialReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Occupancy Report
            .addCase(fetchOccupancyReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOccupancyReport.fulfilled, (state, action) => {
                state.loading = false;
                state.occupancy = action.payload;
            })
            .addCase(fetchOccupancyReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Requests Report
            .addCase(fetchRequestsReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRequestsReport.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase(fetchRequestsReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    },
});

export default reportSlice.reducer;
