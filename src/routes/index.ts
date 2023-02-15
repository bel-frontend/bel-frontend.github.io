import { Home } from 'containers/Home';
import { Article } from 'containers/Article';
import { Editor } from 'containers/Editor';
import { EmptyLayout } from 'containers/layouts/EmptyLayout';

export const redirectAuthPath = '/';

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
    {
        path: '/editor/:id',
        exact: true,
        component: Editor,
        showHeader: false,
        // showSidebar: false,
        layout: EmptyLayout,
    },
];

export default mainRoutes;
