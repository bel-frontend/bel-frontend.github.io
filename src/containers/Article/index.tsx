import React from 'react';
import { MetaData, MD } from 'components';
import { LikeButton } from 'components/Buttons/LikeButton';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import { getArticleById } from 'modules/articles';

import style from './style.module.scss';

export const Article = ({
    match: {
        params: { id },
    },
    ...props
}: {
    match: { params: { id: string } };
}) => {
    const [article, setArticle] = React.useState<any>();

    React.useEffect(() => {
        getArticleById(id).then((data) => {
            setArticle(data);
        });
    }, [id]);

    return article ? (
        <>
            <div>
                <Link to="/">Галоўная</Link> <span>{'>'} </span>
                <span>{article?.meta?.title}</span>
            </div>
            <div className={classnames(style.likeContainer)}>
                <LikeButton
                    className={style.likeButton}
                    artickleId={article.id}
                />
            </div>
            <main className="page__main main">
                <article className="episode box">
                    <h1 className="episode__title">{article?.meta?.title}</h1>
                    <div className="content">
                        <MD>{article?.content}</MD>
                    </div>
                    <MetaData
                        showReadButton={false}
                        showLikes={false}
                        meta={article?.meta}
                    />
                </article>
            </main>
        </>
    ) : null;
};
