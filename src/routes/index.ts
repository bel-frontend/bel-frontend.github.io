import { Home } from 'containers/Home';

export const redirectAuthPath = '/';

const mainRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
        showHeader: true,
        // showSidebar: false,
        // layout: LayoutEmpty,
    },
];

export default mainRoutes;
