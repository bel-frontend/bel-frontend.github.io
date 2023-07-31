import { lazy } from 'react';

const Home = lazy(() => import('containers/Home'));
const Article = lazy(() => import('containers/Article'));
const Editor = lazy(() => import('containers/Editor'));
const Auth = lazy(() => import('containers/Auth/Auth'));
const SignUp = lazy(() => import('containers/Auth/SignUp'));
const NotFound = lazy(() => import('containers/NotFound'));
const EmptyLayout = lazy(() => import('containers/layouts/EmptyLayout'));
const ProFile = lazy(() => import('containers/Profile'));
const Contacts = lazy(() => import('containers/Contacts'));
const BecomeAuthor = lazy(() => import('containers/BecomeAuthor'));

export const redirectAuthPath = '/login';

export interface RouteItemInterface {
    path: string;
    exact: boolean;
    component: any;
    showHeader?: boolean;
    showFooter?: boolean;
    isPrivate?: boolean;
    layout?: any;
    maxWidth?: 'mg' | 'lg' | 'xl';
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
        layout: EmptyLayout,
    },
    {
        path: '/register',
        exact: true,
        component: SignUp,
        showHeader: false,
        layout: EmptyLayout,
    },
    {
        path: '/editor/:id',
        exact: true,
        component: Editor,
        showHeader: true,
        isPrivate: true,
        maxWidth: 'xl',
    },
    {
        path: '/profile',
        exact: true,
        component: ProFile,
        showHeader: true,
        isPrivate: true,
    },
    {
        path: '/contacts',
        exact: true,
        component: Contacts,
        showHeader: true,
        isPrivate: false,
    },
    {
        path: '/become_author',
        exact: true,
        component: BecomeAuthor,
        showHeader: true,
        isPrivate: false,
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
        showHeader: false,
        showFooter: false,
        layout: EmptyLayout,
    },
];

export default mainRoutes;
