import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../../Componemts/Spinner';
import CategoryCard from './CategoryCard';

const Category = () => {

    const { data: categorys = [], isLoading } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }
    if (!isLoading && categorys.length === 0) {
        return <p className='text-red-500 text-2xl text-center my-10'>No Category found, Please check your net connection</p>
    }

    return (
        <div className='mb-20'>
            <div className='w-full lg:w-3/5 mx-auto text-center mb-10'>
                <h1 className='text-3xl lg:text-4xl font-bold mb-5 text-orange-500'>Resale Laptop Category's</h1>
                <p className='text-md lg:text-lg'>The laptop remains a mainstay among computer electronics. Besides with newer hardware geared towards performance.</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {
                    categorys.map(category => <CategoryCard category={category} key={category._id} />)
                }
            </div>
        </div>
    );
};

export default Category;