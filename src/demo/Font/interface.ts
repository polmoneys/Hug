import { type AriaAttributes, type ReactNode } from 'react';
import { sizes, Unit } from '../../Hug/interfaces';

type FontKind =
    | 'grotesk'
    | 'poppins-light'
    | 'poppins-medium'
    | 'poppins-medium-italic'
    | 'poppins-semibold';

type HTMLHnTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HTMLtag = 'label' | 'span' | 'p' | 'b' | 'em' | 'strong' | 'time';

type FontSize = (typeof sizes)[number];
type Option =
    | 'AA'
    | 'Aa'
    | 'date'
    | 'hyphenate'
    // user-select:none
    | 'inert'
    | 'breakWord'
    | 'maskX'
    | 'maskY'
    | 'number';

export interface FontProps extends AriaAttributes {
    as?: HTMLtag | HTMLHnTag;
    size?: FontSize;
    children: string | number | ReactNode;
    className?: string;
    options?: Array<Option>;
    dangerousColor?: string;
    dangerousTransform?: string;
    kind?: FontKind;
    clamp?: number;
    inherit?: boolean;
    dangerousStyles?: Record<string, Unit>;
}

export type TruncateFileProps = {
    extension: string;
    children: string;
};
