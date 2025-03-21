import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, adminRequired = false, children }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (adminRequired && user.role !== 'admin') {
    // Not an admin
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;