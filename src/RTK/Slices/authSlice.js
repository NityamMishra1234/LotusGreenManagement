import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'https://lotugreenmanagementbackend.onrender.com/api/users';


// Async thunk for registering owner
export const registerOwner = createAsyncThunk('auth/register', async (ownerData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/register`, ownerData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Async thunk for logging in owner
export const loginOwner = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        localStorage.setItem('ownerToken', response.data.token); // Store token
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Async thunk for fetching owner details
export const fetchOwnerDetails = createAsyncThunk('auth/fetchOwner', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('ownerToken');
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        owner: null,
        token: localStorage.getItem('ownerToken') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutOwner: (state) => {
            localStorage.removeItem('ownerToken');
            state.owner = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerOwner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerOwner.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(loginOwner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.owner = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginOwner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchOwnerDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOwnerDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.owner = action.payload;
            })
            .addCase(fetchOwnerDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
            
            
    },
});

export const { logoutOwner } = authSlice.actions;
export default authSlice.reducer;
