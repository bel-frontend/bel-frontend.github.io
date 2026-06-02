import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Link, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { ReactNode } from 'react';

type AppLinkProps = Omit<MuiLinkProps, 'href' | 'component'> &
    NextLinkProps & {
        children: ReactNode;
    };

export const AppLink = ({ children, ...props }: AppLinkProps) => {
    return (
        <Link component={NextLink} underline="hover" {...props}>
            {children}
        </Link>
    );
};
