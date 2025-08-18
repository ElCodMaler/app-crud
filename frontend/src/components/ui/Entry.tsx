import type { JSX } from 'react';
import type { LabelProps, TextInputProps, HelperTextProps } from 'flowbite-react';
import { HelperText, Label, TextInput } from 'flowbite-react';

type EntryProps = {
    label?: string;
    labelProps?: LabelProps;
    inputProps?: TextInputProps;
    alert?: JSX.Element | string;
    alertProps?: HelperTextProps;
}

// Entry component
export const Entry = ({ label, inputProps, alert }: EntryProps): JSX.Element => {
    return (
        <div className='mb-3'>
            <Label className="text-[16px] font-medium text-white">{label}</Label>
            <TextInput {...inputProps}/>
            <HelperText color='failure' className='mt-0.5 text-sm'>
                {alert}
            </HelperText>
        </div>
    );
}