import React from 'react';
import classnames from 'classnames';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import style from './style.module.scss';

type ScrollToTopPropsType = {
    isArticlePage?: boolean;
    viewPort: any;
};
export const ScrollToTop: React.FC<ScrollToTopPropsType> = ({ viewPort }) => {
    const [showButton, setShowButton] = React.useState(true);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return showButton ? (
        <IconButton
            onClick={scrollToTop}
            className={classnames(style.scrollToTopBtn)}
        >
            <ArrowUpwardIcon />
        </IconButton>
    ) : null;
};
