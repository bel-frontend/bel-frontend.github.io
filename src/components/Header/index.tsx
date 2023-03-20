import React from 'react';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Clear from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { searchArticle } from 'modules/artickles';
import { useDispatch } from 'react-redux';
import style from './style.module.scss';

export const Header = ({ userIsAuth, history, location: { search } }: any) => {
    const dispatch = useDispatch();

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

    return (
        <Box sx={{ flexGrow: 1, mb: 3 }}>
            <AppBar color="primary" position="static">
                <Container maxWidth="md" disableGutters>
                    <Toolbar>
                        <Box
                            className={style.logo}
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
                                minWidth: '240px',
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
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};
