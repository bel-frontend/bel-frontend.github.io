import { Home } from 'containers/Home';
import { Article } from 'containers/Article';
import { Editor } from 'containers/Editor';
import { EmptyLayout } from 'containers/layouts/EmptyLayout';
import Auth from 'containers/Auth/Auth';
import SignUp from 'containers/Auth/SignUp';
export const redirectAuthPath = '/login';

export interface RouteItemInterface {
    path: string;
    exact: boolean;
    component: any;
    showHeader?: boolean;
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
        showHeader: false,
        isPrivate: true,
        layout: EmptyLayout,
    },
];

export default mainRoutes;
