import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStudent } from '../../RTK/Slices/studentSlice';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Local state to hold the login form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Access state from Redux (for error and loading)
  const { loading, error, token, successMessage } = useSelector((state) => state.students);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginStudent(credentials));
  };

  // Redirect if student is logged in (has a token)
  if (token) {
    navigate('/Studentdashboard'); // You can change this to your student's dashboard page
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Student Login</h2>
        
        {successMessage && (
          <div className="text-green-500 mb-4">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
