import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';

type ScrollToTopPropsType = {
    isArticlePage?: boolean;
};
export const ScrollToTop: React.FC<ScrollToTopPropsType> = ({
    isArticlePage,
}) => {
    const [showButton, setShowButton] = React.useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return showButton ? (
        <button
            onClick={scrollToTop}
            className={classnames('btn', 'btn-primary', style.scrollToTopBtn)}
        >
            <span className={style.arrowUp} />
        </button>
    ) : null;
};
