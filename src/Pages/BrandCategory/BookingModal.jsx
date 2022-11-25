import React, { useContext, useState } from 'react';
import { AuthContex } from '../../Contex/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import SmallSpinner from '../../Componemts/SmallSpinner';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ selectProduct, setClose }) => {
    const { loginUser } = useContext(AuthContex)
    const [bookingData, setBookingData] = useState({
        userName: loginUser?.displayName,
        userEmail: loginUser?.email,
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const bookingHandle = (e) => {
        setLoading(true)
        const bookingProductData = {
            choseProductName: selectProduct?.productInfo?.productName,
            choseProductPrice: selectProduct?.productInfo.resellPrice,
            productImage: selectProduct?.image,
            productId: selectProduct?._id,
            payment: 'pay',
            bookingData
        }
        sendbookingdata(bookingProductData, e)

        e.preventDefault()
    }

    const sendbookingdata = async (bookingProductData, e) => {
        const response = await axios
            .post('http://localhost:5000/booking', bookingProductData)
            .catch((error) => {
                setLoading(false)
                toast.error('Error: ', error.message)
            });
        if (response && response.data.insertedId) {
            toast.success('Booking successful, Please pay for confirm')
            setLoading(false)
            e.target.reset()
            setClose(false)
            navigate('/dashboard/myOrders')
        }
    }

    const dataHandle = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            < input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="card w-full ">
                        <form onSubmit={bookingHandle} className="card-body">
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' placeholder="name" defaultValue={loginUser?.displayName} className="input input-bordered h-10" disabled />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' placeholder="email" defaultValue={loginUser?.email} className="input input-bordered h-10" disabled />
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Product Name</label>
                                <input type="text" placeholder="Product Name" name='ProductNmae' defaultValue={selectProduct?.productInfo?.productName} className="input input-bordered h-10" disabled />
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Price ($)</label>
                                <input type="text" placeholder="Product Name" name='price' defaultValue={selectProduct?.productInfo?.resellPrice} className="input input-bordered h-10" disabled />
                            </div>
                            <div className="form-control">
                                <label htmlFor="number">Phone Number</label>
                                <input type="number" onChange={dataHandle} name='number' placeholder="Phone number" className="input input-bordered h-10" required />
                            </div>
                            <div className="form-control">
                                <label htmlFor="meetLocation">Location</label>
                                <input type="text" onChange={dataHandle} name='meetLocation' placeholder="Meet Location" className="input input-bordered h-10" required />
                            </div>
                            <div className="form-control mt-6">
                                {
                                    loading ? <button className="btn btn-primary" disabled><SmallSpinner /> </button> : <button className="btn btn-primary">Submit</button>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;