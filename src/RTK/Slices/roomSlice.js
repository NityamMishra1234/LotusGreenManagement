import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Async thunk to add a room
export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/pg/room', roomData, {
        headers: {
          'Content-Type': 'application/json', // Ensure JSON format
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  

// Async thunk to fetch all rooms
export const fetchAllRooms = createAsyncThunk('rooms/fetchAllRooms', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/pg/rooms');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch room details by ID
export const fetchRoomDetails = createAsyncThunk('rooms/fetchRoomDetails', async (roomId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/pg/room/${roomId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    roomDetails: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearRoomDetails: (state) => {
      state.roomDetails = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload.room);
        state.successMessage = 'Room added successfully';
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRoomDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetails = action.payload;
      })
      .addCase(fetchRoomDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRoomDetails, clearMessages } = roomsSlice.actions;
export default roomsSlice.reducer;
