import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContex } from '../../../Contex/AuthProvider';

const MyOrders = () => {
    const { loginUser } = useContext(AuthContex)
    const { } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:5000/myBooking/${loginUser?.email}`)
            return result
        }
    })

    return (
        <div className='my-5 p-2'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-blue-400'>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {

                       } */}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;