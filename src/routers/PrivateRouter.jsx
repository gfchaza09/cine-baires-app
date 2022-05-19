import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRouter = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();

    return token ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRouter