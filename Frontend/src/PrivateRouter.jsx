import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useStateContext } from './context/ContexProvider';

const PrivateRouter = ({ element, ...rest }) => {
  const { userToken } = useStateContext();

  return (
    <Route
      {...rest}
      element={userToken ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRouter;
