import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";


const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    enqueueSnackbar("You must be logged in!", {
      variant: "error",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    enqueueSnackbar("Access denied!", {
      variant: "error",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
