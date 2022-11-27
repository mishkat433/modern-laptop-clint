import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BrandCategoryCard from './BrandCategoryCard';
import Spinner from '../../Componemts/Spinner';
import BookingModal from './BookingModal';
import toast from 'react-hot-toast';

const BrandCategory = () => {
    const [selectProduct, setSelectProduct] = useState(null)
    const [close, setClose] = useState(false)

    const params = useParams()
    const id = params.id;

    const { data: brandWiseLoad = [], isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const data = await axios.get(`http://localhost:5000/product/${id}`)
            return data.data;
        }
    })


    if (isLoading) {
        return <Spinner />
    }
    if (brandWiseLoad.length === 0) {
        return <h1 className='text-center text-3xl text-red-500 my-10'>No Product Found</h1>
    }

    const reportProduct = (id) => {
        const confirm = window.confirm("do you want to report this product?")
        if (confirm) {
            axios.put(`http://localhost:5000/reportProduct/${id}`)
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        toast.success('report this product successful')
                    }
                })
        }
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className='bg-gradient-to-r from-orange-500 to-blue-500 h-[200px] rounded-md flex justify-center items-center'>
                <h1 className='text-3xl lg:text-5xl font-bold text-white'>Don't miss our products, never get them later</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20'>
                {
                    brandWiseLoad.map(singleProduct => <BrandCategoryCard setClose={setClose} singleProduct={singleProduct} key={singleProduct._id} setSelectProduct={setSelectProduct} reportProduct={reportProduct} />)
                }
            </div>
            <div>
                {close && <BookingModal selectProduct={selectProduct} setClose={setClose} />}
            </div>
        </div>
    );
};

export default BrandCategory;