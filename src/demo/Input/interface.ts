import { type ComponentProps } from 'react';

interface CommonProps
    extends Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'className'> {
    value: string;
    onChange: (val: string) => void;
    id: string;
    errorElementId?: string;
}

export type TextInputLabelProps = CommonProps & {
    label: string;
    direction?: 'row' | 'column';
    classNames?: {
        root?: string;
        input?: string;
    };
};

export type TextInputProps = CommonProps & {
    classNames?: {
        input?: string;
    };
};
