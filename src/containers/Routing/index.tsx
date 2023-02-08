import React from 'react';
import { Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from 'modules/history';
import { Layout } from 'containers/layouts/Layout';
import { RouteItemInterface } from 'routes';

// import PrivateRoute from './PrivateRoute';
// import ErrorPage from '../ErrorPage';

// TODO: need  create not found component and  add to route 404

/**
 * [RenderLayout description]
 * @param {[type]} [layout=Layout] [get layout element for wrap  components in routes]
 * @param {[type]} route           [route data used for check private routes, and redirect]
 * @param {[type]} component       [component for render in route]
 */
const RenderLayout = ({ layout = Layout, ...route }, component: any) => {
    return (props: any) => {
        return layout
            ? React.createElement(layout, {
                  ...{ children: component },
                  ...props,
                  history,
                  ...{ route: route },
              })
            : React.createElement(component, {
                  ...props,
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
}: {
    redirectUrl?: string;
    routes: RouteItemInterface[];
}) => {
    return (
        <Router history={history}>
            <Suspense fallback={<div />}>
                <Switch>
                    {routes.map(({ component, ...route }, index) => {
                        return route.isPrivate ? null : (
                            // <PrivateRoute
                            //     key={`router_key_${index}`}
                            //     userIsAuth={userIsAuth}
                            //     redirectUrl={redirectUrl}
                            //     {...route}
                            //     render={RenderLayout(
                            //         { ...route, userIsAuth, viewPort },
                            //         component,
                            //     )}
                            // />
                            <Route
                                key={`router_key_${index}`}
                                {...route}
                                render={RenderLayout({ ...route }, component)}
                            />
                        );
                    })}
                    <Route
                        render={RenderLayout(
                            {
                                exact: true,
                                isPrivate: false,
                                showHeader: false,
                                showFooter: false,
                            },
                            () =>
                                // <ErrorPage history={history} />
                                null,
                        )}
                    />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routing;
