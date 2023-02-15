import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';

export const ScrollToTop = () => {
    const [showButton, setShowButton] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return showButton ? (
        <button
            onClick={scrollToTop}
            className={classnames(style.scrollToTop, 'btn btn-primary')}
        >
            <span className="bi bi-caret-up-fill"></span>
        </button>
    ) : null;
};
