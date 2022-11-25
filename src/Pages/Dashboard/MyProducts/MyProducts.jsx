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
            const data = await axios.get(`https://modern-laptop-server.vercel.app/myProduct/${loginUser?.email}`)
            return data.data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    const deleteHandle = (id) => {
        const confirm = window.confirm("do you want to delete this product?")
        if (confirm) {
            axios.delete(`https://modern-laptop-server.vercel.app/deleteProduct/${id}`)
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
                        <tr className='bg-blue-400 text-center'>
                            <th>SL.No</th>
                            <th>Details</th>
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