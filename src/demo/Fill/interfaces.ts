import { ReactElement } from 'react';

export interface FillGraphProps {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    width?: number;
    height?: number;
    /**
     * Multiplier for the fill value to compute the clip width.
     * For example, if each unit equals 3 pixels, then value 50 gives a clip width of 150.
     */
    fillMultiplier?: number;
    backgroundColor?: string;
    foregroundColor?: string;
    showSlider?: boolean;
    onChange?: (value: number) => void;
    children: ReactElement;
    viewBox?: string;
}
