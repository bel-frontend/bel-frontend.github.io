import React, { Fragment } from 'react';
import routes, { redirectAuthPath } from 'routes';
import Routing from 'containers/Routing';
// import 'modules/i18next';

const App = ({ ...props }) => {
    return (
        <Fragment>
            <Routing
                userIsAuth
                routes={routes}
                redirectUrl={redirectAuthPath}
            />
        </Fragment>
    );
};

export default App;
