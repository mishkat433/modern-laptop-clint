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
        fetch(`http://localhost:5000/singleBooking/${id}`)
            .then(res => res.json())
            .then(data => {
                setBookingPayment(data);
            })
    }, [id])

    if (bookingPayment === null) {
        return <Spinner />
    }
    console.log(bookingPayment);
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>Payment</h1>
            <p className="text-xl">Please Pay <strong>${bookingPayment?.choseProductPrice}</strong> for buying <span className='font-bold'>{bookingPayment?.choseProductName}</span></p>
            <div className='mt-10 w-3/5'>
                <Elements stripe={stripePromise} >
                    <CheckOut bookingPayment={bookingPayment} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;