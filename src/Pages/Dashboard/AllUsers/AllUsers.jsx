import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import AllUserTable from './AllUserTable';

const AllUsers = () => {

    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const data = axios.get('http://localhost:5000/saveUser')
            return (await data).data;
        }
    })

    const verifyHandle = (id) => {
        const confirm = window.confirm("Do you want to verify this user?")
        if (confirm) {
            fetch(`http://localhost:5000/verifyUser/${id}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Verified Successful')
                        refetch()
                    }
                })
        }
    }

    const makeAdminHandle = (id) => {
        const confirm = window.confirm("Do you want to make Admin this user?")
        if (confirm) {
            fetch(`http://localhost:5000/makeAdmin/${id}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Admin Make Successful')
                        refetch()
                    }
                })
        }
    }

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
                            {/* <th>action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((user, index) => <AllUserTable user={user} key={user?._id} index={index} verifyHandle={verifyHandle} makeAdminHandle={makeAdminHandle} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;