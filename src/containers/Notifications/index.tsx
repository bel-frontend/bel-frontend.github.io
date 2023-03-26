import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import React, { Fragment } from 'react';
import { Snackbar } from 'components';
import { notificationSelector, hideNotification } from 'modules/notification';

const Notifications = ({ ...props }) => {
    const { children, notificationStatus, hideNotification } = props;
    const { show, type, message, place } = notificationStatus;
    return (
        <Fragment>
            {children}
            <Snackbar
                place={place}
                type={type}
                message={message}
                open={show}
                closeNotification={hideNotification}
                close
            />
        </Fragment>
    );
};

Notifications.propTypes = {
    children: PropTypes.any,
    notificationStatus: PropTypes.shape({
        show: PropTypes.bool,
        type: PropTypes.string,
        message: PropTypes.string,
        place: PropTypes.string,
    }),
    hideNotification: PropTypes.func,
};

const mapStateToProps = (state: any) => ({
    notificationStatus: notificationSelector(state),
});
const mapDispatchToProps = (dispatch: any) => ({
    hideNotification: bindActionCreators(hideNotification, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
