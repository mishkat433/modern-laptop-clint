import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../Componemts/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut';

const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Secret)
const Payment = () => {
    const [bookingPayment, setBookingPayment] = useState(null)
    const params = useParams()
    const id = params.id;

    useEffect(() => {
        fetch(`https://modern-laptop-server.vercel.app/singleBooking/${id}`)
            .then(res => res.json())
            .then(data => {
                setBookingPayment(data);
            })
    }, [id])

    if (bookingPayment === null) {
        return <Spinner />
    }

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>Payment</h1>
            <p className="text-xl">Please Pay <strong>${bookingPayment?.choseProductPrice}</strong> for buying <span className='font-bold'>{bookingPayment?.choseProductName}</span></p>
            <div className='mt-10 w-3/5'>
                <Elements stripe={stripePromise} >
                    <CheckOut bookingPayment={bookingPayment} />
                </Elements>
            </div>
            {/* <div className="card w-96 bg-base-100 shadow-xl mt-10">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Payment;