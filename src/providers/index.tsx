import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/modules/store/clientStore';
import ThemeRegistryProvider from './ThemeRegistry';
import { useDispatch } from 'react-redux';
import { initDataAction } from '@/modules/init';

export const ThemeRegistry = ThemeRegistryProvider;

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export const InitProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(initDataAction());
    }, []);
    return <>{children}</>;
};
