import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FcPlus, FcBusinessman, FcFilingCabinet, FcServices, FcTodoList, FcAcceptDatabase } from "react-icons/fc";
import { FaAngleRight } from 'react-icons/fa';
import { AuthContex } from '../../../Contex/AuthProvider';
import useCheckUser from '../../../hooks/useCheckUser';
import Spinner from '../../../Componemts/Spinner';

const Sidebar = () => {
    const { loginUser } = useContext(AuthContex)
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email)

    if (userCheckLoading) {
        return <Spinner />
    }

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><FaAngleRight /></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {
                    checkUser === 'user' &&
                    <ul className="menu p-4 bg-base-100 text-base-content ">
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myOrders"><FcFilingCabinet className='text-2xl' />My Orders</NavLink></li>
                    </ul>
                }
                {
                    checkUser === 'sealer' &&
                    <ul className="menu p-4  bg-base-100 text-base-content ">
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/addProduct"><FcPlus className='text-2xl' />  Add Product</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myOrders"><FcFilingCabinet className='text-2xl' />My Orders</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myProduct"><FcAcceptDatabase className='text-2xl' />My Orders</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myProduct"><FcTodoList className='text-2xl' />My Buyers</NavLink></li>
                    </ul>
                }
                {
                    checkUser === 'admin' &&
                    <ul className="menu p-4  bg-base-100 text-base-content ">
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/addProduct"><FcPlus className='text-2xl' />  Add Product</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/admin/allProduct"><FcFilingCabinet className='text-2xl' />  All Product</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/admin/addService"><FcServices className='text-2xl' />  Add Services</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/admin/allService"><FcTodoList className='text-2xl' />  All Services</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/admin/appointment"><FcAcceptDatabase className='text-2xl' />  Manage Appointment</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/admin/makeAdmin"><FcBusinessman className='text-2xl' />  Manage Admin</NavLink></li>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Sidebar;