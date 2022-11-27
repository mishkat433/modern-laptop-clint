import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContex } from '../../../Contex/AuthProvider';

const AdvertiseCard = ({ adItem }) => {
    const { loginUser } = useContext(AuthContex)
    const { productName, date, resellPrice } = adItem?.productInfo;

    return (
        <div className="card bg-base-100 shadow-xl" data-aos="zoom-in">
            <figure><img className='h-[250px] w-full' src={adItem?.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center">{productName}</h2>
                <div className='flex gap-3 justify-between items-center'>
                    <p>Post Date : {date}</p>
                    <p>Price : <span className='font-bold'>${resellPrice}</span></p>
                </div>
                {
                    loginUser?.uid ?
                        <div className="card-actions justify-center mt-3" >
                            <Link to={`/category/${adItem?.selectCategory}`} className="btn btn-primary w-full" >Buy Now</Link>
                        </div> :
                        <div className="card-actions justify-center mt-3" >
                            <h4 className="">Please <Link to='/login' className='text-blue-500 font-bold'>Login</Link> for getting this product </h4>
                        </div>
                }
            </div>
        </div>
    );
};

export default AdvertiseCard;