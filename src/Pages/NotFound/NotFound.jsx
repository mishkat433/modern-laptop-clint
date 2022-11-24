import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import notFoundImg from "../../assets/error.gif";

const NotFound = () => {
    const error = useRouteError()
    return (
        <div>
            <div className='flex flex-col items-center mt-10'>
                <h1 className='text-red-500 text-2xl'>{error.statusText}</h1>
                <h1 className='text-red-500 text-2xl'>{error.status}</h1>
                <img className='w-80 mt-20' src={notFoundImg} alt="" />
                <Link to='/' className='btn bg-black'>Back to home</Link>
            </div>
        </div>
    );
};

export default NotFound;