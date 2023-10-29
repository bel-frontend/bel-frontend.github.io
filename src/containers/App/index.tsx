import React, { Fragment } from 'react';
import routes, { redirectAuthPath } from 'routes';
import Routing from 'containers/Routing';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from 'modules/auth';
import Notifications from 'containers/Notifications';
import { CookiesBanner } from 'components/CookiesBanner';
import Popups from 'containers/Popups';

const App = ({ ...props }) => {
    const userIsAuth = useSelector(currentUserIsAuth);

    return (
        <Fragment>
            <CookiesBanner />
            <Routing
                userIsAuth={userIsAuth}
                routes={routes}
                redirectUrl={redirectAuthPath}
            />
            <Notifications />
            <Popups />
        </Fragment>
    );
};

export default App;
