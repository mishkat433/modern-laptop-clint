import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import Sidebar from '../Shared/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <div >
            <Navbar />
            <div className='flex flex-col lg:flex-row  w-11/12 mx-auto '>
                <div className='w-full lg:w-1/5'>
                    <Sidebar />
                </div>
                <div className='w-full lg:w-4/5 bg-gray-50 rounded-lg my-6'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;