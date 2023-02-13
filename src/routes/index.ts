import { Home } from 'containers/Home';
import { Article } from 'containers/Article';

export const redirectAuthPath = '/';

export interface RouteItemInterface {
    path: string;
    exact: boolean;
    component: any;
    showHeader?: boolean;
    isPrivate?: boolean;
}

const mainRoutes: RouteItemInterface[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        showHeader: true,
        // showSidebar: false,
        // layout: LayoutEmpty,
    },
    {
        path: '/article/:id',
        exact: true,
        component: Article,
        showHeader: true,
        // showSidebar: false,
        // layout: LayoutEmpty,
    },
];

export default mainRoutes;
