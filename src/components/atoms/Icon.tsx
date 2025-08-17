import React from 'react';

interface IconProps {
    name: string;
    size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24 }) => {
    return (
        <i className={`icon-${name}`} style={{ fontSize: size }} aria-hidden="true"></i>
    );
};

export default Icon;