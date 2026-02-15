import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizes = {
        sm: 'h-2 w-2',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
    };

    // Modern "Three Bouncing Dots" loader
    const spinner = (
        <div className="flex space-x-2 justify-center items-center">
            <span className="sr-only">Loading...</span>
            <div className={`${sizes[size]} bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
            <div className={`${sizes[size]} bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
            <div className={`${sizes[size]} bg-primary-600 rounded-full animate-bounce`}></div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-50">
                {spinner}
                <p className="mt-4 text-gray-500 font-medium tracking-wide animate-pulse">Loading...</p>
            </div>
        );
    }

    return <div className="flex justify-center items-center p-4">{spinner}</div>;
};

export default Loader;
