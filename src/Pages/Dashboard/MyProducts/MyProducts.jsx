import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../Componemts/Spinner';
import { AuthContex } from '../../../Contex/AuthProvider';
import MyProductsTable from './MyProductsTable';

const MyProducts = () => {
    const { loginUser } = useContext(AuthContex)

    const { data: myProduct = [], isLoading, refetch } = useQuery({
        queryKey: ['myProduct'],
        queryFn: async () => {
            const data = await axios.get(`https://modern-laptop-server.vercel.app/myProduct/${loginUser?.email}?email=${loginUser?.email}`, {
                headers: { authorization: `Bearer ${localStorage.getItem("laptop-token")}` }
            })
            return data.data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    if (myProduct.length === 0) {
        return <h4 className='text-4xl font-bold text-center text-red-500 mt-10'>You have no added any product</h4>
    }

    const deleteHandle = (id) => {
        const confirm = window.confirm("do you want to delete this product?")
        if (confirm) {
            axios.delete(`https://modern-laptop-server.vercel.app/deleteProduct/${id}`)
                .then(response => {
                    if (response.data.deletedCount > 0) {
                        toast.success(('Delete successful'))
                        refetch()
                    }
                })
                .catch(error => {
                    toast.error('There was an error!', error.message);
                });
        }
    }

    const advartiseHandle = (id) => {
        const confirm = window.confirm("do you want to Advertise this product?")
        const headers = { authorization: `Bearer ${localStorage.getItem("laptop-token")}` }
        if (confirm) {
            axios.put(`http://localhost:5000/productAdvertise/${id}?email=${loginUser?.email}`, id, { headers })
                .then(response => {
                    if (response.data.modifiedCount > 0) {

                        refetch()
                        toast.success(('Your product is ready for advertises'))
                    }
                })
                .catch(error => {
                    toast.error('There was an error!', error.message);
                });
        }
    }

    return (
        <div className='p-3'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-blue-400 text-center'>
                            <th>SL.No</th>
                            <th>Details</th>
                            <th>Product Name</th>
                            <th>Sale Status</th>
                            <th>Advertise</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProduct.map((product, index) => <MyProductsTable product={product} key={product?._id} index={index} deleteHandle={deleteHandle} advartiseHandle={advartiseHandle} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;