import React from 'react';

interface CardProps {
    title: string;
    content: string;
    footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, footer }) => {
    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-content">{content}</p>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

export default Card;