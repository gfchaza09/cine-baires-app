import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRouter = ({ children }) => {
    const token = sessionStorage.getItem("token");

    return token ? <Navigate to="/" replace={true} /> : <>{children}</>;
};

export default PublicRouter;