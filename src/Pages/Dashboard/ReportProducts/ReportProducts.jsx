import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import ReportTable from './ReportTable';

const ReportProducts = () => {

    const { data: reportItems = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const data = await axios.get('http://localhost:5000/reportedProducts')
            return data.data;
        }
    })

    const deleteHandle = (id) => {
        const confirm = window.confirm("do you want to delete this product?")
        if (confirm) {
            axios.delete(`http://localhost:5000/deleteProduct/${id}`)
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

    return (
        <div className='my-5 p-2'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>Reported Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-blue-400'>
                            <th>SL.No</th>
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>Sealer Email</th>
                            <th>report</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportItems.map((report, index) => <ReportTable report={report} key={report?._id} index={index} deleteHandle={deleteHandle} />)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ReportProducts;