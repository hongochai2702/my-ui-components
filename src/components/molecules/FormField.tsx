import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

interface FormFieldProps {
    labelText: string;
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ labelText, inputValue, onInputChange, placeholder }) => {
    return (
        <div>
            <Label text={labelText} htmlFor={labelText} />
            <Input value={inputValue} onChange={onInputChange} placeholder={placeholder} />
        </div>
    );
};

export default FormField;