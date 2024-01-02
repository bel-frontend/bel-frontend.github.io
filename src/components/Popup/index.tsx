'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';

import PopupBackground from '../PopupBackground';

import styles from './style.module.scss';

export const Popup = ({ ...props }) => {
    const {
        align = 'left',
        onSubmit,
        onCancel,
        onClear,
        cancelButtonText,
        submitButtonText,
        showPopup,
        children,
        className,
        disableSubmit = false,
        disableCancel = false,
        classes = {},
        confirmButtonProps = {},
        cancelButtonProps = {},
        style,
        showSubmit,
        showCancel,
        showClear = false,
        message = null,
        popupBackgroundsProps,
        title,
        subtitle,
    } = props;
    const handleSubmit = () => {
        onSubmit();
    };
    const handleCancell = () => {
        onCancel();
    };
    const { t } = useTranslation();
    return (
        <PopupBackground
            visible={showPopup}
            onClick={handleCancell}
            childrenClassName={styles.background}
            {...popupBackgroundsProps}
        >
            <Grid
                container
                direction="column"
                className={[styles.container, className, classes.root].join(
                    ' ',
                )}
                style={{ ...style }}
            >
                {showClear && (
                    <Grid item xs={12} className={styles.clear}>
                        <IconButton
                            size="small"
                            className={style.buttonClear}
                            onClick={onClear}
                        >
                            /home/serj/projects/bel-frontend.github.io/src/components/PopupBackground
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                )}

                {title && (
                    <Grid item xs={12} className={styles.titleContainer}>
                        <Typography variant={'h4'} className={styles.title}>
                            {title}
                        </Typography>
                    </Grid>
                )}
                {subtitle && (
                    <Grid item xs={12} className={styles.subtitleContainer}>
                        <Typography
                            variant={'body2'}
                            className={styles.subtitle}
                        >
                            {subtitle}
                        </Typography>
                    </Grid>
                )}

                {message || children ? (
                    <Grid
                        item
                        className={[
                            styles.dataContainer,
                            classes.dataContainer || '',
                        ].join(' ')}
                        xs={12}
                    >
                        {message}
                        {children}
                    </Grid>
                ) : null}
                {(showCancel || showSubmit) && (
                    <Grid
                        item
                        xs={12}
                        className={[
                            align === 'left'
                                ? styles.buttonContainer_left
                                : align === 'center'
                                ? styles.buttonContainer_center
                                : styles.buttonContainer_right,
                            classes.buttonContainer || '',
                        ].join(' ')}
                    >
                        {showCancel && (
                            <Button
                                onClick={handleCancell}
                                className={styles.button}
                                disabled={disableCancel}
                                variant="outlined"
                                fontSize={'0.8rem'}
                                color="primary"
                                fullWidth
                                {...cancelButtonProps}
                            >
                                {cancelButtonText || t('popup.cancel_button')}
                            </Button>
                        )}
                        {showSubmit && (
                            <Button
                                color="primary"
                                onClick={handleSubmit}
                                disabled={disableSubmit}
                                variant="contained"
                                type="submit"
                                fontSize={'0.8rem'}
                                fullWidth
                                className={styles.confirmButton}
                                {...confirmButtonProps}
                            >
                                {submitButtonText || t('popup.ok_button')}
                            </Button>
                        )}
                    </Grid>
                )}
            </Grid>
        </PopupBackground>
    );
};

Popup.propTypes = {
    showPopup: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    cancelButtonText: PropTypes.string,
    submitButtonText: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.shape({
        root: PropTypes.string,
        dataContainer: PropTypes.string,
        buttonContainer: PropTypes.string,
    }),
    confirmButtonClasses: PropTypes.objectOf(PropTypes.object),
    cancelButtonClasses: PropTypes.objectOf(PropTypes.object),
    disableSubmit: PropTypes.bool,
    disableCancel: PropTypes.bool,
    showSubmit: PropTypes.bool,
    showCancel: PropTypes.bool,
    showForce: PropTypes.bool,
    style: PropTypes.object,
    confirmButtonProps: PropTypes.object,
    cancelButtonProps: PropTypes.object,
    childrenContainerClassName: PropTypes.string,
    popupBackgroundsProps: PropTypes.object,
    align: PropTypes.string,
    message: PropTypes.any,
    textError: PropTypes.string,
    textInfo: PropTypes.string,
    showClear: PropTypes.bool,
    onClear: PropTypes.func,
    title: PropTypes.string,
};
Popup.defaultProps = {
    onSubmit: () => {},
    onCancel: () => {},
    onClear: () => {},
    showPopup: true,
    disableSubmit: false,
    disableCancel: false,
    showSubmit: true,
    showCancel: true,
    showForce: false,
    align: 'left',
    confirmButtonProps: {},
    cancelButtonProps: {},
    style: {},
};
