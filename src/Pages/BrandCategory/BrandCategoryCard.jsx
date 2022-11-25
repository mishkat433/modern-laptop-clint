import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import axios from 'axios';

const BrandCategoryCard = ({ singleProduct }) => {
    const { productName, originalPrice, resellPrice, useTime, details, date, condition, phoneNumber, sealerEmail, sealerName, location } = singleProduct.productInfo;

    const { data: user = [] } = useQuery({
        queryKey: ['saveUser'],
        queryFn: async () => {
            const data = await axios.get(`http://localhost:5000/saveUser?email=${sealerEmail}`)
            return data.data;
        }
    })
    console.log(user.verify);

    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure><img className='w-full h-[250px] border-b' src={singleProduct?.image} alt="product" /></figure>
            <div className="p-4 card-body ">
                <h2 className="text-2xl capitalize font-bold text-center">{productName}</h2>
                <div className='flex justify-between  flex-wrap'>
                    <h4>Condition : {condition} </h4> |
                    <h4>New Price : ${originalPrice} </h4> |
                    {
                        useTime.includes('months') ? <h4>Used : {useTime} </h4> : <h4>Used : {useTime} year </h4>
                    }
                </div>
                <p className=' text-justify '>{details}</p>
                <div className='flex justify-between flex-wrap'>
                    <h4 className='flex items-center gap-2'>Post by :  {user?.verify === 'verified' ? <input type="checkbox" checked className="checkbox checkbox-success h-4 w-4" /> : undefined}{sealerName} </h4>
                    <h4>Email : {sealerEmail} </h4>

                </div>
                <div className='flex justify-between items-center'>
                    <p className='font-bold'><FaLocationArrow className='inline' /> {location}</p>
                    <h4 className='text-xl font-bold text-center text-primary'> Price : ${resellPrice}</h4>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between items-center'>
                    <h4 className='text-gray-500'>Post : {date}</h4>
                    <h4 className='font-semibold'>Phone : {phoneNumber}</h4>
                </div>
                <div className="card-actions justify-center mt-3">
                    <button className="btn btn-primary w-full">Buy Now</button>
                </div>
            </div>
        </div >
    );
};

export default BrandCategoryCard;