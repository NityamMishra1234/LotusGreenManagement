import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchRoomDetails, addRoom, clearMessages } from '../../RTK/Slices/roomSlice';
import { useNavigate } from 'react-router-dom';

const Room = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ownerId = useSelector((state) => state.auth.owner.id);
  const { rooms, roomDetails, loading, error, successMessage } = useSelector((state) => state.rooms);
  
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', totalBeds: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setNewRoom({ roomNumber: '', totalBeds: '' });
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [successMessage, dispatch]);

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);
    dispatch(fetchRoomDetails(roomId));
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (newRoom.roomNumber && newRoom.totalBeds && ownerId) {
      dispatch(addRoom({ ...newRoom, pgOwnerId: ownerId }));
    }
  };

  const handleBackToDashboard = () => {
    navigate('/DashBord');
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center text-white ">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center">Room Management</h1>
          <button
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  items-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <input
                type="text"
                placeholder="Room Number"
                value={newRoom.roomNumber}
                onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Total Beds"
                value={newRoom.totalBeds}
                onChange={(e) => setNewRoom({ ...newRoom, totalBeds: e.target.value })}
                className="w-full p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Add Room
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">All Rooms</h2>
            <input
              type="text"
              placeholder="Search Rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="max-h-96 overflow-y-auto">
              <ul>
                {rooms.filter(room => room.roomNumber.includes(search)).map((room) => (
                  <li
                    key={room._id}
                    className={`cursor-pointer p-4 rounded-lg mb-2 transition-all ${selectedRoomId === room._id ? 'bg-indigo-300' : 'bg-gray-100 hover:bg-indigo-200'}`}
                    onClick={() => handleRoomClick(room._id)}
                  >
                    Room {room.roomNumber} - {room.totalBeds} Beds
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRoomId && roomDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-700 md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Students in Room {roomDetails.roomNumber}</h2>
              {roomDetails.students.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto">
                  {roomDetails.students.map((student, index) => (
                    <li key={student._id} className="p-3 bg-gray-100 rounded-lg mb-2">
                      <p><strong>Bed {index + 1}:</strong> {student.name}</p>
                      <p>Email: {student.email}</p>
                      <p>Phone: {student.phone}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students assigned to this room.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;