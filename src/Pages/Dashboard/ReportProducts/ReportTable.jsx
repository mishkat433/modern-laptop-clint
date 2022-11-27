import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ReportTable = ({ report, index, deleteHandle }) => {
    const { productName, sealerEmail } = report?.productInfo;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <img className='h-20 w-32' src={report?.image} alt="" />
            </td>
            <td>{productName}</td>
            <td>{sealerEmail}</td>
            <td className='text-red-500'>Reported</td>
            <td><button><FaTrash className='text-orange-500 text-xl' onClick={() => deleteHandle(report._id)} /></button></td>
        </tr>
    )
};

export default ReportTable;