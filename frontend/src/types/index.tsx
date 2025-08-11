import type { JSX } from "react";
export interface EntryProps {
    label: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    alert?: string | JSX.Element;
    alertProps?: React.HTMLAttributes<HTMLDivElement>;
}
// Form component
export type FormProps = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    address?: string;
}