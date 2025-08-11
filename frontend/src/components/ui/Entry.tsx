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
export const Entry = ({ label, labelProps, inputProps, alert, alertProps }: EntryProps): JSX.Element => {
    return (
        <div>
            <Label {...labelProps}>{label}</Label>
            <TextInput {...inputProps}/>
            <HelperText {...alertProps}>
                {alert}
            </HelperText>
        </div>
    );
}