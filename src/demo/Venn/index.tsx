import React from 'react';

interface CircleProps {
    cx?: number;
    cy?: number;
    r?: number;
    fill?: string;
    stroke?: string;
    label?: string;
    labelX?: number;
    labelY?: number;
}

interface IntersectionProps {
    fill?: string;
    stroke?: string;
    label?: string;
    labelX?: number;
    labelY?: number;
}

interface VennDiagramProps {
    width?: number;
    height?: number;
    circleA?: CircleProps;
    circleB?: CircleProps;
    intersection?: IntersectionProps;
}

const VennDiagram: React.FC<VennDiagramProps> = ({
    width = 300,
    height = 150,
    circleA = {},
    circleB = {},
    intersection = {},
}) => {
    // Default radius for circles
    const defaultRadius = 50;

    // Define Circle A defaults
    const cxA = circleA.cx !== undefined ? circleA.cx : width / 3;
    const cyA = circleA.cy !== undefined ? circleA.cy : height / 2;
    const rA = circleA.r !== undefined ? circleA.r : defaultRadius;

    // Define Circle B defaults (positioned to ensure overlap)
    const cxB = circleB.cx !== undefined ? circleB.cx : (2 * width) / 3;
    const cyB = circleB.cy !== undefined ? circleB.cy : height / 2;
    const rB = circleB.r !== undefined ? circleB.r : defaultRadius;

    // Calculate distance between the centers
    const dx = cxB - cxA;
    const dy = cyB - cyA;
    const d = Math.sqrt(dx * dx + dy * dy);

    // Compute the intersection path only if the circles overlap
    let intersectionPath = '';
    if (d < rA + rB && d > Math.abs(rA - rB)) {
        // Distance from Circle A center to the line joining the intersection points
        const a = (rA * rA - rB * rB + d * d) / (2 * d);
        // Distance from that point to the intersection points
        const h = Math.sqrt(rA * rA - a * a);
        // Midpoint along the line between centers
        const midX = cxA + (a * dx) / d;
        const midY = cyA + (a * dy) / d;
        // Offsets perpendicular to the line
        const rx = -(h * dy) / d;
        const ry = (h * dx) / d;
        // Two intersection points
        const xi1 = midX + rx;
        const yi1 = midY + ry;
        const xi2 = midX - rx;
        const yi2 = midY - ry;

        // Build an SVG path that describes the intersection area:
        // Move to first intersection, arc along Circle A, then arc along Circle B back.
        intersectionPath = `
      M ${xi1} ${yi1}
      A ${rA} ${rA} 0 0 1 ${xi2} ${yi2}
      A ${rB} ${rB} 0 0 1 ${xi1} ${yi1}
      Z
    `;
    }

    return (
        <svg width={width} height={height}>
            <defs>
                {/* Mask for Circle A exclusive area */}
                {intersectionPath && (
                    <mask id="maskA">
                        {/* Full area white */}
                        <rect
                            x="0"
                            y="0"
                            width={width}
                            height={height}
                            fill="white"
                        />
                        {/* Black out the intersection */}
                        <path d={intersectionPath} fill="black" />
                    </mask>
                )}
                {/* Mask for Circle B exclusive area */}
                {intersectionPath && (
                    <mask id="maskB">
                        <rect
                            x="0"
                            y="0"
                            width={width}
                            height={height}
                            fill="white"
                        />
                        <path d={intersectionPath} fill="black" />
                    </mask>
                )}
            </defs>

            {/* Render Circle A exclusive region */}
            {intersectionPath ? (
                <circle
                    cx={cxA}
                    cy={cyA}
                    r={rA}
                    fill={circleA.fill || 'rgba(255,0,0,0.5)'}
                    stroke="none"
                    mask="url(#maskA)"
                />
            ) : (
                <circle
                    cx={cxA}
                    cy={cyA}
                    r={rA}
                    fill={circleA.fill || 'rgba(255,0,0,0.5)'}
                    stroke={circleA.stroke || 'red'}
                />
            )}

            {/* Render Circle B exclusive region */}
            {intersectionPath ? (
                <circle
                    cx={cxB}
                    cy={cyB}
                    r={rB}
                    fill={circleB.fill || 'rgba(0,0,255,0.5)'}
                    stroke="none"
                    mask="url(#maskB)"
                />
            ) : (
                <circle
                    cx={cxB}
                    cy={cyB}
                    r={rB}
                    fill={circleB.fill || 'rgba(0,0,255,0.5)'}
                    stroke={circleB.stroke || 'blue'}
                />
            )}

            {/* Render the intersection area on top if it exists */}
            {intersectionPath && (
                <path
                    d={intersectionPath}
                    fill={intersection.fill || 'purple'}
                    stroke={intersection.stroke || 'purple'}
                />
            )}

            {/* Render circle outlines so the three areas are clearly separated */}
            <circle
                cx={cxA}
                cy={cyA}
                r={rA}
                fill="none"
                stroke={circleA.stroke || 'red'}
            />
            <circle
                cx={cxB}
                cy={cyB}
                r={rB}
                fill="none"
                stroke={circleB.stroke || 'blue'}
            />

            {/* Label for Circle A */}
            {circleA.label && (
                <text
                    x={
                        circleA.labelX !== undefined
                            ? circleA.labelX
                            : cxA - rA / 2
                    }
                    y={
                        circleA.labelY !== undefined
                            ? circleA.labelY
                            : cyA - rA - 5
                    }
                    textAnchor="middle"
                    fill="black"
                >
                    {circleA.label}
                </text>
            )}
            {/* Label for Circle B */}
            {circleB.label && (
                <text
                    x={
                        circleB.labelX !== undefined
                            ? circleB.labelX
                            : cxB + rB / 2
                    }
                    y={
                        circleB.labelY !== undefined
                            ? circleB.labelY
                            : cyB - rB - 5
                    }
                    textAnchor="middle"
                    fill="black"
                >
                    {circleB.label}
                </text>
            )}
            {/* Label for Intersection */}
            {intersection.label && intersectionPath && (
                <text
                    x={
                        intersection.labelX !== undefined
                            ? intersection.labelX
                            : (cxA + cxB) / 2
                    }
                    y={
                        intersection.labelY !== undefined
                            ? intersection.labelY
                            : cyA
                    }
                    textAnchor="middle"
                    fill="black"
                >
                    {intersection.label}
                </text>
            )}
        </svg>
    );
};

export default VennDiagram;
