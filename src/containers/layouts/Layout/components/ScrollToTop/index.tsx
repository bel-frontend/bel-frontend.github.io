import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';

const BUTTON_HEIGHT = 40;
const WIDTH_TABLET = 768;
const WIDTH_DESKTOP = 992;
const MIN_SCROLL_Y_MOBILE = 370;
const MIN_SCROLL_Y_TABLET = 560;
const MIN_SCROLL_Y_DESKTOP = 460;

export const ScrollToTop = () => {
    const [showButton, setShowButton] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            const width = window.outerWidth;
            const height = window.scrollY;

            const isShowButtonMobile =
              width < WIDTH_TABLET &&
              height >= MIN_SCROLL_Y_MOBILE + BUTTON_HEIGHT;
            const isShowButtonTablet =
              width <= WIDTH_DESKTOP &&
              width >= WIDTH_TABLET &&
              height >= MIN_SCROLL_Y_TABLET + BUTTON_HEIGHT;
            const isShowButtonDesktop =
              width >= WIDTH_DESKTOP &&
              height >= MIN_SCROLL_Y_DESKTOP + BUTTON_HEIGHT;

            const isShowButton =
                isShowButtonMobile || isShowButtonTablet || isShowButtonDesktop;

            setShowButton(isShowButton);
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
            className={classnames('btn', 'btn-primary', style.scrollToTopBtn)}
        >
            <span className={style.arrowUp} />
        </button>
    ) : null;
};
