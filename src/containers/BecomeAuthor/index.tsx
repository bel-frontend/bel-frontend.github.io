import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import HailIcon from '@mui/icons-material/Hail';

const BecomeAuthor = () => (
    <Paper sx={{ padding: 2 }}>
        <Typography variant="h1" sx={{paddingLeft: '30px', paddingBottom: '15px'}}>
            Як стаць аўтарам Bel-Geek?
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            <b>Bel-Geek - гэта адкрытая пляцоўка для публікацыі артыкулаў розных аўтараў на беларускай мове на свабодныя тэмы.</b>
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            Калі ў вас няма акаунта, то трэба <Link to='/register'>зарэгістравацца</Link> на сайце.
            Калі акаунт ужо існуе, то <Link to='/login'>аўтарызавацца</Link>.
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            Далей трэба націснуць на тры кропкі ў шапцы сайта, каб з'явілася меню. Выбраць пункт "Стварыць артыкул", каб перайсці на старонку рэдактара.
            Ці замест гэтага можна скарыстацца <Link to='/editor/add'>спасылкай</Link>.
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            Абавязкова трэба дадаць назву артыкула, імя аўтара, тэгі ў адпаведныя палі формы, пажадана дадаць апісанне.
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            У акне рэдактара пішам змест артыкула, выкарыстоўваючы інструменты для фарматавання тэксту. У правай частцы старонкі можна пабачыць папярэдні вынік.
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px', lineHeight: '20px' }}
        >
           <b>Важна!</b> Захоўвайце час ад часу свае артыкулы з дапамогай кнопкі "Захаваць", каб выпадкова не згубіць напісанае.
            Таксама можна захаваць напісанае і адкласці работу з артыкулам на іншы дзень. <i>Калі вы ўжо вядзеце блогі ў сацыяльных сетках, то дадавайце спасылкі на іх у сваіх артыкулах.</i>
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px', lineHeight: '20px' }}
        >
            <b>Важна!</b> Калі вы ўжо вядзеце блогі ў любых сацыяльных сетках, то дадавайце спасылкі на іх у сваіх артыкулах, каб чытачы маглі знайсці больш зацікавіўшай іх інфармацыі.
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >Калі артыкул будзе гатовы, трэба перавесці перамыкач над рэдактарам тэксту "Паказваць усім" у актыўнае становішча і націснуць кнопку "Захаваць".
        </Typography>
        <Typography
            variant="body1"
            component="p"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            <i>Карысныя спасылкі, якімі можна карыстацца падчас напісання артыкулаў:</i>
        </Typography>
        <List>
            <ListItem disablePadding>
                <ListItemIcon><HailIcon color='inherit' /></ListItemIcon>
                <i>Мноства слоўнікаў &nbsp; <a href='https://slounik.org/'>https://slounik.org/</a></i>
            </ListItem>
            <ListItem disablePadding>
                <ListItemIcon><HailIcon color='inherit' /></ListItemIcon>
                <i>Правапіс слоў у розных склонах і ліках &nbsp; <a href='https://starnik.by/'>https://slounik.org/</a></i>
            </ListItem>
        </List>
    </Paper>

);

export default BecomeAuthor;