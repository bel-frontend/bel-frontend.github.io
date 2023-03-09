import { lazy } from 'react';

const Home = lazy(() => import('containers/Home'));
const Article = lazy(() => import('containers/Article'));
const Editor = lazy(() => import('containers/Editor'));
const Auth = lazy(() => import('containers/Auth/Auth'));
const SignUp = lazy(() => import('containers/Auth/SignUp'));
const EmptyLayout = lazy(() => import('containers/layouts/EmptyLayout'));

export const redirectAuthPath = '/login';

export interface RouteItemInterface {
    path: string;
    exact: boolean;
    component: any;
    showHeader?: boolean;
    showFooter?: boolean;
    isPrivate?: boolean;
    layout?: any;
}

const mainRoutes: RouteItemInterface[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        showHeader: true,
    },
    {
        path: '/article/:id',
        exact: true,
        component: Article,
        showHeader: true,
    },
    {
        path: '/login',
        exact: true,
        component: Auth,
        showHeader: false,
        showFooter: false,
        layout: EmptyLayout,
    },
    {
        path: '/register',
        exact: true,
        component: SignUp,
        showHeader: false,
        showFooter: false,
        layout: EmptyLayout,
    },
    {
        path: '/editor/:id',
        exact: true,
        component: Editor,
        showHeader: false,
        isPrivate: true,
        layout: EmptyLayout,
    },
];

export default mainRoutes;
