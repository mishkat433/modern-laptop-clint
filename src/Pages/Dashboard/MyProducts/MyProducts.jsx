import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../../Componemts/Spinner';
import { AuthContex } from '../../../Contex/AuthProvider';
import MyProductsTable from './MyProductsTable';

const MyProducts = () => {
    const { loginUser } = useContext(AuthContex)

    const { data: myProduct = [], isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const data = await axios.get(`http://localhost:5000/myProduct/${loginUser?.email}`)
            return data.data;
        }
    })
    console.log(myProduct);

    if (isLoading) {
        return <Spinner />
    }

    const deleteHandle = (id) => {
        const confirm = window.confirm("do you want to delete this product?")
        if (confirm) {
            axios.delete(`http://localhost:5000/deleteProduct/${id}`)
                .then(response => {
                    if (response.data.deletedCount > 0) {
                        refetch()
                        toast.success(('Delete successful'))
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
                        <tr className='bg-blue-400'>
                            <th>SL.No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProduct.map((product, index) => <MyProductsTable product={product} key={product?._id} index={index} deleteHandle={deleteHandle} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;