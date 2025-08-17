import React from 'react';

interface LabelProps {
    text: string;
    htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
    return <label htmlFor={htmlFor}>{text}</label>;
};

export default Label;