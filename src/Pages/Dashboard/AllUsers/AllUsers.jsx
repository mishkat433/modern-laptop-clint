import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import AllUserTable from './AllUserTable';

const AllUsers = () => {

    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const data = await axios.get('http://localhost:5000/saveUser?sealer=sealer')
            const filterUser = data.data.filter(allUsers => allUsers.userType === 'user')
            return filterUser;
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

    const deleteUserHandle = (id) => {
        const confirm = window.confirm("Do you want to make Admin this user?")
        if (confirm) {
            fetch(`http://localhost:5000/deleteAdmin/${id}`, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('user delete Successful')
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Make Admin</th>
                            <th>verify</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((user, index) => <AllUserTable user={user} key={user?._id} index={index} verifyHandle={verifyHandle} makeAdminHandle={makeAdminHandle} deleteUserHandle={deleteUserHandle} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;