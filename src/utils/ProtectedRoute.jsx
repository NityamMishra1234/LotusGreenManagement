import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { owner } = useSelector((state) => state.auth); // Make sure to access the state correctly

  // If not authenticated, redirect to the login page
  if (!owner) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
