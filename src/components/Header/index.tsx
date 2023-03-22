import React from 'react';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import { searchArticle } from 'modules/artickles';
import { useDispatch } from 'react-redux';
import style from './style.module.scss';

export const Header = ({
    userIsAuth,
    isMobile,
    history,
    location: { search },
}: any) => {
    const dispatch = useDispatch();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    // const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [searchText, setSearchText] = React.useState<string | null>('');

    React.useEffect(() => {
        const query = new URLSearchParams(search);
        const text = query.get('seacrhText');
        dispatch(searchArticle(text));
        setSearchText(text || '');
    }, [search]);

    const onClick = () => {
        history.push(`/`);
        if (searchText) {
            history.push(`?seacrhText=${searchText}`);
        }
    };

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
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    {/* <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge> */}
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    {/* <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge> */}
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem> */}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, mb: 3 }}>
            <AppBar color="primary" position="static">
                <Container maxWidth="md" disableGutters>
                    <Toolbar>
                        <Box
                            className={isMobile ? style.mobileLogo : style.logo}
                            onClick={() => history.push('/')}
                        ></Box>
                        <TextField
                            value={searchText}
                            onChange={(ev) => {
                                setSearchText(ev?.target?.value);
                            }}
                            size="small"
                            sx={{
                                m: 1,
                                ml: 2,
                                width: '15vw',
                                minWidth: isMobile ? '200px' : '240px',
                            }}
                            InputProps={{
                                style: {
                                    backgroundColor: '#fff',
                                },
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={onClick}
                                            color="inherit"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {userIsAuth ? (
                                <>
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={() => history.push('/login')}
                                    >
                                        Увайсці
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={() =>
                                            history.push('/register')
                                        }
                                    >
                                        Стварыць акаунт
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
        </Box>
    );
};
