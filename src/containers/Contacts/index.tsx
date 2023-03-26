import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Contacts = (props: any) => {
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h1">Нашы кантакты</Typography>{' '}
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <ListItemText
                        primary="Email"
                        secondary={
                            <a
                                target={'_blank'}
                                href="mailto:goman.live.service@gmail.com"
                            >
                                goman.live.service@gmail.com
                            </a>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Тэлеграм"
                        secondary={
                            <a
                                target={'_blank'}
                                href="https://t.me/bel_frontend"
                            >
                                Беларускі франтэнд ды іншая трасца
                            </a>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Тэхнічныя памылкі дасылайце:"
                        secondary={
                            <a
                                target={'_blank'}
                                href="https://github.com/bel-frontend/bel-frontend.github.io/issues"
                            >
                                Наш гітхаб
                            </a>
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    );
};

Contacts.propTypes = {};

export default Contacts;
