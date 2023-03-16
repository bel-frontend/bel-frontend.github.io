import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Clear from '@mui/icons-material/Clear';

import { searchArticle } from 'modules/artickles';
import { useDispatch } from 'react-redux';

export const Header = function () {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = React.useState<string | null>('');

    React.useEffect(() => {
        dispatch(searchArticle(searchText));
    }, [searchText]);

    const onClick = () => {
        if (searchText) {
            setSearchText('');
        }
    };
    return (
        <Box sx={{ flexGrow: 1, mb: 3 }}>
            <AppBar position="static">
                <Container maxWidth="md" disableGutters>
                    <Toolbar>
                        <Typography variant="h2">BF</Typography>
                        <TextField
                            value={searchText}
                            onChange={(ev) => {
                                setSearchText(ev?.target?.value);
                            }}
                            // variant="filled"
                            size="small"
                            sx={{
                                m: 1,
                                ml: 2,
                                width: '15vw',
                            }}
                            InputProps={{
                                style: { backgroundColor: '#fff' },
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={onClick}>
                                            {searchText ? (
                                                <Clear />
                                            ) : (
                                                <SearchIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            {/* <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton> */}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            {/* <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton> */}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};
