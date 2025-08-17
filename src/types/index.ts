export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export interface LabelProps {
    text: string;
    htmlFor: string;
}

export interface IconProps {
    name: string;
    size?: number;
}

export interface FormFieldProps {
    labelText: string;
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export interface CardProps {
    title: string;
    content: string;
    footer?: React.ReactNode;
}

export interface HeaderProps {
    // Define any props needed for the Header component
}

export interface FooterProps {
    // Define any props needed for the Footer component
}