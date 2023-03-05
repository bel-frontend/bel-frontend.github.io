import * as React from 'react';
import Box from '@mui/material/Box';
import DrawerDFT from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

import { useDispatch } from 'react-redux';

import { logoutAction } from 'modules/auth';
import style from './style.module.scss';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const Drawer = ({
    history,
    userIsAuth,
}: {
    userIsAuth: boolean;
    history: any;
}) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };
    const dispatch = useDispatch();

    const items = [
        {
            text: 'Дадаць новы артыкул',
            icon: <AddIcon />,
            onClick: () => {
                history.push('/editor/add');
            },
        },
        {
            text: 'Выйсці',
            icon: <ExitToAppIcon />,
            onClick: () => {
                dispatch(logoutAction());
            },
        },
    ];

    const list = (anchor: Anchor, items: any[]) => (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {items.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    const anchor = 'left';
    return userIsAuth ? (
        <>
            <IconButton
                color="primary"
                size="large"
                className={style.button}
                onClick={toggleDrawer(anchor, true)}
            >
                <MenuIcon />
            </IconButton>
            <DrawerDFT
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor, items)}
            </DrawerDFT>
        </>
    ) : null;
};
