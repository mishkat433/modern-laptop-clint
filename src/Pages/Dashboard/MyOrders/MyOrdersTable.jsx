import React from 'react';
import { FaTrash } from 'react-icons/fa';

const MyOrdersTable = ({ order, index, deleteHandle }) => {
    const { productImage, choseProductName, choseProductPrice, payment, _id } = order;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <img className='h-20 w-32' src={productImage} alt="" />
            </td>
            <td>{choseProductName}</td>
            <td>${choseProductPrice}</td>
            <td><button className='btn btn-sm bg-orange-500 border-none'>{payment === 'pay' ? "pay" : "paid"}</button></td>
            <td><button><FaTrash className='text-orange-500 text-xl' onClick={() => deleteHandle(_id)} /></button></td>
        </tr>
    );
};

export default MyOrdersTable;