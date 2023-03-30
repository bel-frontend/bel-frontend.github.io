import React from "react";
import { Link } from "react-router-dom";
import notFound from './404.png';

import style from './style.module.scss';
const NotFound = () => (
    <div className={style.contentWrap}>
        <img src={notFound} title="not found" alt="not found" className={style.img}/>
        <p className={style.text}>Тут нічога няма.</p>
        <p className={style.text}>Паспрабуйце пашукаць што-небудзь іншае.</p>
        <Link to="/" className={style.link}>
            На галоўную
        </Link>
    </div>
);

export default NotFound;
