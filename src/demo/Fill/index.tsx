import {
    memo,
    isValidElement,
    cloneElement,
    Children,
    ChangeEvent,
    useState,
    useCallback,
    useMemo,
} from 'react';
import { FillGraphProps } from './interfaces';

function FillGraph({
    initialValue = 50,
    min = 0,
    max = 100,
    step = 1,
    width = 300,
    height = 100,
    fillMultiplier = 3,
    backgroundColor = '#E8EBF9',
    foregroundColor = '#424E82',
    showSlider = true,
    onChange,
    children,
    viewBox,
}: FillGraphProps) {
    const [value, setValue] = useState<number>(initialValue);

    const onInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseInt(e.target.value, 10);
            setValue(newValue);
            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange]
    );

    const clipWidth = value * fillMultiplier;

    const renderChildrenWithFill = useCallback(
        (fill: string) => {
            return Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...(child.props as any),
                        fill,
                    });
                }
                return child;
            });
        },
        [children]
    );

    const backgroundGroup = useMemo(
        () => <g id="background">{renderChildrenWithFill(backgroundColor)}</g>,
        [renderChildrenWithFill, backgroundColor]
    );

    const foregroundGroup = useMemo(
        () => (
            <g id="foreground" clipPath="url(#fillClip)">
                {renderChildrenWithFill(foregroundColor)}
            </g>
        ),
        [renderChildrenWithFill, foregroundColor]
    );

    return (
        <div>
            <svg
                width={width}
                height={height}
                viewBox={viewBox || `0 0 ${width} ${height}`}
            >
                {backgroundGroup}
                {foregroundGroup}
                <defs>
                    <clipPath id="fillClip">
                        <rect x="0" y="0" width={clipWidth} height={height} />
                    </clipPath>
                </defs>
            </svg>
            {showSlider && (
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={onInputChange}
                    style={{ width }}
                />
            )}
        </div>
    );
}

export default memo(FillGraph);
