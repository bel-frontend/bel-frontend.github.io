import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { MetaData, MD } from '@/components';
import { LikeButton, Tag } from '@/components';
import Error from '../Error';
import { Comments } from '../Comments';
import { ArticleInterface } from '@/constants/types/article';
import style from './style.module.scss';

const Article = ({ article }: { article: ArticleInterface }) => {
    const title = article?.meta?.title;
    const id = article?.id;

    return article ? (
        <>
            <div className="articlePage">
                <Link href="/">Галоўная</Link> <span>{'>'} </span>
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
                            <Error artickleId={id} />
                        </Grid>
                        <Grid item xs={12}>
                            <Comments articleId={id}></Comments>
                        </Grid>
                    </Grid>
                </article>
            </main>
        </>
    ) : null;
};

export default Article;
