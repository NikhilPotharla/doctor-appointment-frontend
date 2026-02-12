import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
    return (
        <div
            className={`card ${hover ? 'hover:shadow-xl' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
