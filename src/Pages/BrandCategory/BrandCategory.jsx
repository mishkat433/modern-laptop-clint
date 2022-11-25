import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BrandCategoryCard from './BrandCategoryCard';
import Spinner from '../../Componemts/Spinner';
import { AuthContex } from '../../Contex/AuthProvider';

const BrandCategory = () => {
    // const [email, setEmail] = useState(null)
    const { loginUser } = useContext(AuthContex)
    const [selectProduct, setSelectProduct] = useState(null)
    const [bookingData, setBookingData] = useState({
        userName: loginUser?.displayName,
        userEmail: loginUser?.email,
        // productName: selectProduct?.productInfo.productName,
        // productPrice: selectProduct?.productInfo.resellPrice
    })

    const params = useParams()
    const id = params.id

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

    const bookingHandle = (e) => {
        console.log(bookingData);
        e.preventDefault()
    }
    const dataHandle = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className='bg-gradient-to-r from-orange-500 to-blue-500 h-[200px] rounded-md flex justify-center items-center'>
                <h1 className='text-5xl font-bold text-white'>Don't miss our products, never get them later</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-20'>
                {
                    brandWiseLoad.map(singleProduct => <BrandCategoryCard singleProduct={singleProduct} setSelectProduct={setSelectProduct} key={singleProduct._id} />)
                }
            </div>
            <div>
                < input type="checkbox" id="booking-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <div className="card w-full ">
                            <form onSubmit={bookingHandle} className="card-body">
                                <div className="form-control">
                                    <input type="text" placeholder="name" defaultValue={loginUser?.displayName} className="input input-bordered h-10" readOnly />
                                </div>
                                <div className="form-control">
                                    <input type="email" placeholder="email" defaultValue={loginUser?.email} className="input input-bordered h-10" readOnly />
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="Product Name" name='pNmae' onChange={dataHandle} value={selectProduct?.productInfo?.productName} className="input input-bordered h-10" readOnly />
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="Product Name" name='asdf' onChange={dataHandle} value={selectProduct?.productInfo?.resellPrice} className="input input-bordered h-10" readOnly />
                                </div>
                                <div className="form-control">
                                    <input type="text" onChange={dataHandle} name='number' placeholder="Phone number" className="input input-bordered h-10" />
                                </div>
                                <div className="form-control">
                                    <input type="text" onChange={dataHandle} name='meetLocation' placeholder="Meet Location" className="input input-bordered h-10" />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandCategory;