import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    userIsAuth,
    redirectUrl,
    render: Component,
    ...rest
}: {
    userIsAuth: boolean;
    redirectUrl: string;
    render: any;
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                userIsAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectUrl} />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    redirectUrl: PropTypes.string,
    userIsAuth: PropTypes.bool,
    render: PropTypes.any.isRequired,
};

PrivateRoute.defaultProps = {
    redirectUrl: '/',
    userIsAuth: false,
};

export default PrivateRoute;
