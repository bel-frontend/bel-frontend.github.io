import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Snack from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// @mui/icons-material
import Close from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
// core components

export const Snackbar = ({ ...props }: { type: any; [key: string]: any }) => {
    const {
        classes = {},
        message = '',
        color,
        close,
        icon,
        place,
        open,
        rtlActive,
        type,
    } = props;
    var action: any = [];
    const messageClasses = classNames({
        [classes.iconMessage]: icon !== undefined,
    });
    if (close !== undefined) {
        action = [
            <IconButton
                className={classes.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => props.closeNotification()}
                size="large"
            >
                <Close className={classes.close} />
            </IconButton>,
        ];
    }
    return (
        <Snack
            anchorOrigin={{
                vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
                horizontal:
                    place.indexOf('l') !== -1
                        ? 'left'
                        : place.indexOf('c') !== -1
                        ? 'center'
                        : 'right',
            }}
            open={open}
            message={
                <div>
                    {icon !== undefined ? (
                        <props.icon className={classes.icon} />
                    ) : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            action={action}
        >
            <MuiAlert elevation={6} variant="filled" severity={type}>
                {message}
            </MuiAlert>
        </Snack>
    );
};

Snackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
    close: PropTypes.bool,
    icon: PropTypes.object,
    place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
    open: PropTypes.bool,
    rtlActive: PropTypes.bool,
    closeNotification: PropTypes.func,
};
