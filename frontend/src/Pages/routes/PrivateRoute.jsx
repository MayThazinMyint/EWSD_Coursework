import React from 'react';
import { Navigate } from 'react-router-dom';

// function PrivateRoute({ isAuth,role, ...props }) {
//   console.log('isAuth',isAuth,'role',role);
//   return isAuth && (role === 1) ? <Route {...props} /> : <Navigate to="/error" />;
// }

// export default PrivateRoute;

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
