import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../Componemts/Spinner';
import { AuthContex } from '../../Contex/AuthProvider';
import useCheckUser from '../../hooks/useCheckUser';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import Sidebar from '../Shared/Sidebar/Sidebar';


const SeallerLayout = () => {
    const { loginUser, logout } = useContext(AuthContex)
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email, logout)
    return (
        <div >
            <Navbar />
            <div className='flex flex-col lg:flex-row  w-11/12 mx-auto '>
                <div className='w-full lg:w-1/5 lg:h-screen lg:sticky lg:top-20 '>
                    <p>Your User type is : <span className='font-semibold uppercase text-orange-500'>{checkUser}</span></p>
                    <Sidebar />
                </div>
                <div className='w-full lg:w-4/5 bg-gray-50 rounded-lg my-6'>
                    {
                        userCheckLoading ? <Spinner /> : <Outlet />
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SeallerLayout;