import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';

const BrandCategoryCard = ({ singleProduct, setSelectProduct, setClose, reportProduct }) => {
    const { productName, originalPrice, resellPrice, useTime, details, date, condition, phoneNumber, sealerEmail, sealerName, location } = singleProduct.productInfo;
    const [findVerify, setFindVerify] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/saveUser?email=${sealerEmail}`)
            .then(res => res.json())
            .then(data => {
                setFindVerify(data[0])
            })
    }, [sealerEmail])


    return (
        <div className="card  bg-base-100 shadow-xl" data-aos="zoom-in">
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
                <div className='flex justify-between items-start flex-wrap'>
                    <h4>Posted by : {sealerName} {findVerify?.verify === 'verified' ? <input type="checkbox" checked className="checkbox checkbox-success h-4 w-4" readOnly /> : undefined} </h4>
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
                <div className="card-actions flex justify-between items-center mt-3" onClick={() => setClose(true)}>
                    <p className="text-lg cursor-pointer font-semibold hover:text-blue-500" onClick={() => reportProduct(singleProduct?._id)} >Report to Admin</p>
                    <label htmlFor="booking-modal" className="btn btn-primary w-1/2" onClick={() => setSelectProduct(singleProduct)} >Buy Now</label>
                </div>
            </div>
        </div >
    );
};

export default BrandCategoryCard;