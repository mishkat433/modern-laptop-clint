import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Componemts/Spinner';
import { AuthContex } from '../../Contex/AuthProvider';
import useCheckUser from '../../hooks/useCheckUser';

const AdminRoute = ({ children }) => {
    const { loginUser, loading, logout } = useContext(AuthContex);
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email, logout)

    const location = useLocation()
    if (loading || userCheckLoading) {
        return <Spinner />
    }
    if (loginUser?.uid && checkUser === "admin") {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;