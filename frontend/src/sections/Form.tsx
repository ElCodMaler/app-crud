import type { TextInputProps } from 'flowbite-react';
import type { JSX, FC } from 'react';
import type { EntryProps, FormProps, User, PropAlert } from '../types';
import { useState, useEffect } from 'react';
import { Entry, Buttons } from '../components';
import { AuthService } from '../services/api';
// type
type InputColorState = Record<keyof FormProps, "info" | "success" | "failure">;
// inferfacer
interface PropsTable{
    user: User | undefined;
    setAlert: React.Dispatch<React.SetStateAction<PropAlert | undefined>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
// Element JSX (Form)
export const Form:FC<PropsTable> = ({ user, setAlert, setUser }): JSX.Element => {
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
    const [alert, setEntryAlert] = useState<FormProps>(templateForm);
    const [formEntries, setFormEntries] = useState<FormProps>(templateForm);
    const [inputColors, setInputColors] = useState<InputColorState>(initialInputColors);
    // FUNCTIONS
    // Submit form to API
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userForm: User = {
            id: user?.id,
            name: formEntries.username || 'none',
            email: formEntries.email || 'none',
            password: formEntries.password || 'none',
            phone: formEntries.phone || 'none',
            address: formEntries.address || 'none'
        }
        if(!user){
            AuthService.register(userForm)
                .then(res => {
                    setFormEntries(prev => ({
                        ...prev,
                        ...templateForm
                    }));
                    setAlert({
                        typeAlert:'success',
                        message:res.message || 'none'
                    })
                })
                .catch(error => {
                    setAlert({
                        typeAlert:'failure',
                        message:error.message
                    })
                });
        } else {
            // en este caso estariamos en modo actualizacion
            AuthService.update(userForm)
                .then(res => {
                    setAlert({
                        typeAlert:'success',
                        message:res.message || 'I don`t know'
                    })
                })
                .catch(error => {
                    setAlert({
                        typeAlert:'failure',
                        message:error
                    })
                });
            // limpiar entradas
            setUser(undefined);
            setFormEntries(templateForm);
        }
    };
    // Define the function to handle input blur event
    const handleInputBlur = (field: keyof FormProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputColors(prev => ({
            ...prev,
            [field]: value.trim().length === 0 ? "failure" : prev[field]
        }));
        // Reset the alert message if the field is not empty
        setEntryAlert(prev => ({
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
        setEntryAlert(prev => ({
            ...prev,
            [field]: assessPW ? "Passwords do not match." : (
                    assessPhone ? "Phone number can only contain digits and '+' sign." : ''
                )
        }));
        setFormEntries(prevA => ({
            ...prevA,
            [field]: value
        }));
    };
    // search required value
    const valueRequire = (entry: EntryProps): TextInputProps => {
        return ({
                    id:entry.id,
                    value: formEntries[entry.id],
                    onChange:handleInputChange(entry.id),
                    onBlur: entry.label.includes("*") ? handleInputBlur(entry.id) : ()=>{},
                    ...entry.inputProps
                });
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
    //vulue event
    useEffect(() => {
        if(user){
            setFormEntries(prev => ({
                ...prev,
                username:user.name,
                email:user.email,
                phone:user.phone,
                password:user.password,
                confirmPassword:user.password,
                address:user.address || ''
            }));
        }
    },[]);
    // RENDERING
    return (
        <section className='flex items-center gap-3'>
            <article className='row-auto w-1/2 text-center items-center'>
                <h1 className='text-5xl bg-secondary-400 shadow-2xl border border-primary-900 rounded-3xl py-6'>
                    C R U D
                </h1>
                <p className='mt-4'>
                    Fill out the form and then press the submit button 
                    to send the data to your local database.
                </p>
                {user ? <p className='mt-7'>(User to update)</p> : ''}
                {user ? <Buttons className='text-xl cursor-pointer mx-auto' onClick={e=>{
                    e.preventDefault();
                    setUser(undefined);
                    setFormEntries(templateForm);
                }}>not Update</Buttons> : ''}
            </article>
            <form className="row-auto w-1/2 gap-0.5" onSubmit={e => handleSubmit(e)}>
                {entries.map((entry, index) => (
                    <Entry 
                        label={entry.label}
                        key={index}
                        inputProps={valueRequire(entry)}
                        alert={entry.alert}
                    />
                ))}
                <Buttons type="submit" className='text-xl cursor-pointer'>Submit</Buttons>
            </form>
        </section>
    );
}