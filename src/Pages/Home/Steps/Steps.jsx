import React from 'react';
import winnerImg from "../../../assets/Winner.png";
import { FaArrowRight, FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

const Steps = () => {
    return (
        <div className='mb-20 '>
            <div className='w-full md:w-3/5 mx-auto text-center mb-16'>
                <h1 className='text-3xl md:text-4xl font-bold mb-5 text-orange-500'>Best Seller</h1>
                <p className='text-md md:text-lg'> Whether you're looking for an all-arounder, we've found a winner from trusted retailers.</p>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-10 '>
                <div className='w-full lg:w-1/2' data-aos="flip-down">
                    <img className='w-[520px]' src={winnerImg} alt="winnerImg" />
                </div>
                <div className='w-full lg:w-1/2' data-aos="flip-down">
                    <h1 className='text-4xl font-bold mb-5'>Annual award for best second hand laptop seller</h1>
                    <p className='text-justify'>Let's admit that choosing the right laptop can be a very complicated process. This difficulties can be explained by the notable differences in terms of both hardware and design, which tend to be unique to each brand. Thus buying a new or refurbished laptop, you should always keep in mind what exactly you will be using your new computer for. Think whether you intend to lug your machine from place to place or use it as a device to snuggle up with in bed. Never forget that there is a good deal to consider and the process can be really complicated, as we have said earlier.</p>
                    <div className='mt-5 flex items-center gap-20'>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold'>let's talk  </p>
                            <FaArrowRight />
                        </div>
                        <div className='text-2xl flex items-center gap-10 '>
                            <FaFacebookSquare className='text-orange-500 hover:text-blue-500 duration-300 cursor-pointer' />
                            <FaLinkedin className='text-orange-500 hover:text-blue-500 duration-300 cursor-pointer' />
                            <FaTwitterSquare className='text-orange-500 hover:text-blue-500 duration-300 cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Steps;