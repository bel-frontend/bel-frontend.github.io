import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import classnames from 'classnames';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

import { getArtickleByIdRequest, getArtickleSelector } from 'modules/artickles';
import { getCurrentUserSelector } from 'modules/auth';

import { MetaData, MD } from 'components';
import { LikeButton, Tag } from 'components';
import { USER_ROLES } from 'constants/users';
import Error from './components/Error';
import BF from 'assets/images/default.jpg';

import style from './style.module.scss';
import { Comments } from './components/Comments';

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
                <meta
                    property="og:url"
                    content={`https://bel-frontend.online/article/${id}`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content={`https://bel-frontend.online${BF}`}
                />

                <meta
                    name="twitter:card"
                    content={`https://bel-frontend.online${BF}`}
                />
                <meta property="twitter:domain" content="bel-frontend.online" />
                <meta
                    property="twitter:url"
                    content={`https://bel-frontend.online/article/${id}`}
                />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta
                    name="twitter:image"
                    content={`https://bel-frontend.online${BF}`}
                />
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
                        <MD className={style.MD_view}>{article?.content}</MD>
                    </div>
                    <MetaData
                        showReadButton={false}
                        showLikes={false}
                        showTags={false}
                        meta={article?.meta}
                        articleId={id}
                    />
                    <Box marginTop={2}></Box>
                    <Grid marginTop={2} spacing={2} container>
                        <Grid item>
                            <Error
                                userIsAuth={userIsAuth}
                                currentUser={currentUser}
                                artickleId={id}
                            />
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Comments
                                userIsAuth={userIsAuth}
                                articleId={id}
                            ></Comments>
                        </Grid>
                    </Grid>
                </article>
            </main>
        </>
    ) : null;
};

export default Article;
