import React from 'react';

const AllUserTable = ({ user, index }) => {
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td>{user?.email}</td>
            <td>{user?.userType}</td>
            <td><button className='btn btn-sm bg-orange-500 border-none'>make admin</button></td>
            <td>{
                user?.verify === 'verified' ? <button className='btn btn-sm btn-success'>Verified</button> : <button className='btn btn-sm bg-orange-500 border-none'>{user.verify}</button>
            }</td>
            {/* 
            <td>${choseProductPrice}</td>
            <td>{
                payment === 'pay' ? <Link to={`/dashboard/payment/${_id}`}><button className='btn btn-sm bg-orange-500 border-none'>Pay</button></Link>
                    : <button className='btn btn-sm btn-success border-none'>Paid</button>
            }</td>
            <td><button><FaTrash className='text-orange-500 text-xl' onClick={() => deleteHandle(_id)} /></button></td> */}
        </tr>
    );
};

export default AllUserTable;