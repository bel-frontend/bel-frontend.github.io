import React from 'react';

export const MetaData = ({ meta }: any) => {
    const { author = '', dateArticle = '', url = '' } = meta || {};
    console.log(meta);

    return (
        <>
            <div className="episode_meta">
                <a href={url} className="btn btn-primary">
                    Чытаць
                </a>
                <button type="button" className="btn btn-danger like btn-sm">
                    <span className="bi bi-heart-fill"></span>
                    <span className="count_likes">0</span>
                </button>
            </div>
            <div>
                <span className="author">{author}</span>,
                <span className="date-article"> {dateArticle}</span>
            </div>
        </>
    );
};
