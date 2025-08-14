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
//campos originales de la base de datos
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  created_at?: Date;
}