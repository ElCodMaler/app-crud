import type { JSX } from 'react';
import type { LabelProps, TextInputProps } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';

type EntryProps = {
    label?: string;
    labelProps?: LabelProps;
    inputProps?: TextInputProps;
}

// Entry component
export const Entry = ({ label, labelProps, inputProps }: EntryProps): JSX.Element => {
    return (
        <>
            <div className="mb-2 block">
                <Label {...labelProps}>{label}</Label>
            </div>
            <TextInput {...inputProps}/>
        </>
    );
}