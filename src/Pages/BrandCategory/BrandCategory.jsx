import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BrandCategoryCard from './BrandCategoryCard';
import Spinner from '../../Componemts/Spinner';

const BrandCategory = () => {

    const params = useParams()
    const id = params.id

    const { data: BrandWiseLoad = [], isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const data = await axios.get(`http://localhost:5000/product/${id}`)
            return data.data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }
    if (BrandWiseLoad.length === 0) {
        return <h1 className='text-center text-3xl text-red-500 my-10'>No Product Found</h1>
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className='bg-gradient-to-r from-orange-500 to-blue-500 h-[200px] rounded-md flex justify-center items-center'>
                <h1 className='text-5xl font-bold text-white'>Don't miss our products, never get them later</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20'>
                {
                    BrandWiseLoad.map(singleProduct => <BrandCategoryCard singleProduct={singleProduct} key={singleProduct._id} />)
                }
            </div>
        </div>
    );
};

export default BrandCategory;