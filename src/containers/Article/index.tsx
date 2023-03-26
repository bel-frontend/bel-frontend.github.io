import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classnames from 'classnames';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch, useSelector } from 'react-redux';

import { getArtickleByIdRequest, getArtickleSelector } from 'modules/artickles';
import { getCurrentUserSelector } from 'modules/auth';

import { MetaData, MD } from 'components';
import { LikeButton, Tag } from 'components';
import { USER_ROLES } from 'constants/users';
import Error from './Error';

import style from './style.module.scss';

const Article = ({
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
    const dispatch = useDispatch();
    const currentUser: any = useSelector(getCurrentUserSelector);
    const article: any = useSelector(getArtickleSelector);

    React.useEffect(() => {
        if (id) {
            dispatch(getArtickleByIdRequest({ id }));
        }
    }, [id]);

    const title = article?.meta?.title;
    const description = article?.meta?.description ?? article?.meta?.title;

    return article ? (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <div className="articlePage">
                <Link to="/">Галоўная</Link> <span>{'>'} </span>
                <span>{title}</span>
            </div>

            <div className={classnames(style.likeContainer)}>
                <LikeButton
                    likesCount={article?.likes || 0}
                    className={style.likeButton}
                    articleId={id}
                />
            </div>
            <main className="page__main main articlePage">
                <article className="episode box">
                    <h2 className="episode__title">{article?.meta?.title}</h2>
                    {(article?.meta?.tags.toString().split(',') || []).map(
                        (tag: string) => (
                            <Tag key={tag}>{tag}</Tag>
                        ),
                    )}
                    <div className="content">
                        <MD>{article?.content}</MD>
                    </div>
                    <MetaData
                        showReadButton={false}
                        showLikes={false}
                        meta={article?.meta}
                        articleId={id}
                    />
                    {userIsAuth ? (
                        <Box marginTop={2}>
                            <Error currentUser={currentUser} artickleId={id} />
                        </Box>
                    ) : null}
                    <Box marginTop={2}>
                        {userIsAuth &&
                        (currentUser?.user_id === article?.meta?.user_id ||
                            currentUser.role === USER_ROLES.SUPERADMIN) ? (
                            <Button
                                variant="outlined"
                                // sx={{ ml: 1 }}
                                color="primary"
                                className={style.editButton}
                                onClick={() => {
                                    history.push(`/editor/${id}`);
                                }}
                                endIcon={<EditIcon />}
                            >
                                Рэдагаваць
                            </Button>
                        ) : null}
                    </Box>
                </article>
            </main>
        </>
    ) : null;
};

export default Article;
