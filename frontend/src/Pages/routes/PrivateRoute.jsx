import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ isAuth, role, children }) => {
  console.log('isAuth private route', isAuth, 'role', typeof role, ' ', role);
  if (!isAuth) {
    return <Navigate to="/unauthorized" replace />;
  } else if (role === 4 || role === '4') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
