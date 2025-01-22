import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Thunks for API actions

// Register a new student
export const registerStudent = createAsyncThunk(
  'students/registerStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/students/register', studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login student
export const loginStudent = createAsyncThunk(
  'students/loginStudent',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/students/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get student details
export const getStudentDetails = createAsyncThunk(
  'students/getStudentDetails',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all students
export const fetchAllStudents = createAsyncThunk(
  'students/fetchAllStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/students/all');
      return response.data.students; // Assuming the response contains a `students` array.
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update student room and bed
export const updateStudentRoom = createAsyncThunk(
  'students/updateStudentRoom',
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/students/update', updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/students/delete/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [], // List of students
    student: null, // Single student details
    token: null, // Token from login
    error: null, // Error messages
    successMessage: null, // Success messages
    loading: false, // Loading state
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.student = action.payload.student;
      })
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearMessages } = studentSlice.actions;
export default studentSlice.reducer;
