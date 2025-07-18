import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;