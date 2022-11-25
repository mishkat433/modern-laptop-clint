import React from 'react';
import dashboardImage from "../../../assets/dashboard.gif";

const Dashboard = () => {
    return (
        <div className=' my-10'>
            <h1 className='text-center text-5xl mb-5'> Welcome to Dashboard</h1>
            <img className='w-3/5 h-[400px] mx-auto' src={dashboardImage} alt="dashboard" />
        </div>
    );
};

export default Dashboard;