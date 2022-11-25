import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import AllUserTable from './AllUserTable';

const AllUsers = () => {

    const { data: allUser = [] } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const data = axios.get('http://localhost:5000/saveUser')
            return (await data).data;
        }
    })
    console.log(allUser);
    return (
        <div className='p-3'>
            <h1 className='text-center text-4xl font-bold mb-3 uppercase'>All Users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='bg-blue-400 text-center'>
                            <th>SL.No</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Make Admin</th>
                            <th>verify</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((user, index) => <AllUserTable user={user} key={user?._id} index={index} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;