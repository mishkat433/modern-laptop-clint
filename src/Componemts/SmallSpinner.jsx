import React from 'react';

const SmallSpinner = () => {
    return (
        <div className='flex justify-center'>
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-500 dark:border-violet-400"></div>
        </div>
    );
};

export default SmallSpinner;