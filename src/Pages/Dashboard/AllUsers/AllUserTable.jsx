import React from 'react';
import { FcFullTrash } from 'react-icons/fc';

const AllUserTable = ({ user, index, verifyHandle, makeAdminHandle, deleteUserHandle }) => {
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td>{user?.email}</td>
            <td>{user?.userType}</td>
            <td>{user?.userType !== 'admin' ? <button onClick={() => makeAdminHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>make admin</button> : undefined} </td>
            <td>{
                user?.verify === 'verified' ? <button className='btn btn-sm btn-success'>Verified</button> : <button onClick={() => verifyHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>Verify</button>
            }</td>
            <td className='flex justify-center'><FcFullTrash className='text-xl' onClick={() => deleteUserHandle(user?._id)} /></td>
        </tr>
    );
};

export default AllUserTable;