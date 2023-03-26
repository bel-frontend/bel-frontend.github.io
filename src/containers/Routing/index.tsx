import React from 'react';
import { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from 'modules/history';
import { Layout } from 'containers/layouts/Layout';
import { RouteItemInterface } from 'routes';
import PrivateRoute from './PrivateRoute';
import { getViewport as viewPortSelector } from 'modules/viewport';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
// import PrivateRoute from './PrivateRoute';
// import ErrorPage from '../ErrorPage';

/**
 * [RenderLayout description]
 * @param {[type]} [layout=Layout] [get layout element for wrap  components in routes]
 * @param {[type]} route           [route data used for check private routes, and redirect]
 * @param {[type]} component       [component for render in route]
 */
const RenderLayout = (
    { layout = Layout, viewPort, ...route }: any,
    component: any,
) => {
    return (props: any) => {
        return React.createElement(layout, {
            ...{ children: component },
            ...props,
            viewPort,
            history,
            ...{ route: route },
        });
    };
};

/**
 * [Routing description]
 * @param {[type]} redirectUrl [use for redirect  if user hasn't permission (not auth)]
 * @param {[type]} userIsAuth  [state user]
 * @param {[type]} routes      [array routes]
 * @param {[type]} props       [another props for  pass to children]
 */
const Routing = ({
    redirectUrl,
    routes,
    userIsAuth,
}: {
    redirectUrl?: string;
    routes: RouteItemInterface[];
    userIsAuth: boolean;
}) => {
    const viewPort = useSelector(viewPortSelector);
    return (
        <Router history={history}>
            <Suspense fallback={<LinearProgress color="primary" />}>
                <Switch>
                    {routes.map(({ component, ...route }, index) => {
                        return route.isPrivate ? (
                            <PrivateRoute
                                key={`router_key_${index}`}
                                userIsAuth={userIsAuth}
                                redirectUrl={redirectUrl}
                                {...route}
                                render={RenderLayout(
                                    { ...route, userIsAuth, viewPort },
                                    component,
                                )}
                            />
                        ) : (
                            <Route
                                key={`router_key_${index}`}
                                {...route}
                                render={RenderLayout(
                                    { ...route, userIsAuth, viewPort },
                                    component,
                                )}
                            />
                        );
                    })}
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routing;
