import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import Spinner from '../../../Componemts/Spinner';
import BookingModal from '../../BrandCategory/BookingModal';
import AdvertiseCard from './AdvertiseCard';

const AdvartiseItems = () => {

    const { data: advertiseItem = [], isLoading } = useQuery({
        queryKey: ['advetiseItem'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/advetiseItems')
            return response.data
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    if (advertiseItem.length === 0) {
        return undefined;
    }

    return (
        <div className='mb-20'>
            <div className='w-full lg:w-3/5 mx-auto text-center mb-10 '>
                <h1 className='text-3xl lg:text-4xl font-bold mb-5 text-orange-500'>Advertise Item's</h1>
                <p className='text-md lg:text-lg'>There are several branches or types of advertising which can be used by the organizations. All the important types of Advertising are discussed in detail.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    advertiseItem.map(adItem => <AdvertiseCard adItem={adItem} key={adItem?._id} />)
                }
            </div>
            <div>
                <BookingModal></BookingModal>
            </div>
        </div>
    );
};

export default AdvartiseItems;