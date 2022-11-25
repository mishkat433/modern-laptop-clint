import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { AuthContex } from '../../Contex/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { loginUser, loading } = useContext(AuthContex);
    const [isAdmin, adminLoading] = useAdmin(loginUser?.email)

    const location = useLocation()
    if (loading || adminLoading) {
        return <Spinner />
    }
    if (loginUser?.uid && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;