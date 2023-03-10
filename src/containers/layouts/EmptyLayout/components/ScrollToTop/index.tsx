import React, {useLayoutEffect} from 'react';
import Button from '@mui/material/Button';

import style from './style.module.scss';

export const ScrollToTop = () => {
    const [showButton, setShowButton] = React.useState(false);

    useLayoutEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

        window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return showButton ? (
        <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            style={{
                position: 'sticky',
                top: 'calc(100vh - 53px)',
                left: 'calc(100vw - 72px)',
                zIndex: 3,
                minWidth: '32px',
                height: '32px',
            }}
        >
            <span className={style.arrowUp} />
        </Button>
    ) : null;
};
