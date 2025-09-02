import type { JSX } from 'react';
import type { ButtonProps } from 'flowbite-react';
import { Button } from 'flowbite-react';

// Entry component
export const Buttons = ({ className, children, ...props }: ButtonProps): JSX.Element => {
    return (
        <Button className={`bg-primary-900 hover:bg-primary-800 text-white ${className}`} {...props}>
            {children}
        </Button>
    );
}