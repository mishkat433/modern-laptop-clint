import React, { useContext } from 'react';
import dashboardImage from "../../../assets/dashboard.gif";
import Spinner from '../../../Componemts/Spinner';
import { AuthContex } from '../../../Contex/AuthProvider';
import useCheckUser from '../../../hooks/useCheckUser';

const Dashboard = () => {
    const { loginUser } = useContext(AuthContex)
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email,)

    if (userCheckLoading) {
        return <Spinner />
    }
    return (
        <div className=' my-10'>
            <h1 className='text-center text-5xl mb-5'> Welcome to <span className='font-semibold uppercase'>{checkUser}</span> Dashboard</h1>
            <img className='w-3/5 h-[400px] mx-auto' src={dashboardImage} alt="dashboard" />
        </div>
    );
};

export default Dashboard;