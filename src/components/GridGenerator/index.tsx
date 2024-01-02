import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

export * from './Cell';

type CoordsType = {
    col: number;
    row: number;
};

const parseArr = (start: CoordsType, end: CoordsType) => {
    const arr = [];
    for (
        let i = start.col < end.col ? start.col : end.col;
        i <= (start.col < end.col ? end.col : start.col);
        i++
    ) {
        for (
            let j = start.row < end.row ? start.row : end.row;
            j <= (start.row < end.row ? end.row : start.row);
            j++
        ) {
            arr.push({ col: i, row: j });
        }
    }
    return arr;
};

const Grid = ({
    rows = 5,
    verticalSize = 1,
    cols = 5,
    children = '',
    className = '',
    rowSize = '1fr',
    colSize = '1fr',
    gap = [0, 0],
    style = {},
}: {
    rows?: number;
    verticalSize?: number;
    cols?: number;
    gap?: number[];
    children?: React.ReactNode | string;
    style?: any;
    rowSize?: string;
    colSize?: string;
    className?: string;
}) => {
    return (
        <div
            className={[styles.gridContainer, className].join(' ')}
            style={{
                'grid-template-columns': `repeat(${cols}, ${colSize})`,
                'grid-template-rows': `repeat(${
                    rows * verticalSize
                }, ${rowSize})`,
                gap: `${gap[0]}px ${gap[1]}px`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const GridGenerator = Grid;
