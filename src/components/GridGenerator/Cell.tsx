import React from 'react';
import PropTypes from 'prop-types';

export const Cell = ({
    row,
    col,
    colSpan = 1,
    rowSpan = 1,
    children,
    ...props
}: {
    row: number;

    col: number;
    colSpan?: number;
    rowSpan?: number;
    children?: React.ReactNode;
}) => {
    const gridArea = `${row + 1} / ${col + 1} / ${rowSpan + row + 1} / ${
        colSpan + col + 1
    }`;

    return (
        <div style={{ gridArea: gridArea }} {...props}>
            {children}
        </div>
    );
};
