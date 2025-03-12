import { ReactNode } from 'react';
import { HugProps, Unit } from '../../Hug/interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ratios = ['auto', 'square', 'portrait', 'landscape'] as const;
type CardRatios = (typeof ratios)[number];

export default interface CardProps {
    ratio?: CardRatios;
    dangerous?: Record<string, Unit>;
    className?: string;
    children: ReactNode;
}

export interface CardTitleProps extends HugProps {
    icon?: ReactNode;
}
