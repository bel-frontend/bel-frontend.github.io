import React from 'react';
import { MetaData } from 'components/MetaData';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

export const EpisodePreview = ({ meta, content }: any) => {
    const url = meta?.number ? `/article/${meta.number}` : '/';

    return meta ? (
        <article className="episode box" id={meta.number}>
            <div className="article">
                <h2 className="episode__title">
                    <Link className="episode__link" to={meta ? url : '/'}>
                        {meta.number}.{meta.title}
                    </Link>
                </h2>
                <div className="content">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
            <div className="alfa"></div>
            <MetaData meta={meta} url={url} />
        </article>
    ) : null;
};
