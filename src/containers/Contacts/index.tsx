import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailIcon from '@mui/icons-material/Email';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const contacts = [
    {
        text: 'Email',
        Icon: EmailIcon,
        href: 'mailto:goman.live.service@gmail.com',
        color: '#0081c5',
    },
    {
        text: 'RSS',
        Icon: RssFeedIcon,
        href: 'https://api.bel-frontend.online/rss',
        color: 'rgb(253,102,0)'
    },
    {
        text: 'Тэлеграм',
        Icon: TelegramIcon,
        href: 'https://t.me/bel_frontend',
        color: '#00a8e5',
    },
    {
        text: 'LinkedIn',
        Icon: LinkedInIcon,
        href: 'https://www.linkedin.com/groups/14273255/',
        color: '#0072b0',
    },
    {
        text: 'GitHub (сюды дасылайце тэхнічныя памылкі і заўвагі)',
        Icon: GitHubIcon,
        href: 'https://github.com/bel-frontend/bel-frontend.github.io/issues',
        color: '#1a1e22',
    },
];

const Contacts = () => {
    return (
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h1" sx={{paddingLeft: '30px', paddingBottom: '15px'}}>
                Нашы кантакты
            </Typography>
            {' '}
            <List
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                {contacts.map(({text, Icon, href, color}) => (
                    <ListItem key={text} sx={{width: '100%'}}>
                        <ListItemButton component="a" target={'_blank'} href={href} >
                            <ListItemIcon>
                                <Icon sx={{color}} />
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};
export default Contacts;
