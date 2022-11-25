import React from 'react';
import { FaTrash } from 'react-icons/fa';

const MyProductsTable = ({ product, index, deleteHandle }) => {
    const { productName, resellPrice, sealerName, date, location } = product?.productInfo;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className='flex gap-3'>
                    <img className='h-20 w-32' src={product?.image} alt="" />
                    <div>
                        <h4 className='text-xl font-bold'> </h4>
                        <h4 className='text-md'>Sealer Name : {sealerName}</h4>
                        <h4 className='text-md'>Sell Price : {resellPrice}</h4>
                        <h4 className='text-md'>Post Data : {date}</h4>
                        <h4 className='text-md'>Location: {location}</h4>
                    </div>
                </div>
            </td>
            <td>{productName}</td>
            <td>{product?.payment ? <p className='text-error'>Sold Out</p> : <p>Available</p>}</td>
            <td><button><FaTrash className='text-orange-500 text-xl' onClick={() => deleteHandle(product?._id)} /></button></td>
        </tr>
    );
};

export default MyProductsTable;