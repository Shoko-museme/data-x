import React from 'react';
import { Layer, Line } from 'react-konva';

interface GridProps {
    width: number;
    height: number;
    gridSize: number;
}

export const Grid: React.FC<GridProps> = ({ width, height, gridSize }) => {
    const lines = [];
    const stroke = '#e9e9e9'; // Lighter gray for less visible grid lines
    const strokeWidth = 1;

    // Vertical lines
    for (let i = 0; i < width / gridSize; i++) {
        lines.push(
            <Line
                key={`v-${i}`}
                points={[Math.round(i * gridSize) + 0.5, 0, Math.round(i * gridSize) + 0.5, height]}
                stroke={stroke}
                strokeWidth={strokeWidth}
                listening={false}
            />
        );
    }

    // Horizontal lines
    for (let j = 0; j < height / gridSize; j++) {
        lines.push(
            <Line
                key={`h-${j}`}
                points={[0, Math.round(j * gridSize) + 0.5, width, Math.round(j * gridSize) + 0.5]}
                stroke={stroke}
                strokeWidth={strokeWidth}
                listening={false}
            />
        );
    }

    return <Layer name="grid">{lines}</Layer>;
};
