'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

import { logoutAction } from '@/modules/auth';
import style from './style.module.scss';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const Header = ({ userIsAuth, isMobile }: any) => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = useSearchParams();
    const searchParam = searchParams.get('seacrhText');

    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        onSubmit: ({ text }) => {
            router.push(`/?searchText=${text}`);
        },
        initialValues: { text: searchParam },
    });

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {userIsAuth ? null : (
                <>
                    <MenuItem onClick={() => router.push('/login')}>
                        <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                        >
                            <LoginIcon />
                        </IconButton>
                        <p>Увайсці</p>
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/register')}>
                        <IconButton
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <PersonAddIcon />
                        </IconButton>
                        <p>Стварыць акаунт</p>
                    </MenuItem>
                </>
            )}
            {userIsAuth ? (
                <>
                    <MenuItem
                        onClick={() => {
                            router.push('/profile');
                        }}
                    >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Прафайл</p>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            router.push('/editor/add');
                        }}
                    >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <EditIcon />
                        </IconButton>
                        <p>Стварыць артыкул</p>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(logoutAction());
                        }}
                    >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <LogoutIcon />
                        </IconButton>
                        <p>Выйсці</p>
                    </MenuItem>
                </>
            ) : null}
            <MenuItem onClick={() => router.push('/contacts')}>
                <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <AlternateEmailIcon />
                </IconButton>
                <p>Кантакты</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                mb: 3,
                position: 'sticky',
                top: 0,
                zIndex: 3,
                left: 0,
            }}
            component="form"
            onSubmit={handleSubmit}
        >
            <AppBar color="primary" position="static">
                <Container maxWidth="md" disableGutters>
                    <Toolbar>
                        <Box
                            className={isMobile ? style.mobileLogo : style.logo}
                            onClick={() => router.push('/')}
                        ></Box>
                        <TextField
                            value={values.text}
                            onChange={handleChange('text')}
                            size="small"
                            sx={{
                                m: 1,
                                ml: 2,
                                width: '25vw',
                                minWidth: isMobile ? '200px' : '240px',
                            }}
                            InputProps={{
                                style: {
                                    backgroundColor: '#fff',
                                },
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            color="inherit"
                                            type="submit"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
};
