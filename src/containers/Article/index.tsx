import React from 'react';
import { MetaData, MD } from 'components';
import { LikeButton } from 'components/Buttons/LikeButton';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import { getArticlesByID } from 'modules/firebase';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import style from './style.module.scss';

export const Article = ({
    match: {
        params: { id },
    },
    history,
    route: { userIsAuth },
    ...props
}: {
    match: { params: { id: string } };
    history: any;
    route: { userIsAuth?: boolean };
}) => {
    const [article, setArticle] = React.useState<any>();

    React.useEffect(() => {
        if (id) {
            getArticlesByID(id).then((data) => {
                if (data) {
                    setArticle(data);
                }
            });
        }
    }, [id]);

    return article ? (
        <>
            <div>
                <Link to="/">Галоўная</Link> <span>{'>'} </span>
                <span>{article?.meta?.title}</span>
            </div>
            <div className={classnames(style.likeContainer)}>
                <LikeButton className={style.likeButton} articleId={id} />
                {userIsAuth ? (
                    <Button
                        variant="outlined"
                        sx={{ ml: 1 }}
                        color="secondary"
                        className={style.editButton}
                        onClick={() => {
                            history.push(`/editor/${id}`);
                        }}
                        endIcon={<EditIcon />}
                    >
                        Рэдагаваць
                    </Button>
                ) : null}
            </div>
            <main className="page__main main">
                <article className="episode box">
                    <h1 className="episode__title">{article?.meta?.title}</h1>
                    <div className="content">
                        <MD>{article?.article}</MD>
                    </div>
                    <MetaData
                        showReadButton={false}
                        showLikes={false}
                        meta={article?.meta}
                        articleId={id}
                    />
                </article>
            </main>
        </>
    ) : null;
};
