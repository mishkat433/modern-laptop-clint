import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { categoryId, heading, image } = category;
    return (
        <Link to={`/category/${categoryId}`}>
            <div className="card card-compact bg-base-100 shadow-xl border hover:bg-blue-400 duration-300 hover:text-white ">
                <figure><img className='h-[200px] w-4/5 hover:scale-110 duration-300' src={image} alt="Shoes" /></figure>
                <hr />
                <div className="p-3 text-center">
                    <h2 className="text-2xl font-bold mb-2">{heading} </h2>
                    {/* <p className='mb-3'>{text.slice(0, 50)} </p> */}
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;