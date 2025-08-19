import type { TextInputProps } from 'flowbite-react';
import {type JSX, useState } from 'react';
import { Entry, Buttons, Alerts } from '../components';
import type { EntryProps, FormProps, User } from '../types';
import { AuthService } from '../utils/api';

//types
type InputColorState = Record<keyof FormProps, "info" | "success" | "failure">;

// Element JSX (Form)
export const Form = (): JSX.Element => {
    // INITIALIZATIONS
    // required constants
    const templateForm: FormProps = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    };
    const initialInputColors: InputColorState = {
        ...Object.fromEntries(
            Object.keys(templateForm).map(key => [key, "info"])
        ) as InputColorState
    };
    // State to manage form
    const [alert, setAlert] = useState<FormProps>(templateForm);
    const [formEntries, setFormEntries] = useState<FormProps>(templateForm);
    const [inputColors, setInputColors] = useState<InputColorState>(initialInputColors);
    const [error, setError] = useState({visible: false, value:''});
    // FUNCTIONS
    // Submit form to API
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: User = {
            name: formEntries.username || 'none',
            email: formEntries.email || 'none',
            password: formEntries.password || 'none',
            phone: formEntries.phone || 'none',
            address: formEntries.address
        }
        AuthService.register(user)
            .then(() => {
                setFormEntries(prev => ({
                    ...prev,
                    ...templateForm
                }));
            })
            .catch(error => {
                setError(prev => ({
                    ...prev,
                    value: error,
                    visible: true
                }));
            });
    };
    // Define the function to handle input blur event
    const handleInputBlur = (field: keyof FormProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputColors(prev => ({
            ...prev,
            [field]: value.trim().length === 0 ? "failure" : prev[field]
        }));
        // Reset the alert message if the field is not empty
        setAlert(prev => ({
            ...prev,
            [field]: value.trim().length === 0 ? `The ${field} field is required.` : prev[field]
        }));
    };
    // Define the function to handle input change event
    const handleInputChange = (field: keyof FormProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // assess the entry values
        const assessPW: boolean = field === "confirmPassword" && value !== formEntries.password;
        const assessPhone: boolean = field === "phone" && /[^0-9+]/.test(value);
        // Use of hooks
        setInputColors(prev => ({
            ...prev,
            [field]: assessPW || assessPhone ? "failure" : "info"
        }));
        setAlert(prev => ({
            ...prev,
            [field]: assessPW ? "Passwords do not match." : (
                    assessPhone ? "Phone number can only contain digits and '+' sign." : ''
                )
        }));
        setFormEntries(prevA => ({
            ...prevA,
            [field]: value.trim()
        }));
    };
    // search required value
    const valueRequire = (entry: EntryProps): TextInputProps => {
        return (!entry.label.includes("*")) ? {id:entry.label,value: formEntries[entry.id],...entry.inputProps} : {
                            id:entry.id,
                            value: formEntries[entry.id],
                            onChange:handleInputChange(entry.id),
                            onBlur:handleInputBlur(entry.id),
                            ...entry.inputProps
                        };
    };
    // List of form entries
    /**
     * If we want to assign a required value, we must put a (*) in the "label" object.
     */
    const entries: EntryProps[] = [
        {
            id: "username",
            label: "Your name *",
            inputProps: {
                color: inputColors.username,
                type: "text",
                placeholder: "John Doe"
            },
            alert:alert.username
        },
        {
            id: "email",
            label: "Email *",
            inputProps: {
                color:inputColors.email,
                type: "email",
                placeholder: "John@email.com",
            },
            alert:alert.email
        },
        {
            id: "password",
            label: "Password *",
            inputProps: {
                color:inputColors.password,
                type: "password",
                placeholder: "••••••••",
            },
            alert:alert.password
        },
        {
            id: "confirmPassword",
            label: "Confirm Password *",
            inputProps: {
                color:inputColors.confirmPassword,
                type: "password",
                placeholder: "••••••••",
            },
            alert:alert.confirmPassword
        },
        {
            id: "phone",
            label: "Phone Number *",
            inputProps: {
                color:inputColors.phone,
                type: "tel",
                placeholder: "+1234567890"
            },
            alert:alert.phone
        },
        {
            id: "address",
            label: "Address",
            inputProps: {
                color:inputColors.address,
                type: "text",
                placeholder: "123 Main St, City, Country"
            },
            alert:alert.address
        }
    ];
    // Render the form with entries
    return (
        <>
            <form className="flex flex-col gap-0.5" onSubmit={e => handleSubmit(e)}>
                {entries.map((entry, index) => (
                    <Entry 
                        label={entry.label}
                        key={index}
                        inputProps={valueRequire(entry)}
                        alert={entry.alert}
                    />
                ))}
                <Buttons type="submit" className='text-xl'>Submit</Buttons>
                <Alerts variant='error' visible={error.visible} className='fixed bottom-3 text-center'>
                    {error.value}
                </Alerts>
            </form>
        </>
    );
}