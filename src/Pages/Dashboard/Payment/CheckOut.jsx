import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../../../Componemts/SmallSpinner';
import { AuthContex } from '../../../Contex/AuthProvider';

const CheckOut = ({ bookingPayment }) => {
    const { loginUser } = useContext(AuthContex)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [tranId, setTranId] = useState('');
    const [clientSecret, setClintSecret] = useState('')
    const { choseProductPrice, bookingData, productId, _id } = bookingPayment;
    const { userName, userEmail } = bookingData;
    const [processing, setProcessing] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://modern-laptop-server.vercel.app/create-payment', {
            method: "POST",
            headers: { "content-type": "application/json", authorization: `bearer ${localStorage.getItem('accessToken')}` },
            body: JSON.stringify({ choseProductPrice })
        })
            .then(res => res.json())
            .then(data => setClintSecret(data.clientSecret))
    }, [choseProductPrice])

    const handleSubmit = async (e) => {
        setProcessing(true)
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            setCardError(error.message)
            setProcessing(false)
            console.log(paymentMethod);
        }
        else {
            setCardError('')
        }
        setSuccess('')

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: userEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {

            const payment = {
                choseProductPrice,
                transactionId: paymentIntent.id,
                userEmail,
                bookingId: _id,
                productId: productId
            }

            fetch(`https://modern-laptop-server.vercel.app/finalPayment?email=${loginUser?.email}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem("laptop-token")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess("Congrats! your payment completed")
                        toast.success("Congrats! your payment completed")
                        setTranId(paymentIntent.id)
                        navigate("/dashboard/myOrders")
                    }
                })
        }
        setProcessing(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='w-full'>
                <CardElement
                    className="bg-white border-2 focus: p-3  rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary w-2/5 btn-sm mt-3' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
                {processing && <p className='flex justify-center gap-5'>Card Processing. Please wait few seconds <SmallSpinner /></p>}
            </form>
            {cardError && <p className='text-red-500 my-5'>{cardError}</p>}
            {success && <p className='text-blue-500 mt-5 text-xl'>{success}</p>}
            {tranId && <p className='text-blue-500 text-xl'>Your transaction Id is : {tranId}</p>}
        </>
    );
};

export default CheckOut;