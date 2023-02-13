import React from 'react';
import { MetaData } from 'components/MetaData';
import { Link } from 'react-router-dom';
import { MD } from 'components';

import style from './style.module.scss';

export const EpisodePreview = ({ meta, id, content }: any) => {
    const url = meta?.number ? `/article/${meta.number}` : '/';

    return meta ? (
        <article className="episode box" id={meta.number}>
            <div className="article">
                <h2 className="episode__title">
                    <Link className="episode__link" to={meta ? url : '/'}>
                        {meta.title}
                    </Link>
                </h2>
                <div className="content">
                    <MD>{content}</MD>
                </div>
            </div>
            <div className={style.alfa}></div>
            <MetaData meta={meta} artickleId={id} url={url} />
        </article>
    ) : null;
};
