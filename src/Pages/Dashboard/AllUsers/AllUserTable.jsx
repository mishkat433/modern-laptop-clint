import React from 'react';

const AllUserTable = ({ user, index, verifyHandle, makeAdminHandle }) => {
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td>{user?.email}</td>
            <td>{user?.userType}</td>
            <td>{user?.userType !== 'admin' ? <button onClick={() => makeAdminHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>make admin</button> : undefined} </td>
            <td>{
                user?.verify === 'verified' ? <button className='btn btn-sm btn-success'>Verified</button> : <button onClick={() => verifyHandle(user?._id)} className='btn btn-sm bg-orange-500 border-none'>Verify</button>
            }</td>
        </tr>
    );
};

export default AllUserTable;