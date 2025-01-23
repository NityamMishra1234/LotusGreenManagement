import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { owner } = useSelector((state) => state.auth);

  // If not authenticated, redirect to the login page
  if (!owner) {
    return <Navigate to="/Teacher_login" replace />;
  }

  return children;
};

export default ProtectedRoute;
