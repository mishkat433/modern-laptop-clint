import React from 'react';
import { FaTrash } from 'react-icons/fa';

const MyProductsTable = ({ product, index, deleteHandle, advartiseHandle }) => {
    const { productName, resellPrice, sealerName, date, location } = product?.productInfo;
    return (
        <tr className='text-center'>
            <td>{index + 1}</td>
            <td>
                <div className='flex gap-3'>
                    <img className='h-20 w-32' src={product?.image} alt="" />
                    <div className='text-start'>
                        <h4 className='text-xl font-bold'> </h4>
                        <h4 className='text-md'>Sealer Name : {sealerName}</h4>
                        <h4 className='text-md'>Sell Price : {resellPrice}</h4>
                        <h4 className='text-md'>Post Date : {date}</h4>
                        <h4 className='text-md'>Location: {location}</h4>
                    </div>
                </div>
            </td>
            <td>{productName}</td>
            <td>{product?.payment ? <p className='text-error'>Sold Out</p> : <p>Available</p>}</td>
            <td>{
                product?.advertise !== 'advertise' && !product?.payment ? <button onClick={() => advartiseHandle(product?._id)} className='btn btn-sm btn-primary capitalize'>Advertise</button> : undefined
            }</td>
            <td><button><FaTrash className='text-orange-500 text-xl' onClick={() => deleteHandle(product?._id)} /></button></td>
        </tr>
    );
};

export default MyProductsTable;