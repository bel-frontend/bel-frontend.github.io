import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Container } from '@mui/material';

export const PrivacyPolicy = () => (
    <Container style={{ marginBottom: '30px', marginTop: '15px' }}>
        <DialogTitle>Палітыка прыватнасці</DialogTitle>
        <Typography variant="body1" style={{ marginBottom: '20px' }}>
            <strong>Палітыка прыватнасці</strong> апісвае палітыку і працэдуру ў
            дачыненні да збору і выкарыстання вашай інфармацыі пры выкарыстанні
            вамі сэрвісу, а таксама расказвае вам пра вашы правы на
            канфідэнцыяльнасць.
        </Typography>
        <Typography variant="body1">
            Інфармацыю мы бярэм з <b>наступных крыніц</b>:
            <List>
                <ListItem>
                    Інфармацыя ад карыстальнікаў. Пры рэгістрацыі мы запытваем у
                    вас адрас электроннай пошты і захоўваем яго у вашым акаўнце
                    каб карыстальнікі, якія зарэгастраваліся на нашым сайце,
                    маглі ствараць новыя і рэдагаваць свае ўжо існуючыя
                    артыкулы.
                </ListItem>
                <ListItem>
                    Аналіз вашых дзеянняў. Мы збіраем інфармацыю аб тым, якія
                    старонкі вы праглядалі каб дадаваць новы і найбольш цікавы
                    для чытачоў кантэнт.
                </ListItem>
            </List>
        </Typography>
        <Typography variant="body1">
            Мы не раскрываем асабістую інфармацыю карыстальнікаў.
        </Typography>
    </Container>
);
