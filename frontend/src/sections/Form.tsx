import {type JSX, useState } from 'react';
import { Entry, Buttons } from '../components';
import type { EntryProps, FormProps } from '../types';

export const Form = (): JSX.Element => {
    // INICIALIZACIONES
    // Common class for all labels
    const classLabel = "text-sm font-medium text-white";
    // State to manage form entries and alerts
    const [alert, setAlert] = useState<FormProps>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    });
    const [propsAlert, setPropsAlert] = useState<React.HTMLAttributes<HTMLDivElement>>({});
    const [formEntries, setFormEntries] = useState<FormProps>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    });
    const [inputColors, setInputColors] = useState<Record<string, "info" | "success" | "failure">>({
        username: "info",
        email: "info",
        password: "info",
        confirmPassword: "info",
        phone: "info",
        address: "info"
    });
    // FUNCIONES
    // Define the function to handle input blur event
    const handleInputBlur = (field: keyof FormProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputColors(prev => ({
            ...prev,
            [field]: value.trim().length === 0 ? "failure" : prev[field]
        }));
        // Reset the alert message if the field is not empty
        if (value.trim().length > 0) {
            setAlert(prev => ({
                ...prev,
                [field]: ""
            }));
            setPropsAlert({});
        } else {
            // Set the alert message if the field is empty
            setInputColors(prev => ({
                ...prev,
                [field]: "failure"
            }));
            setAlert(prev => ({
                ...prev,
                [field]: `The ${field} field is required.`
            }));
            setPropsAlert({
                className: "text-red-500 text-sm mt-1"
            });
        }
    };
    // Define the function to handle input change event
    const handleInputChange = (field: keyof FormProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Validación para el campo phone
        if (field === "phone") {
            if (/[^0-9+]/.test(value)) {
                setAlert(prev => ({
                    ...prev,
                    phone: "Phone number can only contain digits and '+' sign."
                }));
                setPropsAlert({
                    className: "text-red-500 text-sm mt-1"
                });
                setInputColors(prev => ({
                    ...prev,
                    phone: "failure"
                }));
            } else {
                setAlert(prev => ({
                    ...prev,
                    phone: ""
                }));
                setInputColors(prev => ({
                    ...prev,
                    phone: value.trim().length > 0 ? "success" : "info"
                }));
            }
        } else if (value.trim().length === 0) {
            setInputColors(prev => ({
                ...prev,
                [field]: "failure"
            }));
            setAlert(prev => ({
                ...prev,
                [field]: `The ${field} field is required.`
            }));
            setPropsAlert({
                className: "text-red-500 text-sm mt-1"
            });
        } else if (field === "confirmPassword" && value !== formEntries.password) {
            setInputColors(prev => ({
                ...prev,
                confirmPassword: "failure"
            }));
            setAlert(prev => ({
                ...prev,
                confirmPassword: "Passwords do not match."
            }));
            setPropsAlert({
                className: "text-red-500 text-sm mt-1"
            });
        } else {
            setInputColors(prev => ({
                ...prev,
                [field]: value.trim().length > 0 ? "success" : "info"
            }));
            setAlert(prev => ({
                ...prev,
                [field]: ""
            }));
            setPropsAlert({});
        }
        setFormEntries(prevA => ({
            ...prevA,
            [field]: value.trim()
        }));
    };
    // Define the function to enter to password input
    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Check if the password matches the confirm password
        setInputColors(prev => ({
            ...prev,
            confirmPassword: value === formEntries.password ? "success" : "failure"
        }));
        // Update the confirm password field
        setFormEntries(prev => ({
            ...prev,
            confirmPassword: value
        }));
    };

    // List of form entries
    const entries: EntryProps[] = [
        {
            label: "Your name",
            labelProps: {className:classLabel},
            inputProps: {
                color: inputColors.username, 
                id: "username",
                type: "text",
                placeholder: "John Doe",
                onChange: handleInputChange("username"),
                onBlur: handleInputBlur("username")
            },
            alert:alert.username,
            alertProps: propsAlert
        },
        {
            label: "Email",
            labelProps: {className: classLabel},
            inputProps: {
                color:inputColors.email, 
                id: "email",
                type: "email",
                placeholder: "John@email.com",
                onChange: handleInputChange("email"),
                onBlur: handleInputBlur("email")
            },
            alert:alert.email,
            alertProps: propsAlert
        },
        {
            label: "Password",
            labelProps: {className: classLabel},
            inputProps: {
                color:inputColors.password,
                id: "password",
                type: "password",
                placeholder: "••••••••",
                onChange: handleInputChange("password"),
                onBlur: handleInputBlur("password")
            },
            alert:alert.password,
            alertProps: propsAlert
        },
        {
            label: "Confirm Password",
            labelProps: {className: classLabel},
            inputProps: {
                color:inputColors.confirmPassword,
                id: "confirmPassword",
                type: "password",
                placeholder: "••••••••",
                onChange: handlePasswordInput,
                onBlur: handleInputBlur("confirmPassword"),
            },
            alert:alert.confirmPassword,
            alertProps: propsAlert
        },
        {
            label: "Phone Number",
            labelProps: {className: classLabel},
            inputProps: {
                color:inputColors.phone,
                id: "phone",
                type: "tel",
                placeholder: "+1234567890",
                onChange: handleInputChange("phone"),
                onBlur: handleInputBlur("phone"),
            },
            alert:alert.phone,
            alertProps: propsAlert
        },
        {
            label: "Address",
            labelProps: {className: classLabel},
            inputProps: {
                color:inputColors.address,
                id: "address",
                type: "text",
                placeholder: "123 Main St, City, Country",
                onChange: handleInputChange("address"),
                onBlur: handleInputBlur("address")
            },
            alert:alert.address,
            alertProps: propsAlert
        }
    ];
    // Render the form with entries
    return (
        <>
            <form className="flex flex-col gap-0.5">
                {entries.map((entry, index) => (
                    <Entry 
                        label={entry.label}
                        key={index}
                        labelProps={entry.labelProps}
                        inputProps={entry.inputProps}
                        alert={entry.alert}
                        alertProps={entry.alertProps}
                    />
                ))}
                <Buttons type="submit" className='text-xl mt-3'>Submit</Buttons>
            </form>
        </>
    );
}