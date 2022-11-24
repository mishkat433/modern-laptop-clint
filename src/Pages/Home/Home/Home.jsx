import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Steps from '../Steps/Steps';
import Supports from '../Supports/Supports';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner />
            <Category />
            <Steps />
            <Supports />
        </div>
    );
};

export default Home;