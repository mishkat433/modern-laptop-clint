import React from 'react';
import { FcFullTrash } from 'react-icons/fc';

const AllUserTable = ({ user, index, verifyHandle, makeAdminHandle, deleteUserHandle }) => {
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td className='flex gap-2'>
                <p>{user?.name}</p>
                <p>{user?.verify === 'verified' && <input type="checkbox" checked className="checkbox h-4 w-4 checkbox-success" readOnly />}</p>

            </td>
            <td>{user?.email}</td>
            <td>{user?.userType}</td>
            <td>{user?.userType !== 'admin' ? <button onClick={() => makeAdminHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>make admin</button> : undefined} </td>
            <td>{
                user?.verify === 'verified' ? <button className='btn btn-sm btn-success'>Verified</button> : <button onClick={() => verifyHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>verify</button>
            }</td>
            <td className='flex justify-center'><FcFullTrash className='text-xl' onClick={() => deleteUserHandle(user?._id)} /></td>
        </tr>
    );
};

export default AllUserTable;