import React from 'react';
import Slider from 'react-slick';
import img1 from "../../../assets/laptop3.png";
import img2 from "../../../assets/laptop1.png";
import img3 from "../../../assets/laptop2.png";


const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", marginRight: '30px', zIndex: "10" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", marginLeft: '30px', zIndex: "10" }}
                onClick={onClick}
            />
        );
    }
    return (
        <div className='mb-20'>
            <Slider {...settings}>
                <div className='h-[55vh] md:h-[80vh] lg:h-[85vh] w-full bg-gradient-to-l from-blue-500 to-orange-500 rounded-md'>
                    <div className='flex flex-col-reverse md:flex-row justify-around lg:gap-10 items-center h-full'>
                        <div className='text-white w-full lg:w-1/2 mx-5 lg:ml-10'>
                            <h1 className='text-3xl lg:text-6xl mb-3 lg:mb-14 font-bold mx-5'>The smart way to buy second hand Laptop</h1>
                            <p className='text-sm lg:text-lg mx-5 text-justify'>Shopping for a notebook can be an infuriating experience. Here's how to sift through the acronyms, storage options, and extra features to find the best one for you.</p>
                        </div>
                        <div className='w-3/5 md:w-1/2 mt-3 md:mt-0 mr-10'>
                            <img className='' src={img1} alt="slide image1" />
                        </div>
                    </div>
                </div>
                <div className='h-[55vh] md:h-[80vh] lg:h-[85vh] w-full bg-gradient-to-l from-blue-500 to-orange-500 rounded-md'>
                    <div className='flex flex-col-reverse md:flex-row justify-around lg:gap-10 items-center h-full'>
                        <div className='text-white w-full lg:w-1/2 mx-5 lg:ml-10'>
                            <h1 className='text-3xl lg:text-6xl mb-3 lg:mb-14 font-bold mx-5'>Pick Your best second hand Laptop</h1>
                            <p className='text-sm lg:text-lg mx-5 text-justify'>We hope this guide will help you navigate the morass of modern laptops. Below is a section on every major component you'll want to know about when you browse for your next PC.</p>
                        </div>
                        <div className='w-3/5 md:w-1/2 mt-3 md:mt-0 mr-10'>
                            <img className='' src={img2} alt="slide image1" />
                        </div>
                    </div>
                </div>
                <div className='h-[55vh] md:h-[80vh] lg:h-[85vh] w-full bg-gradient-to-l from-blue-500 to-orange-500 rounded-md'>
                    <div className='flex flex-col-reverse md:flex-row justify-around lg:gap-10 items-center h-full'>
                        <div className='text-white w-full lg:w-1/2 mx-5 lg:ml-10'>
                            <h1 className='text-3xl lg:text-6xl mb-3 lg:mb-14 font-bold mx-5'>Check your chose Step-by-Step</h1>
                            <p className='text-sm lg:text-lg mx-5 text-justify'>The next two or three numbers ("510") are related to performance. The higher these numbers are, the more powerful the chip is.</p>
                        </div>
                        <div className='w-3/5 md:w-1/2 mt-3 md:mt-0 mr-10'>
                            <img className='' src={img3} alt="slide image1" />
                        </div>
                    </div>
                </div>
            </Slider >
        </div >
    );
};

export default Banner;