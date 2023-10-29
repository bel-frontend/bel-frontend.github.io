import React from 'react';
import Background from './Background';

const PopupBackground = ({
    onClick,
    visible = false,
    className,
    children,
    childrenClassName,
}: {
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    visible?: boolean;
    className?: string;
    children: React.ReactNode;
    childrenClassName?: string;
}) => {
    return visible ? (
        <Background
            onClick={onClick}
            className={className}
            childrenClassName={childrenClassName}
        >
            {children}
        </Background>
    ) : null;
};

export default PopupBackground;
