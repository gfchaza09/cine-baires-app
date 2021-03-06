import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const token = sessionStorage.getItem("token");

    return !token ? <Navigate to="/login" replace={true} /> : <>{children}</>;
};

export default PrivateRouter;