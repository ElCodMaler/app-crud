import type { JSX } from 'react';
import { Button } from 'flowbite-react';
import { Entry } from './ui/Entry';

export const Form = (): JSX.Element => {
    return (
        <>
            <form className="flex flex-col gap-4">
                <div>
                    <Entry 
                        label="Your name"
                        labelProps={{ htmlFor: 'name', className: 'text-white' }}
                        inputProps={{
                            type:"text",
                            placeholder:"John Doe",
                            required:true,
                            shadow:true
                        }} 
                    />
                </div>
                <div>
                    <Entry 
                        label="Email"
                        labelProps={{ htmlFor: 'email', className: 'text-white' }}
                        inputProps={{
                            type:"email",
                            placeholder:"name@flowbite.com",
                            required:true,
                            shadow:true
                        }} 
                    />
                </div>
                <div>
                    <Entry 
                        label="Password"
                        labelProps={{ htmlFor: 'password', className: 'text-white' }}
                        inputProps={{
                            type:"password",
                            placeholder:"••••••••",
                            required:true,
                            shadow:true
                        }} 
                    />
                </div>
                <Button type="submit" className='text-xl'>Submit</Button>
            </form>
        </>
    );
}