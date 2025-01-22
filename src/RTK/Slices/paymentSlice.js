import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Updated to your server's base URL

// Thunks

// Fetch all payments for a student
export const getPaymentsForStudent = createAsyncThunk(
  'payment/getPaymentsForStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/breakdown/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment breakdown');
    }
  }
);

// Add a new payment for a student
export const addPayment = createAsyncThunk(
  'payment/addPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/Students`, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add payment');
    }
  }
);

// Fetch all payments (with optional filters like month)
export const getAllPayments = createAsyncThunk(
  'payment/getAllPayments',
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_BASE_URL}/payments?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all payments');
    }
  }
);

// Generate a payment bill
export const generatePaymentBill = createAsyncThunk(
  'payment/generatePaymentBill',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/bill/${paymentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate payment bill');
    }
  }
);

// Initial state
const initialState = {
  paymentsByStudent: {},
  allPayments: [],
  billDetails: null,
  isLoading: false,
  error: null,
};

// Payment slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    clearBillDetails: (state) => {
      state.billDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch payments for a student
      .addCase(getPaymentsForStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentsForStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentsByStudent[action.meta.arg] = action.payload;
      })
      .addCase(getPaymentsForStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add payment
      .addCase(addPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { studentId } = action.payload.payment;
        if (state.paymentsByStudent[studentId]) {
          state.paymentsByStudent[studentId].push(action.payload.payment);
        }
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch all payments
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPayments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Generate a payment bill
      .addCase(generatePaymentBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generatePaymentBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.billDetails = action.payload;
      })
      .addCase(generatePaymentBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearBillDetails } = paymentSlice.actions;

export default paymentSlice.reducer;
