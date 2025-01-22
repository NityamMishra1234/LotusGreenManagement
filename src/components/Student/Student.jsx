import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRooms,
  fetchRoomDetails,
} from '../../RTK/Slices/roomSlice';
import {
  registerStudent,
  deleteStudent,
  updateStudentRoom,
} from '../../RTK/Slices/studentSlice';

const Student = () => {
  const dispatch = useDispatch();

  // Redux state
  const { rooms, roomDetails, loading: roomLoading } = useSelector((state) => state.rooms);
  const { successMessage, error, loading: studentLoading } = useSelector((state) => state.students);

  // Component state
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    bedNumber: '',
    totalAmount: '',
    paymentType: '',
    amountPaid: '',
    profileImage: null,
  });

  useEffect(() => {
    // Fetch all rooms on component load
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);
    dispatch(fetchRoomDetails(roomId));
    setShowAddStudentForm(false); // Reset form visibility
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newStudent).forEach((key) => {
      formData.append(key, newStudent[key]);
    });
    formData.append('roomId', selectedRoomId);
    dispatch(registerStudent(formData));
    setShowAddStudentForm(false); // Hide the form after submission
  };

  const handleDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId));
  };

  const handleUpdateStudentRoom = (studentId) => {
    const newRoomId = prompt('Enter new Room ID:');
    const newBedNumber = prompt('Enter new Bed Number:');
    if (newRoomId && newBedNumber) {
      dispatch(updateStudentRoom({ studentId, newRoomId, newBedNumber }));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600 min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Student Management</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room List */}
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
            {roomLoading ? (
              <p>Loading rooms...</p>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    onClick={() => handleRoomClick(room._id)}
                    className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${
                      selectedRoomId === room._id ? 'bg-green-300' : 'bg-gray-100 hover:bg-green-200'
                    }`}
                  >
                    Room {room.roomNumber} - {room.totalBeds} Beds
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Room Details */}
          {selectedRoomId && roomDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-700 col-span-2">
              <h2 className="text-2xl font-semibold mb-4">
                Room {roomDetails.roomNumber} Details
              </h2>
              <div className="mb-4">
                <p>
                  Total Beds: {roomDetails.totalBeds} | Assigned Students: {roomDetails.students.length}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Students in Room</h3>
                <ul className="max-h-80 overflow-y-auto space-y-4">
                  {roomDetails.students.map((student) => (
                    <li
                      key={student._id}
                      className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="text-lg font-semibold">{student.name}</p>
                        <p className="text-sm">Email: {student.email}</p>
                        <p className="text-sm">Phone: {student.phone}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleUpdateStudentRoom(student._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {roomDetails.students.length < roomDetails.totalBeds && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                    className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
                  >
                    {showAddStudentForm ? 'Cancel' : 'Add Student'}
                  </button>
                </div>
              )}
              {showAddStudentForm && (
  <form onSubmit={handleAddStudent} className="mt-4 space-y-4">
    <h3 className="text-xl font-bold mb-2">Add Student</h3>
    <input
      type="text"
      placeholder="Student Name"
      value={newStudent.name}
      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={newStudent.email}
      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="text"
      placeholder="Phone Number"
      value={newStudent.phone}
      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={newStudent.password}
      onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="text"
      placeholder="Father's Name"
      value={newStudent.fatherName}
      onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="text"
      placeholder="Father's Phone Number"
      value={newStudent.fatherPhone}
      onChange={(e) => setNewStudent({ ...newStudent, fatherPhone: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="text"
      placeholder="Father's Occupation"
      value={newStudent.fatherOccupation}
      onChange={(e) => setNewStudent({ ...newStudent, fatherOccupation: e.target.value })}
      className="w-full p-3 border rounded-lg"
    />
    <input
      type="number"
      placeholder="Bed Number"
      value={newStudent.bedNumber}
      onChange={(e) => setNewStudent({ ...newStudent, bedNumber: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="number"
      placeholder="Total Amount"
      value={newStudent.totalAmount}
      onChange={(e) => setNewStudent({ ...newStudent, totalAmount: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <select
  value={newStudent.paymentType}
  onChange={(e) => setNewStudent({ ...newStudent, paymentType: e.target.value })}
  className="w-full p-3 border rounded-lg"
  required
>
  <option value="">Select Payment Type</option>
  <option value="Cash">Cash</option>
  <option value="UPI">UPI</option>
</select>

    <input
      type="number"
      placeholder="Amount Paid"
      value={newStudent.amountPaid}
      onChange={(e) => setNewStudent({ ...newStudent, amountPaid: e.target.value })}
      className="w-full p-3 border rounded-lg"
      required
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setNewStudent({ ...newStudent, profileImage: e.target.files[0] })}
      className="w-full p-3 border rounded-lg"
    />
    <button
      type="submit"
      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
    >
      {studentLoading ? 'Adding...' : 'Submit'}
    </button>
  </form>
)}

            </div>
          )}
        </div>

        {/* Error and Success Messages */}
        <div className="text-center mt-8">
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Student;
