import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../Componemts/Spinner';
import { AuthContex } from '../../../Contex/AuthProvider';
import useCheckUser from '../../../hooks/useCheckUser';
import MyOrdersTable from './MyOrdersTable';

const MyOrders = () => {
    const { loginUser, logout } = useContext(AuthContex)
    const [checkUser, userCheckLoading] = useCheckUser(loginUser?.email, logout)
    const [myOrder, setMyOrder] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (checkUser) {
            fetch(`https://modern-laptop-server.vercel.app/myBooking/${loginUser?.email}?email=${loginUser?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("laptop-token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setMyOrder(data)
                })
        }
    }, [loginUser?.email, checkUser, loading])

    if (userCheckLoading) {
        return <Spinner />
    }

    if (myOrder.length === 0) {
        return <h4 className='text-4xl font-bold text-center text-red-500 mt-10'>NO Orders found</h4>
    }


    const deleteHandle = (id) => {
        const confirm = window.confirm("do you want to delete this product?")
        if (confirm) {
            axios.delete(`https://modern-laptop-server.vercel.app/deleteBooking/${id}`)
                .then(response => {
                    if (response.data.deletedCount > 0) {
                        setLoading(!loading)
                        toast.success(('Delete successful'))
                    }
                })
                .catch(error => {
                    toast.error('There was an error!', error.message);
                });
        }
    }

    return (
        <div className='my-5 p-3'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-blue-400'>
                            <th>SL.No</th>
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrder.map((order, index) => <MyOrdersTable order={order} key={order?._id} index={index} deleteHandle={deleteHandle} />)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;