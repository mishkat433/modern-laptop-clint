import React from 'react';
import brand1 from "../../../assets/Apple .jpg";
import brand2 from "../../../assets/ASUS_Corporate_Logo.svg.png";
import brand3 from "../../../assets/dell.png";
import brand4 from "../../../assets/HP .png";

const Supports = () => {
    return (
        <div className='mb-20'>
            <div className='w-full lg:w-3/5 mx-auto text-center mb-10'>
                <h1 className='text-3xl lg:text-4xl font-bold mb-5 text-orange-500'>Support Brands</h1>
                <p className='text-md lg:text-lg'>When you're ready to build more advanced capabilities and distribute your apps, you can join</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 " data-aos="flip-up">
                <img className='border-2 p-2 rounded-md h-[140px] w-full' src={brand1} alt="brand" />
                <img className='border-2 p-2 rounded-md h-[140px] w-full' src={brand2} alt="brand" />
                <img className='border-2 p-2 rounded-md h-[140px] w-full' src={brand3} alt="brand" />
                <img className='border-2 p-2 rounded-md h-[140px] w-full' src={brand4} alt="brand" />
            </div>
        </div>
    );
};

export default Supports;