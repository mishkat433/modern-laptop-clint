import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FcPlus, FcBusinessman, FcFilingCabinet, FcTodoList, FcAcceptDatabase, FcPortraitMode } from "react-icons/fc";
import { FaAngleRight } from 'react-icons/fa';
import { AuthContex } from '../../../Contex/AuthProvider';
import useCheckUser from '../../../hooks/useCheckUser';
import Spinner from '../../../Componemts/Spinner';

const Sidebar = () => {
    const { loginUser, logout } = useContext(AuthContex)
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email, logout)

    if (userCheckLoading) {
        return <Spinner />
    }

    return (
        <div className="drawer sm:drawer-mobile h-full">
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
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myProduct"><FcAcceptDatabase className='text-2xl' />My Products</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myBuyers"><FcTodoList className='text-2xl' />My Buyers</NavLink></li>
                    </ul>
                }
                {
                    checkUser === 'admin' &&
                    <ul className="menu p-4  bg-base-100 text-base-content ">
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/addProduct"><FcPlus className='text-2xl' />  Add Product</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myOrders"><FcFilingCabinet className='text-2xl' />My Orders</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myProduct"><FcAcceptDatabase className='text-2xl' />My Products</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/myBuyers"><FcTodoList className='text-2xl' />My Buyers</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/allBuyers"><FcBusinessman className='text-2xl' /> All Buyers</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "text-black font-bold bg-gray-200 mb-2" : "mb-2"} to="/dashboard/allSellers"><FcPortraitMode className='text-2xl' /> All Sealers</NavLink></li>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Sidebar;