import type { JSX } from "react";

// Form component
export type FormProps = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
}
export interface EntryProps {
    id: keyof FormProps;
    label: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    alert?: string | JSX.Element;
}

//campos originales de la base de datos
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  is_active?: boolean;
  created_at?: Date;
}

// Alertas
export type PropAlert = {
    typeAlert: "info" | "success" | "error";
    message: string;
}