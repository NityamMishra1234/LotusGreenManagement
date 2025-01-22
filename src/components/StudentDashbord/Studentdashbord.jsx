import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetails } from '../../RTK/Slices/studentSlice';
import { getPaymentsForStudent } from '../../RTK/Slices/paymentSlice';
import { getRequestsByStudent, addRequest } from '../../RTK/Slices/requestSlice';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { student, token, loading, error } = useSelector((state) => state.students);
  const { paymentsByStudent, loading: paymentLoading, error: paymentError } = useSelector(
    (state) => state.payment
  );
  const { requests, loading: requestLoading, error: requestError } = useSelector(
    (state) => state.requests
  );

  const [requestText, setRequestText] = useState('');

  // Fetch data when the component mounts
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getStudentDetails(student._id));
      dispatch(getPaymentsForStudent(student._id));
      dispatch(getRequestsByStudent(student._id));
    }
  }, [dispatch, student, token, navigate]);

  // Handle creating a new request
  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (requestText.trim()) {
      const newRequest = { studentId: student._id, requestText };
      dispatch(addRequest(newRequest));
      setRequestText(''); // Clear the input after request is created
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Student Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row items-center space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            {student?.profileImage ? (
              <img
                src={student.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white text-xl">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : student ? (
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.email}</p>
                <p className="text-gray-600">Phone: {student.phone}</p>
                <p className="text-gray-600">Father: {student.fatherName}</p>
                <p className="text-gray-600">Father's Phone: {student.fatherPhone}</p>
                <p className="text-gray-600">Father's Occupation: {student.fatherOccupation || 'N/A'}</p>
                <p className="text-gray-600">Room: {student.roomId} | Bed: {student.bedNumber}</p>
              </div>
            ) : (
              <p className="text-red-500">Failed to load student details.</p>
            )}
          </div>
        </section>

        {/* Payments Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Details</h2>
          {paymentLoading ? (
            <div className="text-center text-gray-500">Loading payments...</div>
          ) : paymentsByStudent[student._id]?.length > 0 ? (
            <div>
              <table className="w-full table-auto text-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsByStudent[student._id].map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{payment.amount}</td>
                      <td className="px-4 py-2">{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No payment records found.</p>
          )}
        </section>

        {/* Request Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create a Request</h2>
          <form onSubmit={handleCreateRequest}>
            <div className="mb-4">
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your request here"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              disabled={requestLoading}
            >
              {requestLoading ? 'Submitting Request...' : 'Submit Request'}
            </button>
          </form>

          {requestError && <p className="text-red-500 mt-4">{requestError}</p>}

          <h3 className="text-2xl font-semibold text-gray-700 mt-8">Your Requests</h3>
          {requests.length > 0 ? (
            <ul className="mt-4">
              {requests.map((request) => (
                <li key={request._id} className="bg-gray-50 p-4 mb-4 border rounded-md">
                  <p>{request.requestText}</p>
                  <p className="text-sm text-gray-500">Status: {request.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have no requests yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
