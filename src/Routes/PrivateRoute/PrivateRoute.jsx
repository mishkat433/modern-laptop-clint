import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Componemts/Spinner';
import { AuthContex } from '../../Contex/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { loginUser, loading, } = useContext(AuthContex);

    const location = useLocation()
    if (loading) {
        return <Spinner />
    }
    if (loginUser?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default PrivateRoute;

