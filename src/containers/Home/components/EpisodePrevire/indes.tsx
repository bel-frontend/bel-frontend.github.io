import React from 'react';
import { MetaData } from 'src/components/MetaData';

export const EpisodePreview = ({ ...data }) => {
    const content = 'content';
    const url = './';

    return (
        <article className="episode box" id="e{{ episode.data.number }}">
            <div className="article">
                <h2 className="episode__title">
                    <a className="episode__link" href={url}>
                        {data.number}.{data.title}
                    </a>
                </h2>
                <div className="content">{content}</div>
            </div>
            <div className="alfa"></div>
            <MetaData />
        </article>
    );
};
